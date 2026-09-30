/**
 * Domain Entity: Product
 * 
 * Clean Architecture - Enterprise Business Rules (Domain Layer)
 * SOLID Principles Applied:
 * - Single Responsibility Principle (SRP): Represents and encapsulates the business logic
 *   and invariants of a menu item/product.
 * - Open/Closed Principle (OCP): Extensible customization rules without altering core identity.
 */

export type ProductCategory = 'bebidas' | 'almuerzos' | 'postres' | 'snacks' | 'fit';
export type BeverageTemperature = 'hot' | 'cold';
export type CupSize = '12oz' | '16oz' | '20oz';
export type MilkType = 'entera' | 'deslactosada' | 'avena' | 'almendras';
export type SweetnessLevel = 0 | 50 | 100 | 'cinnamon';

export interface ProductExtraOption {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface ProductCustomization {
  temperature?: BeverageTemperature;
  size?: CupSize;
  milk?: MilkType;
  sweetness?: SweetnessLevel;
  selectedExtras?: string[]; // IDs of selected extras
  baristaNotes?: string;
  hasReusableCup?: boolean;
}

export interface ProductProps {
  id: string;
  sku: string;
  name: string;
  description: string;
  basePrice: number;
  category: ProductCategory;
  imageUrl: string;
  preparationTimeMinutes: number;
  rating: number;
  isAvailable: boolean;
  isDailySpecial?: boolean;
  tags?: string[];
  allergens?: string[];
  calories?: number;
  availableSizes?: { size: CupSize; label: string; additionalPrice: number }[];
  availableMilks?: { type: MilkType; label: string; additionalPrice: number }[];
  availableExtras?: ProductExtraOption[];
}

export class Product {
  private readonly _id: string;
  private readonly _sku: string;
  private _name: string;
  private _description: string;
  private _basePrice: number;
  private _category: ProductCategory;
  private _imageUrl: string;
  private _preparationTimeMinutes: number;
  private _rating: number;
  private _isAvailable: boolean;
  private _isDailySpecial: boolean;
  private _tags: string[];
  private _allergens: string[];
  private _calories?: number;
  private _availableSizes: { size: CupSize; label: string; additionalPrice: number }[];
  private _availableMilks: { type: MilkType; label: string; additionalPrice: number }[];
  private _availableExtras: ProductExtraOption[];

  constructor(props: ProductProps) {
    if (!props.id || props.id.trim() === '') {
      throw new Error('Product ID cannot be empty');
    }
    if (props.basePrice < 0) {
      throw new Error('Base price cannot be negative');
    }
    if (!props.name || props.name.trim() === '') {
      throw new Error('Product name cannot be empty');
    }

    this._id = props.id;
    this._sku = props.sku;
    this._name = props.name;
    this._description = props.description;
    this._basePrice = props.basePrice;
    this._category = props.category;
    this._imageUrl = props.imageUrl;
    this._preparationTimeMinutes = props.preparationTimeMinutes;
    this._rating = props.rating;
    this._isAvailable = props.isAvailable;
    this._isDailySpecial = props.isDailySpecial ?? false;
    this._tags = props.tags ?? [];
    this._allergens = props.allergens ?? [];
    this._calories = props.calories;
    this._availableSizes = props.availableSizes ?? [
      { size: '12oz', label: 'Medio (12 oz)', additionalPrice: 0.00 },
      { size: '16oz', label: 'Grande (16 oz)', additionalPrice: 0.60 },
      { size: '20oz', label: 'Jumbo Universitario (20 oz)', additionalPrice: 1.10 },
    ];
    this._availableMilks = props.availableMilks ?? [
      { type: 'entera', label: 'Leche Entera', additionalPrice: 0.00 },
      { type: 'deslactosada', label: 'Deslactosada', additionalPrice: 0.00 },
      { type: 'avena', label: 'Leche de Avena', additionalPrice: 0.40 },
      { type: 'almendras', label: 'Almendras', additionalPrice: 0.40 },
    ];
    this._availableExtras = props.availableExtras ?? [
      { id: 'extra-shot', name: 'Shot extra de espresso', price: 0.75, description: '+65mg cafeína para concentración' },
      { id: 'whipped-cream', name: 'Crema batida artesanal', price: 0.50, description: 'Con ligero toque de vainilla' },
      { id: 'vanilla-syrup', name: 'Jarabe extra de vainilla', price: 0.40, description: 'Esencia de vainilla de Papantla' },
    ];
  }

  // Getters (Encapsulation)
  get id(): string { return this._id; }
  get sku(): string { return this._sku; }
  get name(): string { return this._name; }
  get description(): string { return this._description; }
  get basePrice(): number { return this._basePrice; }
  get category(): ProductCategory { return this._category; }
  get imageUrl(): string { return this._imageUrl; }
  get preparationTimeMinutes(): number { return this._preparationTimeMinutes; }
  get rating(): number { return this._rating; }
  get isAvailable(): boolean { return this._isAvailable; }
  get isDailySpecial(): boolean { return this._isDailySpecial; }
  get tags(): string[] { return [...this._tags]; }
  get allergens(): string[] { return [...this._allergens]; }
  get calories(): number | undefined { return this._calories; }
  get availableSizes() { return [...this._availableSizes]; }
  get availableMilks() { return [...this._availableMilks]; }
  get availableExtras() { return [...this._availableExtras]; }

  /**
   * Business Logic: Calculate the unit price of this product given customized options
   */
  public calculateUnitPrice(customization?: ProductCustomization): number {
    let price = this._basePrice;
    if (!customization) return price;

    if (customization.size) {
      const sizeOpt = this._availableSizes.find(s => s.size === customization.size);
      if (sizeOpt) price += sizeOpt.additionalPrice;
    }

    if (customization.milk) {
      const milkOpt = this._availableMilks.find(m => m.type === customization.milk);
      if (milkOpt) price += milkOpt.additionalPrice;
    }

    if (customization.selectedExtras && customization.selectedExtras.length > 0) {
      for (const extraId of customization.selectedExtras) {
        const extraOpt = this._availableExtras.find(e => e.id === extraId);
        if (extraOpt) price += extraOpt.price;
      }
    }

    return Number(price.toFixed(2));
  }

  public setAvailability(available: boolean): void {
    this._isAvailable = available;
  }
}
