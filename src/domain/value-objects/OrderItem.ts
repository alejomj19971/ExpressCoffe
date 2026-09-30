/**
 * Value Object: OrderItem
 * 
 * Clean Architecture - Domain Layer
 * Immutable representation of a line item in an Order.
 */

import { ProductCustomization } from '../entities/Product.ts';

export interface OrderItemProps {
  id: string;
  productId: string;
  productName: string;
  productImageUrl: string;
  unitPrice: number;
  quantity: number;
  customization?: ProductCustomization;
}

export class OrderItem {
  public readonly id: string;
  public readonly productId: string;
  public readonly productName: string;
  public readonly productImageUrl: string;
  public readonly unitPrice: number;
  public readonly quantity: number;
  public readonly customization?: ProductCustomization;
  public readonly subtotal: number;

  constructor(props: OrderItemProps) {
    if (props.quantity <= 0) {
      throw new Error('Order item quantity must be greater than zero');
    }
    if (props.unitPrice < 0) {
      throw new Error('Order item unit price cannot be negative');
    }

    this.id = props.id;
    this.productId = props.productId;
    this.productName = props.productName;
    this.productImageUrl = props.productImageUrl;
    this.unitPrice = Number(props.unitPrice.toFixed(2));
    this.quantity = props.quantity;
    this.customization = props.customization ? { ...props.customization } : undefined;
    this.subtotal = Number((this.unitPrice * this.quantity).toFixed(2));
  }

  /**
   * Helper description summarizing options chosen (e.g. "Grande · Leche avena · Extra shot")
   */
  public getCustomizationSummary(): string {
    if (!this.customization) return 'Estándar';
    const parts: string[] = [];

    if (this.customization.temperature === 'cold') parts.push('Frío con hielo');
    else if (this.customization.temperature === 'hot') parts.push('Caliente');

    if (this.customization.size === '16oz') parts.push('Grande (16 oz)');
    else if (this.customization.size === '20oz') parts.push('Jumbo (20 oz)');
    else if (this.customization.size === '12oz') parts.push('Medio (12 oz)');

    if (this.customization.milk && this.customization.milk !== 'entera') {
      parts.push(`Leche de ${this.customization.milk}`);
    }

    if (this.customization.sweetness !== undefined && this.customization.sweetness !== 100) {
      if (this.customization.sweetness === 0) parts.push('Sin azúcar');
      else if (this.customization.sweetness === 50) parts.push('50% dulce');
      else if (this.customization.sweetness === 'cinnamon') parts.push('Canela');
    }

    if (this.customization.selectedExtras && this.customization.selectedExtras.length > 0) {
      parts.push(`+${this.customization.selectedExtras.length} extras`);
    }

    if (this.customization.hasReusableCup) {
      parts.push('Vaso Reutilizable');
    }

    return parts.length > 0 ? parts.join(' · ') : 'Estándar';
  }
}
