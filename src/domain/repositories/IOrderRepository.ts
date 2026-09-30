/**
 * Interface / Port: IOrderRepository
 * 
 * Clean Architecture - Domain Layer
 * SOLID Principles:
 * - Dependency Inversion Principle (DIP): The application layer depends upon this interface.
 * - Interface Segregation Principle (ISP): Methods partitioned for customer & barista needs.
 */

import { Order, OrderStatus } from '../entities/Order.ts';

export interface OrderMetrics {
  totalRevenueToday: number;
  totalOrdersCount: number;
  inProgressCount: number;
  readyCount: number;
  deliveredCount: number;
  averagePreparationTimeMinutes: number;
  campusCardVolume: number;
  campusCardPercentage: number;
}

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findByOrderNumber(orderNumber: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  findByStatus(status: OrderStatus | OrderStatus[]): Promise<Order[]>;
  findByCustomerId(customerId: string): Promise<Order[]>;
  update(order: Order): Promise<Order>;
  getLiveMetrics(): Promise<OrderMetrics>;
}
