/**
 * Application Use Case: CreateOrderUseCase
 * 
 * Clean Architecture - Use Cases Layer
 * SOLID:
 * - Single Responsibility Principle (SRP): Coordinates order creation, item validation,
 *   discount application, and persistence.
 * - Dependency Inversion Principle (DIP): Injects IOrderRepository and IProductRepository.
 */

import { Order, OrderMode, PaymentMethodType, CustomerSnapshot } from '../../domain/entities/Order.ts';
import { OrderItem } from '../../domain/value-objects/OrderItem.ts';
import { IOrderRepository } from '../../domain/repositories/IOrderRepository.ts';
import { IProductRepository } from '../../domain/repositories/IProductRepository.ts';
import { ProductCustomization } from '../../domain/entities/Product.ts';

export interface CreateOrderItemInput {
  productId: string;
  quantity: number;
  customization?: ProductCustomization;
}

export interface CreateOrderInput {
  customer: CustomerSnapshot;
  items: CreateOrderItemInput[];
  mode?: OrderMode;
  tableNumber?: string;
  hasReusableCup?: boolean;
  couponCode?: string;
  paymentMethod: PaymentMethodType;
  locationName?: string;
}

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly productRepository: IProductRepository
  ) {}

  public async execute(input: CreateOrderInput): Promise<Order> {
    if (!input.items || input.items.length === 0) {
      throw new Error('Cannot create an order without items');
    }

    // 1. Resolve products and build domain OrderItems
    const orderItems: OrderItem[] = [];

    for (const itemInput of input.items) {
      const product = await this.productRepository.findById(itemInput.productId);
      if (!product) {
        throw new Error(`Product not found: ${itemInput.productId}`);
      }
      if (!product.isAvailable) {
        throw new Error(`Product is currently unavailable: ${product.name}`);
      }

      const unitPrice = product.calculateUnitPrice(itemInput.customization);
      const orderItem = new OrderItem({
        id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        productId: product.id,
        productName: product.name,
        productImageUrl: product.imageUrl,
        unitPrice,
        quantity: itemInput.quantity,
        customization: itemInput.customization,
      });

      orderItems.push(orderItem);
    }

    // 2. Determine discounts
    let couponDiscount = 0;
    if (input.couponCode) {
      const normalizedCode = input.couponCode.trim().toUpperCase();
      if (normalizedCode === 'ESTUDIANTE2024' || normalizedCode === 'CAMPUS10') {
        couponDiscount = 2.00;
      } else if (normalizedCode === 'BIENVENIDA') {
        couponDiscount = 1.50;
      }
    }

    // 3. Generate unique order number & pickup PIN
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `#U-${randomSuffix}`;
    const pickupPin = String(Math.floor(10 + Math.random() * 90));

    // 4. Instantiate Order Domain Entity
    const order = new Order({
      id: `ord-${Date.now()}-${randomSuffix}`,
      orderNumber,
      customer: input.customer,
      items: orderItems,
      mode: input.mode ?? 'express',
      tableNumber: input.tableNumber,
      pickupPin,
      locationName: input.locationName || 'Campus Central · Barra Aulario B',
      pickupShelf: input.mode === 'express' ? `Estante ${['A1', 'B2', 'B4', 'C1'][Math.floor(Math.random() * 4)]}` : undefined,
      hasReusableCup: input.hasReusableCup ?? false,
      couponCode: input.couponCode,
      couponDiscountAmount: couponDiscount,
      paymentMethod: input.paymentMethod,
      isPaid: true,
      estimatedPickupTime: input.mode === 'express' ? '5-7 min' : '8-12 min',
    });

    // 5. Persist via Repository Port
    return this.orderRepository.create(order);
  }
}
