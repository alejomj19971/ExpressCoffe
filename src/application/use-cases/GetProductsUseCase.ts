/**
 * Application Use Case: GetProductsUseCase
 * 
 * Clean Architecture - Use Cases Layer
 * SOLID: Single Responsibility Principle (SRP)
 */

import { IProductRepository, ProductFilterCriteria } from '../../domain/repositories/IProductRepository.ts';
import { Product } from '../../domain/entities/Product.ts';

export class GetProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute(criteria?: ProductFilterCriteria): Promise<Product[]> {
    return this.productRepository.findAll(criteria);
  }
}
