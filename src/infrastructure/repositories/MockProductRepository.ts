/**
 * Infrastructure Repository: MockProductRepository
 * 
 * Clean Architecture - Frameworks & Drivers / Infrastructure Layer
 * Implements IProductRepository (Port) using in-memory store initialized with mock data.
 * SOLID Principles:
 * - Liskov Substitution Principle (LSP): Fully substitutable wherever IProductRepository is expected.
 * - Single Responsibility Principle (SRP): Handles Product data storage and retrieval.
 */

import { IProductRepository, ProductFilterCriteria } from '../../domain/repositories/IProductRepository.ts';
import { Product, ProductCategory } from '../../domain/entities/Product.ts';
import { MOCK_PRODUCTS_DATA } from '../mocks/mockData.ts';

export class MockProductRepository implements IProductRepository {
  private _products: Map<string, Product> = new Map();

  constructor() {
    this.seed();
  }

  private seed(): void {
    for (const data of MOCK_PRODUCTS_DATA) {
      const product = new Product(data);
      this._products.set(product.id, product);
    }
  }

  public async findAll(criteria?: ProductFilterCriteria): Promise<Product[]> {
    let list = Array.from(this._products.values());

    if (!criteria) return list;

    if (criteria.category && criteria.category !== 'all') {
      list = list.filter(p => p.category === criteria.category);
    }

    if (criteria.isAvailableOnly) {
      list = list.filter(p => p.isAvailable);
    }

    if (criteria.searchQuery && criteria.searchQuery.trim() !== '') {
      const query = criteria.searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    if (criteria.dietaryTags && criteria.dietaryTags.length > 0) {
      list = list.filter(p =>
        criteria.dietaryTags!.some(tag => p.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase()))
      );
    }

    return list;
  }

  public async findById(id: string): Promise<Product | null> {
    return this._products.get(id) ?? null;
  }

  public async findByCategory(category: ProductCategory): Promise<Product[]> {
    return Array.from(this._products.values()).filter(p => p.category === category);
  }

  public async getDailySpecials(): Promise<Product[]> {
    return Array.from(this._products.values()).filter(p => p.isDailySpecial);
  }
}
