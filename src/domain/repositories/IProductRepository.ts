/**
 * Interface / Port: IProductRepository
 * 
 * Clean Architecture - Domain Layer
 * SOLID Principles:
 * - Dependency Inversion Principle (DIP): High-level modules (Use Cases) depend on this
 *   abstraction, not on concrete implementations (e.g. database, HTTP client, or mock).
 * - Interface Segregation Principle (ISP): Focused strictly on product query & catalog needs.
 */

import { Product, ProductCategory } from '../entities/Product.ts';

export interface ProductFilterCriteria {
  category?: ProductCategory | 'all';
  searchQuery?: string;
  isAvailableOnly?: boolean;
  dietaryTags?: string[];
}

export interface IProductRepository {
  findAll(criteria?: ProductFilterCriteria): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  findByCategory(category: ProductCategory): Promise<Product[]>;
  getDailySpecials(): Promise<Product[]>;
}
