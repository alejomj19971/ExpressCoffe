/**
 * Application Use Case: GetActiveOrdersUseCase
 * 
 * Clean Architecture - Use Cases Layer
 * Retrieves all active orders for the barista Kanban board.
 */

import { IOrderRepository } from '../../domain/repositories/IOrderRepository.ts';
import { Order } from '../../domain/entities/Order.ts';

export class GetActiveOrdersUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  public async execute(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }
}
