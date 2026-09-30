/**
 * Domain Entity: Order (Aggregate Root)
 * 
 * Clean Architecture - Enterprise Business Rules
 * SOLID Principles Applied:
 * - Single Responsibility Principle (SRP): Encapsulates order state, calculation rules,
 *   line items consistency, and lifecycle state transitions.
 * - Open/Closed Principle (OCP): State transition rules and discount policies can be extended.
 */

import { OrderItem } from '../value-objects/OrderItem.ts';

export type OrderStatus = 'PENDING' | 'PREPARING' | 'READY_FOR_PICKUP' | 'DELIVERED' | 'CANCELLED';
export type OrderMode = 'express' | 'table';
export type PaymentMethodType = 'campus_card' | 'credit_debit' | 'bizum_qr' | 'cash';

export interface CustomerSnapshot {
  id: string;
  name: string;
  role: 'student' | 'faculty' | 'staff' | 'visitor';
  facultyOrDept?: string;
  carnetId?: string;
}

export interface OrderProps {
  id: string;
  orderNumber: string; // e.g. "#U-2489"
  customer: CustomerSnapshot;
  items: OrderItem[];
  status?: OrderStatus;
  mode?: OrderMode;
  tableNumber?: string;
  pickupPin: string; // 2-digit PIN like "89"
  locationName: string; // e.g. "Campus Central · Aulario B"
  pickupShelf?: string; // e.g. "Estante Mostrador B2"
  hasReusableCup?: boolean;
  couponCode?: string;
  couponDiscountAmount?: number;
  paymentMethod: PaymentMethodType;
  isPaid?: boolean;
  baristaName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  estimatedPickupTime?: string;
}

export class Order {
  private readonly _id: string;
  private readonly _orderNumber: string;
  private readonly _customer: CustomerSnapshot;
  private _items: OrderItem[];
  private _status: OrderStatus;
  private _mode: OrderMode;
  private _tableNumber?: string;
  private readonly _pickupPin: string;
  private _locationName: string;
  private _pickupShelf?: string;
  private _hasReusableCup: boolean;
  private _couponCode?: string;
  private _couponDiscountAmount: number;
  private _paymentMethod: PaymentMethodType;
  private _isPaid: boolean;
  private _baristaName?: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;
  private _estimatedPickupTime: string;

  constructor(props: OrderProps) {
    if (!props.id || props.id.trim() === '') {
      throw new Error('Order ID cannot be empty');
    }
    if (!props.orderNumber) {
      throw new Error('Order number cannot be empty');
    }
    if (!props.items || props.items.length === 0) {
      throw new Error('Order must contain at least one item');
    }

    this._id = props.id;
    this._orderNumber = props.orderNumber;
    this._customer = { ...props.customer };
    this._items = [...props.items];
    this._status = props.status ?? 'PENDING';
    this._mode = props.mode ?? 'express';
    this._tableNumber = props.tableNumber;
    this._pickupPin = props.pickupPin || String(Math.floor(10 + Math.random() * 90));
    this._locationName = props.locationName || 'Campus Central · Barra Aulario B';
    this._pickupShelf = props.pickupShelf;
    this._hasReusableCup = props.hasReusableCup ?? false;
    this._couponCode = props.couponCode;
    this._couponDiscountAmount = props.couponDiscountAmount ?? 0;
    this._paymentMethod = props.paymentMethod;
    this._isPaid = props.isPaid ?? true;
    this._baristaName = props.baristaName ?? 'Carlos Barista';
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._estimatedPickupTime = props.estimatedPickupTime ?? '5-8 min';
  }

  // Getters
  get id(): string { return this._id; }
  get orderNumber(): string { return this._orderNumber; }
  get customer(): CustomerSnapshot { return { ...this._customer }; }
  get items(): OrderItem[] { return [...this._items]; }
  get status(): OrderStatus { return this._status; }
  get mode(): OrderMode { return this._mode; }
  get tableNumber(): string | undefined { return this._tableNumber; }
  get pickupPin(): string { return this._pickupPin; }
  get locationName(): string { return this._locationName; }
  get pickupShelf(): string | undefined { return this._pickupShelf; }
  get hasReusableCup(): boolean { return this._hasReusableCup; }
  get couponCode(): string | undefined { return this._couponCode; }
  get couponDiscountAmount(): number { return this._couponDiscountAmount; }
  get paymentMethod(): PaymentMethodType { return this._paymentMethod; }
  get isPaid(): boolean { return this._isPaid; }
  get baristaName(): string | undefined { return this._baristaName; }
  get createdAt(): Date { return this._createdAt; }
  get updatedAt(): Date { return this._updatedAt; }
  get estimatedPickupTime(): string { return this._estimatedPickupTime; }

  // Business Calculation Methods
  public get subtotal(): number {
    const raw = this._items.reduce((sum, item) => sum + item.subtotal, 0);
    return Number(raw.toFixed(2));
  }

  public get ecoDiscount(): number {
    return this._hasReusableCup ? 0.20 : 0.00;
  }

  public get totalDiscounts(): number {
    return Number((this._couponDiscountAmount + this.ecoDiscount).toFixed(2));
  }

  public get total(): number {
    const calc = Math.max(0, this.subtotal - this.totalDiscounts);
    return Number(calc.toFixed(2));
  }

  // Business Mutators & Rules
  public setReusableCup(enabled: boolean): void {
    this._hasReusableCup = enabled;
    this._updatedAt = new Date();
  }

  public applyCoupon(code: string, discount: number): void {
    if (discount < 0) throw new Error('Discount cannot be negative');
    this._couponCode = code;
    this._couponDiscountAmount = Number(discount.toFixed(2));
    this._updatedAt = new Date();
  }

  public removeCoupon(): void {
    this._couponCode = undefined;
    this._couponDiscountAmount = 0;
    this._updatedAt = new Date();
  }

  public setShelf(shelf: string): void {
    this._pickupShelf = shelf;
    this._updatedAt = new Date();
  }

  public setMode(mode: OrderMode, tableNumber?: string): void {
    this._mode = mode;
    this._tableNumber = tableNumber;
    this._updatedAt = new Date();
  }

  /**
   * State Machine: Validates whether transitioning to newStatus is allowed
   */
  public canTransitionTo(newStatus: OrderStatus): boolean {
    if (this._status === newStatus) return true;

    switch (this._status) {
      case 'PENDING':
        return newStatus === 'PREPARING' || newStatus === 'CANCELLED';
      case 'PREPARING':
        return newStatus === 'READY_FOR_PICKUP' || newStatus === 'CANCELLED';
      case 'READY_FOR_PICKUP':
        return newStatus === 'DELIVERED' || newStatus === 'CANCELLED';
      case 'DELIVERED':
      case 'CANCELLED':
        return false; // Terminal states
      default:
        return false;
    }
  }

  /**
   * Domain State Transition
   */
  public transitionTo(newStatus: OrderStatus, actor?: string): void {
    if (!this.canTransitionTo(newStatus)) {
      throw new Error(`Invalid state transition from ${this._status} to ${newStatus}`);
    }
    this._status = newStatus;
    if (actor) {
      this._baristaName = actor;
    }
    this._updatedAt = new Date();
  }
}
