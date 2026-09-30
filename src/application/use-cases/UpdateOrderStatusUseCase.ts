/**
 * Application Use Case: UpdateOrderStatusUseCase
 * 
 * Clean Architecture - Use Cases Layer
 * SOLID:
 * - Single Responsibility Principle (SRP): Enforces domain transition rules before
 *   updating persistent storage.
 */

import { IOrderRepository } from '../../domain/repositories/IOrderRepository.ts';
import { Order, OrderStatus } from '../../domain/entities/Order.ts';

export interface UpdateOrderStatusInput {
  orderId: string;
  nextStatus: OrderStatus;
  baristaName?: string;
  pickupShelf?: string;
}

export class UpdateOrderStatusUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  public async execute(input: UpdateOrderStatusInput): Promise<Order> {
    const order = await this.orderRepository.findById(input.orderId);
    if (!order) {
      throw new Error(`Order with ID "${input.orderId}" not found`);
    }

    // Domain validation & transition
    order.transitionTo(input.nextStatus, input.baristaName);

    if (input.pickupShelf && input.nextStatus === 'READY_FOR_PICKUP') {
      order.setShelf(input.pickupShelf);
    }

    return this.orderRepository.update(order);
  }
}
