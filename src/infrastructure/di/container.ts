/**
 * Infrastructure: Dependency Injection Container
 * 
 * Clean Architecture & SOLID: Dependency Inversion Principle (DIP)
 * Centralizes composition root for the application.
 */

import { MockProductRepository } from '../repositories/MockProductRepository.ts';
import { MockOrderRepository } from '../repositories/MockOrderRepository.ts';
import { GetProductsUseCase } from '../../application/use-cases/GetProductsUseCase.ts';
import { GetProductByIdUseCase } from '../../application/use-cases/GetProductByIdUseCase.ts';
import { CreateOrderUseCase } from '../../application/use-cases/CreateOrderUseCase.ts';
import { UpdateOrderStatusUseCase } from '../../application/use-cases/UpdateOrderStatusUseCase.ts';
import { GetActiveOrdersUseCase } from '../../application/use-cases/GetActiveOrdersUseCase.ts';

export class AppContainer {
  // Repositories (DIP implementations)
  public readonly productRepository: MockProductRepository;
  public readonly orderRepository: MockOrderRepository;

  // Use Cases
  public readonly getProductsUseCase: GetProductsUseCase;
  public readonly getProductByIdUseCase: GetProductByIdUseCase;
  public readonly createOrderUseCase: CreateOrderUseCase;
  public readonly updateOrderStatusUseCase: UpdateOrderStatusUseCase;
  public readonly getActiveOrdersUseCase: GetActiveOrdersUseCase;

  constructor() {
    this.productRepository = new MockProductRepository();
    this.orderRepository = new MockOrderRepository();

    this.getProductsUseCase = new GetProductsUseCase(this.productRepository);
    this.getProductByIdUseCase = new GetProductByIdUseCase(this.productRepository);
    this.createOrderUseCase = new CreateOrderUseCase(this.orderRepository, this.productRepository);
    this.updateOrderStatusUseCase = new UpdateOrderStatusUseCase(this.orderRepository);
    this.getActiveOrdersUseCase = new GetActiveOrdersUseCase(this.orderRepository);
  }
}

// Singleton instance for the running client
export const container = new AppContainer();
