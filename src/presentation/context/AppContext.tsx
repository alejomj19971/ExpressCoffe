/**
 * Presentation Layer: AppContext
 * State Management & Use Case Binding
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { container } from '../../infrastructure/di/container.ts';
import { Product, ProductCustomization } from '../../domain/entities/Product.ts';
import { Order, OrderStatus, OrderMode, PaymentMethodType, CustomerSnapshot } from '../../domain/entities/Order.ts';
import { MOCK_CUSTOMER_MATEO } from '../../infrastructure/mocks/mockData.ts';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  customization?: ProductCustomization;
  unitPrice: number;
  subtotal: number;
}

interface AppContextType {
  // Navigation & Role
  currentRole: 'student' | 'barista';
  setCurrentRole: (role: 'student' | 'barista') => void;
  studentTab: 'explorar' | 'carrito' | 'pedidos' | 'perfil';
  setStudentTab: (tab: 'explorar' | 'carrito' | 'pedidos' | 'perfil') => void;
  baristaTab: 'kanban' | 'dashboard' | 'catalogo' | 'facturas' | 'perfil';
  setBaristaTab: (tab: 'kanban' | 'dashboard' | 'catalogo' | 'facturas' | 'perfil') => void;

  // Products
  products: Product[];
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (product: Product | null) => void;
  reloadProducts: () => Promise<void>;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, customization?: ProductCustomization) => void;
  updateCartItemQty: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotal: number;
  couponCode: string;
  couponDiscount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  hasReusableCup: boolean;
  setHasReusableCup: (enabled: boolean) => void;
  orderMode: OrderMode;
  setOrderMode: (mode: OrderMode) => void;
  selectedTableNumber: string;
  setSelectedTableNumber: (table: string) => void;
  selectedPaymentMethod: PaymentMethodType;
  setSelectedPaymentMethod: (method: PaymentMethodType) => void;

  // Orders
  orders: Order[];
  activeStudentOrder: Order | null;
  submitOrder: () => Promise<Order>;
  advanceOrderStatus: (orderId: string, nextStatus: OrderStatus) => Promise<void>;
  deliverOrderWithPin: (orderId: string) => Promise<void>;

  // Customer
  customer: CustomerSnapshot;
  customerBalance: number;
  rechargeBalance: (amount: number) => void;

  // Feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<'student' | 'barista'>('student');
  const [studentTab, setStudentTab] = useState<'explorar' | 'carrito' | 'pedidos' | 'perfil'>('explorar');
  const [baristaTab, setBaristaTab] = useState<'kanban' | 'dashboard' | 'catalogo' | 'facturas' | 'perfil'>('kanban');

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customer] = useState<CustomerSnapshot>(MOCK_CUSTOMER_MATEO);
  const [customerBalance, setCustomerBalance] = useState<number>(24.50);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>('ESTUDIANTE2024');
  const [couponDiscount, setCouponDiscount] = useState<number>(2.00);
  const [hasReusableCup, setHasReusableCup] = useState<boolean>(true);
  const [orderMode, setOrderMode] = useState<OrderMode>('express');
  const [selectedTableNumber, setSelectedTableNumber] = useState<string>('Mesa 4');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodType>('campus_card');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  // Initial Load
  const reloadProducts = useCallback(async () => {
    const list = await container.getProductsUseCase.execute();
    setProducts(list);
  }, []);

  const reloadOrders = useCallback(async () => {
    const list = await container.getActiveOrdersUseCase.execute();
    setOrders([...list]);
  }, []);

  useEffect(() => {
    reloadProducts();
    reloadOrders();
  }, [reloadProducts, reloadOrders]);

  // Seed initial cart item for rich demo experience
  useEffect(() => {
    if (products.length > 0 && cart.length === 0) {
      const latte = products.find(p => p.id === 'prod-latte-caramelo');
      const focaccia = products.find(p => p.id === 'prod-focaccia-pavo');
      const cookie = products.find(p => p.id === 'prod-cookie-choco');

      const initialCart: CartItem[] = [];
      if (latte) {
        const custom: ProductCustomization = { size: '16oz', milk: 'avena', selectedExtras: ['extra-shot'] };
        const price = latte.calculateUnitPrice(custom);
        initialCart.push({
          id: 'cart-init-1',
          product: latte,
          quantity: 1,
          customization: custom,
          unitPrice: price,
          subtotal: price,
        });
      }
      if (focaccia) {
        initialCart.push({
          id: 'cart-init-2',
          product: focaccia,
          quantity: 1,
          customization: { baristaNotes: 'Sin mayonesa' },
          unitPrice: focaccia.basePrice,
          subtotal: focaccia.basePrice,
        });
      }
      if (cookie) {
        initialCart.push({
          id: 'cart-init-3',
          product: cookie,
          quantity: 1,
          unitPrice: cookie.basePrice,
          subtotal: cookie.basePrice,
        });
      }
      setCart(initialCart);
    }
  }, [products]);

  // Cart operations
  const addToCart = useCallback((product: Product, quantity = 1, customization?: ProductCustomization) => {
    const unitPrice = product.calculateUnitPrice(customization);
    const subtotal = Number((unitPrice * quantity).toFixed(2));
    const newItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      product,
      quantity,
      customization,
      unitPrice,
      subtotal,
    };

    setCart(prev => [...prev, newItem]);
    showToast(`"${product.name}" agregado al carrito`);
  }, [showToast]);

  const updateCartItemQty = useCallback((itemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              subtotal: Number((item.unitPrice * newQty).toFixed(2)),
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    showToast('Producto eliminado del pedido');
  }, [showToast]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const applyCoupon = useCallback((code: string): boolean => {
    const norm = code.trim().toUpperCase();
    if (norm === 'ESTUDIANTE2024' || norm === 'CAMPUS10') {
      setCouponCode(norm);
      setCouponDiscount(2.00);
      showToast('¡Cupón universitario aplicado: -$2.00!');
      return true;
    } else if (norm === 'BIENVENIDA') {
      setCouponCode(norm);
      setCouponDiscount(1.50);
      showToast('¡Cupón de bienvenida aplicado: -$1.50!');
      return true;
    }
    showToast('Cupón no válido o expirado');
    return false;
  }, [showToast]);

  const removeCoupon = useCallback(() => {
    setCouponCode('');
    setCouponDiscount(0);
    showToast('Cupón removido');
  }, [showToast]);

  const cartSubtotal = Number(cart.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2));
  const ecoDiscount = hasReusableCup ? 0.20 : 0.00;
  const cartTotal = Math.max(0, Number((cartSubtotal - couponDiscount - ecoDiscount).toFixed(2)));

  // Submit Order via Clean Architecture Use Case
  const submitOrder = useCallback(async (): Promise<Order> => {
    if (cart.length === 0) {
      throw new Error('El carrito está vacío');
    }

    if (selectedPaymentMethod === 'campus_card' && customerBalance < cartTotal) {
      throw new Error('Saldo insuficiente en la Credencial Universitaria');
    }

    const order = await container.createOrderUseCase.execute({
      customer,
      items: cart.map(i => ({
        productId: i.product.id,
        quantity: i.quantity,
        customization: i.customization,
      })),
      mode: orderMode,
      tableNumber: orderMode === 'table' ? selectedTableNumber : undefined,
      hasReusableCup,
      couponCode: couponCode || undefined,
      paymentMethod: selectedPaymentMethod,
    });

    if (selectedPaymentMethod === 'campus_card') {
      setCustomerBalance(prev => Number((prev - cartTotal).toFixed(2)));
    }

    clearCart();
    await reloadOrders();
    setStudentTab('pedidos');
    showToast(`¡Pedido ${order.orderNumber} confirmado! PIN #${order.pickupPin}`);
    return order;
  }, [cart, selectedPaymentMethod, customerBalance, cartTotal, customer, orderMode, selectedTableNumber, hasReusableCup, couponCode, clearCart, reloadOrders, showToast]);

  // Barista advance status
  const advanceOrderStatus = useCallback(async (orderId: string, nextStatus: OrderStatus) => {
    await container.updateOrderStatusUseCase.execute({
      orderId,
      nextStatus,
      baristaName: 'Carlos Barista',
      pickupShelf: nextStatus === 'READY_FOR_PICKUP' ? 'Estante Mostrador B2' : undefined,
    });
    await reloadOrders();
    showToast(`Comanda actualizada a "${nextStatus}"`);
  }, [reloadOrders, showToast]);

  // Delivery validate PIN
  const deliverOrderWithPin = useCallback(async (orderId: string) => {
    await container.updateOrderStatusUseCase.execute({
      orderId,
      nextStatus: 'DELIVERED',
      baristaName: 'Carlos Barista',
    });
    await reloadOrders();
    showToast(`¡Pedido entregado con éxito! Comprobante emitido`);
  }, [reloadOrders, showToast]);

  const rechargeBalance = useCallback((amount: number) => {
    setCustomerBalance(prev => Number((prev + amount).toFixed(2)));
    showToast(`¡Saldo recargado: +$${amount.toFixed(2)}!`);
  }, [showToast]);

  // Active student order for live tracking
  const activeStudentOrder = orders.find(
    o => o.customer.id === customer.id && (o.status === 'PREPARING' || o.status === 'READY_FOR_PICKUP' || o.status === 'PENDING')
  ) || orders.find(o => o.id === 'ord-2489') || null;

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        studentTab,
        setStudentTab,
        baristaTab,
        setBaristaTab,

        products,
        selectedProductForModal,
        setSelectedProductForModal,
        reloadProducts,

        cart,
        addToCart,
        updateCartItemQty,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartTotal,
        couponCode,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        hasReusableCup,
        setHasReusableCup,
        orderMode,
        setOrderMode,
        selectedTableNumber,
        setSelectedTableNumber,
        selectedPaymentMethod,
        setSelectedPaymentMethod,

        orders,
        activeStudentOrder,
        submitOrder,
        advanceOrderStatus,
        deliverOrderWithPin,

        customer,
        customerBalance,
        rechargeBalance,

        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
