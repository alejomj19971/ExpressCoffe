/**
 * Application Use Case: GetProductByIdUseCase
 * 
 * Clean Architecture - Use Cases Layer
 */

import { IProductRepository } from '../../domain/repositories/IProductRepository.ts';
import { Product } from '../../domain/entities/Product.ts';

export class GetProductByIdUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute(productId: string): Promise<Product> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new Error(`Product with ID "${productId}" not found.`);
    }
    return product;
  }
}
