/**
 * Presentation Component: ProductDetailModal
 * Full-fidelity product customization modal matching Image 15.png
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { BeverageTemperature, CupSize, MilkType, SweetnessLevel } from '../../domain/entities/Product.ts';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductForModal, setSelectedProductForModal, addToCart } = useApp();

  const product = selectedProductForModal;

  const [temperature, setTemperature] = useState<BeverageTemperature>('hot');
  const [size, setSize] = useState<CupSize>('12oz');
  const [milk, setMilk] = useState<MilkType>('avena');
  const [sweetness, setSweetness] = useState<SweetnessLevel>(100);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [baristaNotes, setBaristaNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isSuccessAnimated, setIsSuccessAnimated] = useState(false);

  if (!product) return null;

  // Calculate live price
  const unitPrice = product.calculateUnitPrice({
    temperature,
    size,
    milk,
    sweetness,
    selectedExtras,
    baristaNotes,
  });

  const totalPrice = Number((unitPrice * quantity).toFixed(2));

  const toggleExtra = (extraId: string) => {
    setSelectedExtras(prev =>
      prev.includes(extraId) ? prev.filter(id => id !== extraId) : [...prev, extraId]
    );
  };

  const handleAddToCart = () => {
    setIsSuccessAnimated(true);
    addToCart(product, quantity, {
      temperature,
      size,
      milk,
      sweetness,
      selectedExtras,
      baristaNotes,
    });

    setTimeout(() => {
      setIsSuccessAnimated(false);
      setSelectedProductForModal(null);
    }, 600);
  };

  const isBeverage = product.category === 'bebidas';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-[#fbf9f5] text-[#1b1c1a] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-3.5 bg-[#fbf9f5]/90 backdrop-blur-md border-b border-[#eae8e4]">
          <button
            onClick={() => setSelectedProductForModal(null)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#1b1c1a] hover:bg-[#eae8e4] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
          </button>
          <span className="font-semibold text-[17px] text-[#1b1c1a] truncate">Detalle Producto</span>
          <button
            onClick={() => setSelectedProductForModal(null)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#504440] hover:text-[#1b1c1a] hover:bg-[#eae8e4]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto px-5 py-4 flex flex-col gap-5 no-scrollbar pb-24">
          {/* Hero Image Card */}
          <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-sm bg-[#eae8e4]">
            <img
              src={product.imageUrl}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/85 via-transparent to-black/20" />

            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#feab79] text-[#783d14] text-xs font-bold shadow-sm">
                <span className="material-symbols-outlined text-[15px]">local_fire_department</span>
                El más pedido del campus
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#1b1c1a] text-xs font-semibold shadow-sm">
                <span className="material-symbols-outlined text-[15px] text-[#8d4e24]">schedule</span>
                {product.preparationTimeMinutes} min
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
              <div>
                <span className="inline-block px-2 py-0.5 rounded bg-[#8d4e24] text-white text-[10px] uppercase font-bold tracking-wider mb-1">
                  Grano de Especialidad
                </span>
                <p className="text-xs text-[#eae8e4]">Finca Santa Rosa · Tueste Medio</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[11px] text-[#eae8e4]">Base desde</span>
                <span className="text-2xl font-bold leading-none">${product.basePrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Title & Description */}
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-[#1b1c1a]">{product.name}</h2>
            <p className="text-sm text-[#504440] leading-relaxed">{product.description}</p>
          </div>

          {/* Temperature Options (for beverages) */}
          {isBeverage && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-[#1b1c1a]">Temperatura</span>
                <span className="text-xs text-[#8d4e24] font-medium">Obligatorio</span>
              </div>
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#efeeea]">
                <button
                  type="button"
                  onClick={() => setTemperature('hot')}
                  className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    temperature === 'hot'
                      ? 'bg-[#2c1810] text-white shadow-sm'
                      : 'text-[#504440] hover:text-[#1b1c1a]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
                  Caliente 🔥
                </button>
                <button
                  type="button"
                  onClick={() => setTemperature('cold')}
                  className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    temperature === 'cold'
                      ? 'bg-[#2c1810] text-white shadow-sm'
                      : 'text-[#504440] hover:text-[#1b1c1a]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">ac_unit</span>
                  Frío con hielo 🧊
                </button>
              </div>
            </div>
          )}

          {/* Size Options (for beverages) */}
          {isBeverage && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-[#1b1c1a]">Tamaño de vaso</span>
                <span className="text-xs text-[#8d4e24] font-medium">Elige uno</span>
              </div>
              <div className="flex flex-col gap-2">
                {product.availableSizes.map(opt => (
                  <label
                    key={opt.size}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      size === opt.size
                        ? 'border-[#2c1810] bg-[#ffdbc9]/20'
                        : 'border-[#eae8e4] bg-[#f5f3ef] hover:bg-[#efeeea]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="modal-size"
                        checked={size === opt.size}
                        onChange={() => setSize(opt.size)}
                        className="accent-[#8d4e24] w-4 h-4"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#1b1c1a]">{opt.label}</span>
                        <span className="text-xs text-[#504440]">
                          {opt.size === '12oz' ? 'Regular de sesión corta' : opt.size === '16oz' ? 'Para dos bloques de clase' : 'Modo exámenes finales'}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#8d4e24]">
                      {opt.additionalPrice === 0 ? 'Incluido' : `+$${opt.additionalPrice.toFixed(2)}`}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Milk Options */}
          {isBeverage && (
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-sm text-[#1b1c1a]">Tipo de Leche</span>
              <div className="grid grid-cols-2 gap-2">
                {product.availableMilks.map(m => (
                  <label
                    key={m.type}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer text-xs transition-all ${
                      milk === m.type
                        ? 'border-[#2c1810] bg-[#ffdbc9]/20 font-semibold'
                        : 'border-[#eae8e4] bg-[#f5f3ef] hover:bg-[#efeeea]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="modal-milk"
                        checked={milk === m.type}
                        onChange={() => setMilk(m.type)}
                        className="accent-[#8d4e24] w-3.5 h-3.5"
                      />
                      <span className="text-[#1b1c1a]">{m.label}</span>
                    </div>
                    <span className="text-[#8d4e24]">
                      {m.additionalPrice === 0 ? '+$0' : `+$${m.additionalPrice.toFixed(2)}`}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Sweetness Level */}
          {isBeverage && (
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-sm text-[#1b1c1a]">Nivel de dulzor</span>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {[
                  { value: 0, label: 'Sin azúcar' },
                  { value: 50, label: '50% ligero' },
                  { value: 100, label: 'Normal 100%' },
                  { value: 'cinnamon', label: 'Toque Canela' },
                ].map(sw => (
                  <button
                    key={String(sw.value)}
                    type="button"
                    onClick={() => setSweetness(sw.value as SweetnessLevel)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                      sweetness === sw.value
                        ? 'bg-[#2c1810] text-white shadow-sm'
                        : 'bg-[#efeeea] text-[#504440] hover:text-[#1b1c1a]'
                    }`}
                  >
                    {sw.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extras */}
          {product.availableExtras.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-sm text-[#1b1c1a]">Extras opcionales</span>
              <div className="flex flex-col gap-2">
                {product.availableExtras.map(extra => {
                  const isChecked = selectedExtras.includes(extra.id);
                  return (
                    <label
                      key={extra.id}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked ? 'border-[#8d4e24] bg-[#ffdbc9]/20' : 'border-[#eae8e4] bg-[#f5f3ef]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleExtra(extra.id)}
                          className="accent-[#8d4e24] w-4 h-4 rounded"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-[#1b1c1a]">{extra.name}</span>
                          {extra.description && (
                            <span className="text-xs text-[#504440]">{extra.description}</span>
                          )}
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#8d4e24]">+${extra.price.toFixed(2)}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Barista Notes */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="modal-notes" className="text-sm font-semibold text-[#1b1c1a]">
                Instrucciones para el barista
              </label>
              <span className="text-xs text-[#8d4e24] flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[14px]">eco</span>
                Eco-friendly
              </span>
            </div>
            <textarea
              id="modal-notes"
              value={baristaNotes}
              onChange={(e) => setBaristaNotes(e.target.value)}
              placeholder="Ej. En vaso térmico propio (descuento ecológico de -$0.20 en caja), sin tapa plástica..."
              rows={2}
              className="w-full p-3 rounded-xl bg-[#efeeea] text-sm text-[#1b1c1a] placeholder:text-[#827470] focus:outline-none focus:ring-1 focus:ring-[#8d4e24] resize-none"
            />
          </div>
        </div>

        {/* Fixed Action Footer */}
        <div className="sticky bottom-0 z-20 px-5 py-3.5 bg-[#fbf9f5]/95 backdrop-blur-md border-t border-[#eae8e4] flex items-center gap-3">
          {/* Quantity Controls */}
          <div className="flex items-center justify-between bg-[#efeeea] rounded-xl px-2 h-12 w-28 shrink-0">
            <button
              type="button"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#1b1c1a] hover:bg-[#eae8e4]"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <span className="font-bold text-sm text-[#1b1c1a]">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(q => Math.min(10, q + 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#1b1c1a] hover:bg-[#eae8e4]"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>

          {/* Add Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex-1 h-12 px-4 rounded-xl flex items-center justify-between font-semibold shadow-md active:scale-[0.98] transition-all ${
              isSuccessAnimated
                ? 'bg-[#2E7D32] text-white'
                : 'bg-[#2c1810] text-white hover:bg-[#090100]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                {isSuccessAnimated ? 'check_circle' : 'shopping_bag'}
              </span>
              <span>{isSuccessAnimated ? '¡Agregado!' : 'Agregar al pedido'}</span>
            </div>
            <span className="font-mono text-base font-bold">${totalPrice.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
