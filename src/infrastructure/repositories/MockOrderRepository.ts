/**
 * Infrastructure Repository: MockOrderRepository
 * 
 * Clean Architecture - Frameworks & Drivers / Infrastructure Layer
 * Implements IOrderRepository (Port) using in-memory store initialized with seed orders.
 * SOLID Principles:
 * - Liskov Substitution Principle (LSP)
 * - Single Responsibility Principle (SRP)
 */

import { IOrderRepository, OrderMetrics } from '../../domain/repositories/IOrderRepository.ts';
import { Order, OrderStatus } from '../../domain/entities/Order.ts';
import { OrderItem } from '../../domain/value-objects/OrderItem.ts';
import { MOCK_CUSTOMER_MATEO, MOCK_CUSTOMER_PROF_DIEGO, IMAGES } from '../mocks/mockData.ts';

export class MockOrderRepository implements IOrderRepository {
  private _orders: Map<string, Order> = new Map();

  constructor() {
    this.seed();
  }

  private seed(): void {
    const ordersData = [
      // 1. PENDING (Nuevos / Tomados)
      new Order({
        id: 'ord-2495',
        orderNumber: '#U-2495',
        customer: MOCK_CUSTOMER_MATEO,
        items: [
          new OrderItem({
            id: 'it-1',
            productId: 'prod-latte-caramelo',
            productName: 'Latte Caramelo',
            productImageUrl: IMAGES.latteCarameloHero,
            unitPrice: 4.10,
            quantity: 1,
            customization: { size: '16oz', milk: 'avena', hasReusableCup: true },
          }),
          new OrderItem({
            id: 'it-2',
            productId: 'prod-cookie-choco',
            productName: 'Cookie Choco Chips',
            productImageUrl: IMAGES.cookieChoco,
            unitPrice: 1.80,
            quantity: 1,
          }),
        ],
        status: 'PENDING',
        mode: 'express',
        pickupPin: '89',
        locationName: 'Campus Central · Barra Aulario B',
        pickupShelf: 'Estante Mostrador B2',
        hasReusableCup: true,
        paymentMethod: 'campus_card',
        estimatedPickupTime: 'Hace 2 min',
      }),
      new Order({
        id: 'ord-2496',
        orderNumber: '#U-2496',
        customer: MOCK_CUSTOMER_PROF_DIEGO,
        items: [
          new OrderItem({
            id: 'it-3',
            productId: 'prod-latte-caramelo',
            productName: 'Americano Doble Caliente',
            productImageUrl: IMAGES.latteVainilla,
            unitPrice: 3.20,
            quantity: 1,
            customization: { temperature: 'hot' },
          }),
        ],
        status: 'PENDING',
        mode: 'table',
        tableNumber: 'Mesa 4 · Terraza',
        pickupPin: '42',
        locationName: 'Campus Central · Terraza Sur',
        paymentMethod: 'credit_debit',
        estimatedPickupTime: 'Hace 4 min',
      }),
      new Order({
        id: 'ord-2497',
        orderNumber: '#U-2497',
        customer: { id: 'usr-sofia', name: 'Sofía V.', role: 'student', facultyOrDept: 'Fac. Arq.' },
        items: [
          new OrderItem({
            id: 'it-4',
            productId: 'prod-acai-bowl',
            productName: 'Bowl Açaí Silvestre',
            productImageUrl: IMAGES.acaiBowl,
            unitPrice: 4.20,
            quantity: 1,
          }),
          new OrderItem({
            id: 'it-5',
            productId: 'prod-cold-brew-caramelo',
            productName: 'Cold Brew Tonic',
            productImageUrl: IMAGES.coldBrew,
            unitPrice: 3.50,
            quantity: 1,
          }),
          new OrderItem({
            id: 'it-6',
            productId: 'prod-muffin-arandanos',
            productName: 'Muffin Arándanos',
            productImageUrl: IMAGES.muffinArandanos,
            unitPrice: 2.50,
            quantity: 1,
          }),
        ],
        status: 'PENDING',
        mode: 'express',
        pickupPin: '73',
        locationName: 'Campus Central · Barra Aulario B',
        paymentMethod: 'campus_card',
        estimatedPickupTime: 'Hace 6 min',
      }),

      // 2. PREPARING (En Preparación)
      new Order({
        id: 'ord-2489',
        orderNumber: '#U-2489',
        customer: MOCK_CUSTOMER_MATEO,
        items: [
          new OrderItem({
            id: 'it-7',
            productId: 'prod-latte-caramelo',
            productName: 'Latte Caramelo',
            productImageUrl: IMAGES.latteCarameloHero,
            unitPrice: 4.10,
            quantity: 1,
            customization: { milk: 'avena', size: '16oz' },
          }),
          new OrderItem({
            id: 'it-8',
            productId: 'prod-focaccia-pavo',
            productName: 'Focaccia de Pavo Caliente',
            productImageUrl: IMAGES.focacciaPavo,
            unitPrice: 4.80,
            quantity: 1,
            customization: { baristaNotes: 'Sin mayonesa · Queso bien fundido' },
          }),
        ],
        status: 'PREPARING',
        mode: 'express',
        pickupPin: '89',
        locationName: 'Campus Central · Barra Aulario B',
        pickupShelf: 'Estante Mostrador B2',
        hasReusableCup: true,
        paymentMethod: 'campus_card',
        couponCode: 'ESTUDIANTE2024',
        couponDiscountAmount: 2.00,
        estimatedPickupTime: '10:18 AM (En ~5 min)',
      }),
      new Order({
        id: 'ord-2491',
        orderNumber: '#U-2491',
        customer: { id: 'usr-andrea', name: 'Andrea L.', role: 'student', facultyOrDept: 'Fac. Medicina' },
        items: [
          new OrderItem({
            id: 'it-9',
            productId: 'prod-matcha-latte',
            productName: 'Iced Matcha Latte',
            productImageUrl: IMAGES.matchaLatte,
            unitPrice: 3.80,
            quantity: 2,
          }),
        ],
        status: 'PREPARING',
        mode: 'express',
        pickupPin: '61',
        locationName: 'Campus Central · Barra Aulario B',
        paymentMethod: 'bizum_qr',
        estimatedPickupTime: '02:10 min',
      }),

      // 3. READY_FOR_PICKUP (Listos para recoger)
      new Order({
        id: 'ord-2485',
        orderNumber: '#U-2485',
        customer: { id: 'usr-martin', name: 'Martín Saldaña', role: 'student', facultyOrDept: 'Fac. Ingeniería' },
        items: [
          new OrderItem({
            id: 'it-10',
            productId: 'prod-latte-caramelo',
            productName: 'Flat White Avena Doble',
            productImageUrl: IMAGES.latteCarameloHero,
            unitPrice: 4.20,
            quantity: 1,
          }),
          new OrderItem({
            id: 'it-11',
            productId: 'prod-cookie-choco',
            productName: 'Alfajor Artesanal',
            productImageUrl: IMAGES.cookieChoco,
            unitPrice: 2.10,
            quantity: 1,
          }),
        ],
        status: 'READY_FOR_PICKUP',
        mode: 'express',
        pickupPin: '89',
        pickupShelf: 'Estante Mostrador B2',
        locationName: 'Campus Central · Barra Aulario B',
        paymentMethod: 'campus_card',
        estimatedPickupTime: 'Notificado 3m',
      }),
      new Order({
        id: 'ord-2486',
        orderNumber: '#U-2486',
        customer: { id: 'usr-lucia', name: 'Lucia K.', role: 'student', facultyOrDept: 'Fac. Derecho' },
        items: [
          new OrderItem({
            id: 'it-12',
            productId: 'prod-latte-caramelo',
            productName: 'Cappuccino Canela',
            productImageUrl: IMAGES.latteVainilla,
            unitPrice: 3.40,
            quantity: 1,
          }),
        ],
        status: 'READY_FOR_PICKUP',
        mode: 'express',
        pickupPin: '42',
        pickupShelf: 'Estante A1',
        locationName: 'Campus Central · Barra Aulario B',
        paymentMethod: 'credit_debit',
        estimatedPickupTime: 'Espera 6m',
      }),

      // 4. DELIVERED (Entregados / Despachados)
      new Order({
        id: 'ord-2480',
        orderNumber: '#U-2480',
        customer: MOCK_CUSTOMER_MATEO,
        items: [
          new OrderItem({
            id: 'it-13',
            productId: 'prod-combo-estudio',
            productName: 'Chai Latte + Tostada Aguacate',
            productImageUrl: IMAGES.comboEstudio,
            unitPrice: 9.15,
            quantity: 1,
          }),
        ],
        status: 'DELIVERED',
        mode: 'express',
        pickupPin: '22',
        locationName: 'Campus Central · Barra Aulario B',
        paymentMethod: 'campus_card',
        estimatedPickupTime: 'Entregado 10:12 AM',
      }),
      new Order({
        id: 'ord-2481',
        orderNumber: '#U-2481',
        customer: { id: 'usr-camila', name: 'Camila Morales', role: 'student', facultyOrDept: 'Fac. Economía' },
        items: [
          new OrderItem({
            id: 'it-14',
            productId: 'prod-cold-brew-caramelo',
            productName: 'Cold Brew Vainilla Especial',
            productImageUrl: IMAGES.coldBrew,
            unitPrice: 4.80,
            quantity: 1,
          }),
        ],
        status: 'DELIVERED',
        mode: 'express',
        pickupPin: '58',
        locationName: 'Campus Central · Barra Aulario B',
        paymentMethod: 'credit_debit',
        estimatedPickupTime: 'Entregado 10:05 AM',
      }),
    ];

    for (const order of ordersData) {
      this._orders.set(order.id, order);
    }
  }

  public async create(order: Order): Promise<Order> {
    this._orders.set(order.id, order);
    return order;
  }

  public async findById(id: string): Promise<Order | null> {
    return this._orders.get(id) ?? null;
  }

  public async findByOrderNumber(orderNumber: string): Promise<Order | null> {
    return Array.from(this._orders.values()).find(o => o.orderNumber === orderNumber) ?? null;
  }

  public async findAll(): Promise<Order[]> {
    return Array.from(this._orders.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  public async findByStatus(status: OrderStatus | OrderStatus[]): Promise<Order[]> {
    const statuses = Array.isArray(status) ? status : [status];
    return Array.from(this._orders.values())
      .filter(o => statuses.includes(o.status))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  public async findByCustomerId(customerId: string): Promise<Order[]> {
    return Array.from(this._orders.values())
      .filter(o => o.customer.id === customerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  public async update(order: Order): Promise<Order> {
    this._orders.set(order.id, order);
    return order;
  }

  public async getLiveMetrics(): Promise<OrderMetrics> {
    const all = Array.from(this._orders.values());
    const totalRevenueToday = all.reduce((sum, o) => sum + o.total, 0);
    const campusCardOrders = all.filter(o => o.paymentMethod === 'campus_card');
    const campusCardVolume = campusCardOrders.reduce((sum, o) => sum + o.total, 0);

    return {
      totalRevenueToday: Number(totalRevenueToday.toFixed(2)),
      totalOrdersCount: all.length + 130, // simulated total tickets today (142)
      inProgressCount: all.filter(o => o.status === 'PREPARING').length,
      readyCount: all.filter(o => o.status === 'READY_FOR_PICKUP').length,
      deliveredCount: all.filter(o => o.status === 'DELIVERED').length,
      averagePreparationTimeMinutes: 4.8,
      campusCardVolume: Number(campusCardVolume.toFixed(2)),
      campusCardPercentage: 68,
    };
  }
}
