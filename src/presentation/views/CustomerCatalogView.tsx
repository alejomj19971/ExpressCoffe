/**
 * Presentation View: CustomerCatalogView
 * Student / Customer Catalog & Menu (Image 13.png)
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { ProductCategory, Product } from '../../domain/entities/Product.ts';
import { IMAGES } from '../../infrastructure/mocks/mockData.ts';

export const CustomerCatalogView: React.FC = () => {
  const { products, setSelectedProductForModal, addToCart, setStudentTab, cart, cartTotal } = useApp();

  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('bebidas');
  const [selectedDiet, setSelectedDiet] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products
  const filteredProducts = products.filter(p => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    if (selectedDiet) {
      const match = p.tags.some(t => t.toLowerCase().includes(selectedDiet.toLowerCase()));
      if (!match) return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    }
    return true;
  });

  const favorites = products.filter(p => ['prod-latte-caramelo', 'prod-focaccia-pavo', 'prod-cold-brew-caramelo'].includes(p.id));
  const quickBreaks = products.filter(p => ['prod-acai-bowl', 'prod-muffin-arandanos', 'prod-matcha-latte'].includes(p.id));

  return (
    <div className="flex flex-col w-full pb-24 max-w-lg mx-auto">
      {/* Saludo Cálido & Selector de Retiro Rápido */}
      <section className="px-4 pt-3 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col min-w-0">
            <span className="text-xs uppercase font-bold tracking-wider text-[#8d4e24]">
              Buenos días de parciales
            </span>
            <h1 className="text-2xl font-bold text-[#090100] tracking-tight mt-0.5">
              ¡Hola, Mateo! ☕
            </h1>
            <p className="text-xs text-[#504440] mt-0.5">¿Qué se te antoja para recargar hoy?</p>
          </div>
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-[#efeeea] flex items-center justify-center text-[#1b1c1a] hover:bg-[#eae8e4] transition-transform active:scale-95 shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
        </div>

        {/* Pickup location indicator */}
        <div className="flex items-center justify-between p-3 bg-[#f5f3ef] rounded-2xl shadow-sm border border-[#eae8e4]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#ffdbc9] flex items-center justify-center text-[#70370e] shrink-0">
              <span className="material-symbols-outlined text-[18px]">storefront</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] text-[#504440]">Punto de entrega</span>
              <span className="text-xs font-bold text-[#1b1c1a] truncate">Campus Central - Sede Aulario</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full shadow-sm shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#e85303] animate-pulse" />
            <span className="text-[11px] font-semibold text-[#1b1c1a]">4 min espera</span>
          </div>
        </div>
      </section>

      {/* Buscador & Acciones */}
      <section className="px-4 mt-4 flex items-center gap-2">
        <div className="flex-1 flex items-center bg-[#f5f3ef] rounded-2xl px-3.5 h-12 shadow-sm focus-within:bg-white focus-within:shadow-md border border-transparent focus-within:border-[#d3c3be] transition-all">
          <span className="material-symbols-outlined text-[#827470] text-[20px] mr-2">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar café, sándwich, snack..."
            className="bg-transparent border-none outline-none w-full text-sm text-[#1b1c1a] placeholder:text-[#827470]"
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery('')} className="text-[#827470] p-1">
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
        <button
          type="button"
          aria-label="Escanear QR de mesa"
          className="w-12 h-12 rounded-2xl bg-[#f5f3ef] text-[#1b1c1a] flex items-center justify-center hover:bg-[#eae8e4] shadow-sm active:scale-95 transition-all border border-[#eae8e4]"
        >
          <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
        </button>
      </section>

      {/* Banner Promocional Combo Estudio */}
      <section className="mt-4 px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2c1810] via-[#090100] to-[#080100] text-white p-5 shadow-lg">
          <div className="relative z-10 flex flex-col max-w-[62%]">
            <div className="inline-flex items-center gap-1 bg-[#feab79]/90 text-[#783d14] px-2.5 py-0.5 rounded-full w-fit mb-2">
              <span className="material-symbols-outlined text-[13px]">school</span>
              <span className="text-[10px] font-bold tracking-wider">20% OFF CREDENCIAL</span>
            </div>
            <h2 className="text-xl font-bold leading-tight">Combo Estudio</h2>
            <p className="text-xs text-[#9e7e73] mt-1 line-clamp-2">
              Latte Doble + Croissant de Mantequilla recién horneado.
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold text-[#ffdbc9] font-mono">$4.50</span>
              <span className="text-xs line-through text-[#827470] font-mono">$5.60</span>
            </div>
            <button
              type="button"
              onClick={() => {
                const combo = products.find(p => p.id === 'prod-combo-estudio') || products[0];
                setSelectedProductForModal(combo);
              }}
              className="mt-3 inline-flex items-center justify-center gap-1.5 bg-[#ffdbc9] text-[#70370e] font-semibold text-xs px-3.5 py-2.5 rounded-xl shadow-sm hover:brightness-105 active:scale-95 transition-all w-fit"
            >
              <span>Aprovechar Combo</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
          {/* Combo Image */}
          <div className="absolute right-0 bottom-0 top-0 w-44 overflow-hidden rounded-r-3xl pointer-events-none">
            <img
              src={IMAGES.comboEstudio}
              alt="Combo Estudio"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2c1810] via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Categorías Horizontales */}
      <section className="mt-6">
        <div className="px-4 flex items-center justify-between mb-2">
          <h2 className="text-base font-bold text-[#1b1c1a]">Categorías</h2>
          <button
            type="button"
            onClick={() => { setActiveCategory('all'); setSelectedDiet(null); }}
            className="text-xs font-semibold text-[#8d4e24] hover:underline"
          >
            Ver todo
          </button>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto px-4 no-scrollbar pb-1">
          {[
            { id: 'bebidas', label: 'Bebidas', icon: 'local_cafe' },
            { id: 'almuerzos', label: 'Almuerzos', icon: 'lunch_dining' },
            { id: 'postres', label: 'Postres', icon: 'bakery_dining' },
            { id: 'snacks', label: 'Snacks', icon: 'cookie' },
            { id: 'fit', label: 'Fit & Salud', icon: 'eco' },
          ].map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as ProductCategory)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all shrink-0 active:scale-95 ${
                  isActive
                    ? 'bg-[#2c1810] text-white shadow-sm'
                    : 'bg-[#f5f3ef] text-[#504440] hover:bg-[#efeeea]'
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Filtros Dietéticos Rápidos */}
      <section className="mt-2.5 px-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { tag: 'Avena', label: '🌱 Avena / Vegetal' },
            { tag: 'Sin Gluten', label: '🌾 Sin Gluten' },
            { tag: 'Doble Shot', label: '⚡ Doble Shot' },
            { tag: 'Extra Frío', label: '🧊 Extra Frío' },
          ].map(item => {
            const isSelected = selectedDiet === item.tag;
            return (
              <button
                key={item.tag}
                type="button"
                onClick={() => setSelectedDiet(prev => prev === item.tag ? null : item.tag)}
                className={`px-2.5 py-1 rounded-full text-xs transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-[#8d4e24] text-white font-semibold'
                    : 'bg-[#efeeea] text-[#504440] hover:bg-[#eae8e4]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Favoritos del Campus */}
      <section className="mt-6 px-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#8d4e24] text-[18px]">local_fire_department</span>
            <h2 className="text-base font-bold text-[#1b1c1a]">Favoritos del campus</h2>
          </div>
          <span className="text-xs text-[#504440]">Top votados</span>
        </div>

        <div className="flex flex-col gap-3">
          {favorites.map(item => (
            <article
              key={item.id}
              onClick={() => setSelectedProductForModal(item)}
              className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-all flex gap-3.5 items-center cursor-pointer border border-[#eae8e4]/60"
            >
              <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-[#efeeea]">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1 left-1 bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[10px] text-[#8d4e24] font-bold">
                  ★ {item.rating}
                </span>
              </div>
              <div className="flex flex-col justify-between flex-1 min-w-0 h-24 py-0.5">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] uppercase font-bold text-[#8d4e24] bg-[#ffdbc9]/50 px-1.5 py-0.5 rounded">
                      {item.isDailySpecial ? 'Especial' : 'Favorito'}
                    </span>
                    <span className="text-[11px] text-[#504440] flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">schedule</span> {item.preparationTimeMinutes} min
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#1b1c1a] truncate">{item.name}</h3>
                  <p className="text-xs text-[#504440] line-clamp-1 mt-0.5">{item.description}</p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-base font-bold text-[#2c1810] font-mono">${item.basePrice.toFixed(2)}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item, 1);
                    }}
                    className="w-8 h-8 rounded-full bg-[#ffdbc9] text-[#70370e] flex items-center justify-center hover:bg-[#8d4e24] hover:text-white active:scale-90 transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Para el Break Rápido (Grid 2 cols) */}
      <section className="mt-6 px-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#8d4e24] text-[18px]">bolt</span>
            <h2 className="text-base font-bold text-[#1b1c1a]">Para el break rápido</h2>
          </div>
          <span className="text-xs font-semibold text-[#8d4e24]">Listo en &lt;6m</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {quickBreaks.slice(0, 2).map(item => (
            <article
              key={item.id}
              onClick={() => setSelectedProductForModal(item)}
              className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer border border-[#eae8e4]/60"
            >
              <div>
                <div className="relative w-full h-28 rounded-xl overflow-hidden bg-[#efeeea] mb-2">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1.5 left-1.5 bg-[#ffdbc9]/90 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] text-[#70370e] font-bold">
                    {item.tags[0] || 'Top'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#504440] text-[11px] mb-0.5">
                  <span>★ {item.rating}</span>
                  <span>{item.preparationTimeMinutes} min</span>
                </div>
                <h3 className="text-xs font-bold text-[#1b1c1a] line-clamp-1">{item.name}</h3>
                <p className="text-[11px] text-[#504440] line-clamp-1 mt-0.5">{item.description}</p>
              </div>
              <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#eae8e4]">
                <span className="text-sm font-bold text-[#2c1810] font-mono">${item.basePrice.toFixed(2)}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item, 1);
                  }}
                  className="w-7 h-7 rounded-full bg-[#efeeea] text-[#1b1c1a] flex items-center justify-center hover:bg-[#8d4e24] hover:text-white active:scale-90 transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Floating Cart Checkout Button if cart has items */}
      {cart.length > 0 && (
        <div className="sticky bottom-20 px-4 mt-6 z-30">
          <div
            onClick={() => setStudentTab('carrito')}
            className="bg-[#2c1810] text-white rounded-2xl shadow-xl p-3.5 flex items-center justify-between cursor-pointer hover:bg-[#090100] active:scale-[0.99] transition-all border border-[#5a4137]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-10 h-10 rounded-xl bg-[#8d4e24] flex items-center justify-center text-white shrink-0 shadow-inner">
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                <span className="absolute -top-1 -right-1.5 bg-[#e85303] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-xs text-white">Tu pedido entre clases</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#feab79]" />
                  <span className="font-mono text-xs font-bold text-[#ffdbc9]">${cartTotal.toFixed(2)}</span>
                </div>
                <span className="text-[11px] text-[#9e7e73] truncate">Recogida: Edificio B · En 7 min</span>
              </div>
            </div>
            <div className="bg-[#ffdbc9] text-[#70370e] text-xs font-bold px-3 py-2 rounded-xl shadow-sm flex items-center gap-1 shrink-0">
              <span>Revisar</span>
              <span className="material-symbols-outlined text-[15px]">chevron_right</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
