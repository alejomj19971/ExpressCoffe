/**
 * Presentation View: CartView
 * Full-fidelity cart & checkout experience (Image 19.png)
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { PaymentMethodType, OrderMode } from '../../domain/entities/Order.ts';

export const CartView: React.FC = () => {
  const {
    cart,
    updateCartItemQty,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartTotal,
    hasReusableCup,
    setHasReusableCup,
    couponCode,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    orderMode,
    setOrderMode,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    customerBalance,
    submitOrder,
    setStudentTab,
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ecoDiscount = hasReusableCup ? 0.20 : 0.00;

  const handleCheckout = async () => {
    setIsSubmitting(true);
    try {
      await submitOrder();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[60vh] max-w-lg mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-[#efeeea] flex items-center justify-center text-[#8d4e24] mb-4">
          <span className="material-symbols-outlined text-[36px]">remove_shopping_cart</span>
        </div>
        <h2 className="text-xl font-bold text-[#1b1c1a]">Tu pedido está vacío</h2>
        <p className="text-sm text-[#504440] mt-1 max-w-xs">
          Explora los cafés de especialidad, focaccias y postres recién horneados del campus.
        </p>
        <button
          type="button"
          onClick={() => setStudentTab('explorar')}
          className="mt-6 px-6 py-3 rounded-2xl bg-[#2c1810] text-white text-sm font-semibold hover:bg-[#090100] active:scale-95 transition-all shadow-md"
        >
          Explorar Menú
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-28 max-w-lg mx-auto px-4 gap-4">
      {/* Header & Order Mode Segment */}
      <div className="flex flex-col gap-3 pt-2">
        <div className="flex items-baseline justify-between">
          <h1 className="text-2xl font-bold text-[#1b1c1a]">Mi Pedido</h1>
          <span className="text-xs font-semibold text-[#8d4e24] bg-[#ffdbc9]/40 px-3 py-1 rounded-full">
            {cart.reduce((s, i) => s + i.quantity, 0)} items
          </span>
        </div>

        {/* Mode Selector Tabs */}
        <div className="p-1 bg-[#efeeea] rounded-2xl flex items-center justify-between shadow-inner">
          <button
            type="button"
            onClick={() => setOrderMode('express')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-center transition-all duration-200 flex items-center justify-center gap-1.5 ${
              orderMode === 'express'
                ? 'bg-[#2c1810] text-white shadow-sm'
                : 'text-[#504440] hover:text-[#1b1c1a]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>Barra Express</span>
          </button>
          <button
            type="button"
            onClick={() => setOrderMode('table')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-center transition-all duration-200 flex items-center justify-center gap-1.5 ${
              orderMode === 'table'
                ? 'bg-[#2c1810] text-white shadow-sm'
                : 'text-[#504440] hover:text-[#1b1c1a]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">deck</span>
            <span>Mesa / Terraza</span>
          </button>
        </div>
      </div>

      {/* Pickup Location Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eae8e4] flex items-start gap-3 relative overflow-hidden">
        <div className="w-10 h-10 rounded-xl bg-[#ffdbc9] flex items-center justify-center text-[#70370e] shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[20px]">storefront</span>
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#8d4e24]">Punto de entrega</span>
          <span className="text-sm font-bold text-[#1b1c1a] truncate">Barra Principal · Aulario Central</span>
          <div className="flex items-center gap-1.5 mt-1 text-[#504440] text-xs">
            <span className="material-symbols-outlined text-[15px] text-[#e85303] animate-pulse">timer</span>
            <span>
              Espera estimada: <strong className="text-[#e85303]">8 - 12 min</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Cart Items List */}
      <div className="flex flex-col gap-3">
        {cart.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-3 shadow-sm border border-[#eae8e4] flex gap-3 items-center"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#efeeea] relative">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col flex-1 min-w-0 pr-1">
              <div className="flex items-start justify-between gap-1">
                <h2 className="text-sm font-bold text-[#1b1c1a] line-clamp-1">{item.product.name}</h2>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="text-[#827470] hover:text-[#ba1a1a] transition-colors p-1"
                >
                  <span className="material-symbols-outlined text-[17px]">close</span>
                </button>
              </div>
              <p className="text-xs text-[#504440] line-clamp-1 mt-0.5">
                {item.customization ? (
                  <>
                    {item.customization.size && `${item.customization.size} · `}
                    {item.customization.milk && `Leche ${item.customization.milk} · `}
                    {item.customization.baristaNotes ? item.customization.baristaNotes : 'Personalizado'}
                  </>
                ) : (
                  'Receta estándar'
                )}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-bold text-[#2c1810] font-mono">${item.subtotal.toFixed(2)}</span>
                <div className="flex items-center gap-2 bg-[#f5f3ef] px-2 py-1 rounded-full">
                  <button
                    type="button"
                    onClick={() => updateCartItemQty(item.id, -1)}
                    className="w-5 h-5 flex items-center justify-center text-[#504440] hover:text-[#1b1c1a]"
                  >
                    <span className="material-symbols-outlined text-[14px]">remove</span>
                  </button>
                  <span className="text-xs font-bold text-[#1b1c1a] w-3 text-center">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateCartItemQty(item.id, 1)}
                    className="w-5 h-5 flex items-center justify-center text-[#504440] hover:text-[#1b1c1a]"
                  >
                    <span className="material-symbols-outlined text-[14px]">add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Eco Mug Toggle */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eae8e4] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#ffdbc9]/50 flex items-center justify-center text-[#8d4e24] shrink-0">
            <span className="material-symbols-outlined text-[20px]">coffee</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-[#1b1c1a] truncate">Traigo mi propio termo / taza</span>
            <span className="text-xs text-[#8d4e24] font-medium">-$0.20 descuento eco sostenible</span>
          </div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={hasReusableCup}
          onClick={() => setHasReusableCup(!hasReusableCup)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ${
            hasReusableCup ? 'bg-[#2c1810]' : 'bg-[#d3c3be]'
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ${
              hasReusableCup ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Cupón Universitario */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eae8e4] flex flex-col gap-2">
        <span className="text-[10px] uppercase font-bold tracking-wider text-[#504440]">Cupón universitario</span>
        {couponDiscount > 0 ? (
          <div className="flex items-center justify-between bg-[#f5f3ef] px-3.5 py-2.5 rounded-xl">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#8d4e24] text-[20px]">verified</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#1b1c1a] font-mono tracking-wide">{couponCode}</span>
                <span className="text-[11px] text-[#8d4e24] font-semibold">
                  Beneficio aplicado (-${couponDiscount.toFixed(2)})
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={removeCoupon}
              className="text-[#827470] hover:text-[#ba1a1a] p-1"
            >
              <span className="material-symbols-outlined text-[18px]">delete_outline</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputCoupon}
              onChange={(e) => setInputCoupon(e.target.value)}
              placeholder="Ej. ESTUDIANTE2024"
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-[#f5f3ef] border border-[#eae8e4] text-[#1b1c1a] uppercase outline-none focus:border-[#8d4e24]"
            />
            <button
              type="button"
              onClick={() => {
                applyCoupon(inputCoupon);
                setInputCoupon('');
              }}
              className="px-3 py-2 rounded-xl bg-[#2c1810] text-white text-xs font-semibold hover:bg-[#8d4e24] transition-colors"
            >
              Aplicar
            </button>
          </div>
        )}
      </div>

      {/* Método de Pago */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eae8e4] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#1b1c1a]">Método de pago</span>
          <span className="text-xs text-[#8d4e24] font-semibold">Cambiar</span>
        </div>

        {/* Credencial Universitaria (Selected) */}
        <label
          onClick={() => setSelectedPaymentMethod('campus_card')}
          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
            selectedPaymentMethod === 'campus_card'
              ? 'border-[#2c1810] bg-[#ffdbc9]/20'
              : 'border-[#eae8e4] bg-[#f5f3ef]'
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#2c1810] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">badge</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1b1c1a] truncate">Credencial Universitaria</span>
                <span className="text-[9px] bg-[#8d4e24] text-white px-2 py-0.2 rounded-full font-semibold">
                  Instantáneo
                </span>
              </div>
              <span className="text-[11px] text-[#504440]">
                Saldo disponible: <strong className="text-[#1b1c1a] font-mono">${customerBalance.toFixed(2)}</strong>
              </span>
            </div>
          </div>
          <div className="w-5 h-5 rounded-full bg-[#2c1810] flex items-center justify-center shrink-0">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        </label>

        {/* Other Payment Pills */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setSelectedPaymentMethod('credit_debit')}
            className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
              selectedPaymentMethod === 'credit_debit'
                ? 'border-[#2c1810] bg-[#ffdbc9]/20 text-[#1b1c1a] font-bold'
                : 'border-[#eae8e4] bg-[#f5f3ef] text-[#504440]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">credit_card</span>
            <span className="truncate">Tarjeta Déb./Créd.</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedPaymentMethod('bizum_qr')}
            className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
              selectedPaymentMethod === 'bizum_qr'
                ? 'border-[#2c1810] bg-[#ffdbc9]/20 text-[#1b1c1a] font-bold'
                : 'border-[#eae8e4] bg-[#f5f3ef] text-[#504440]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">phone_iphone</span>
            <span className="truncate">Bizum / Yape</span>
          </button>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eae8e4] flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs text-[#504440]">
          <span>Subtotal</span>
          <span className="font-semibold text-[#1b1c1a] font-mono">${cartSubtotal.toFixed(2)}</span>
        </div>
        {couponDiscount > 0 && (
          <div className="flex justify-between items-center text-xs text-[#8d4e24] font-medium">
            <span>Descuento estudiante (2024)</span>
            <span className="font-mono">-${couponDiscount.toFixed(2)}</span>
          </div>
        )}
        {hasReusableCup && (
          <div className="flex justify-between items-center text-xs text-[#8d4e24] font-medium">
            <span>Descuento termo reutilizable</span>
            <span className="font-mono">-${ecoDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between items-center text-xs text-[#504440]">
          <span>Impuestos de campus (incluidos)</span>
          <span className="font-mono">$0.00</span>
        </div>
        <div className="h-px bg-[#eae8e4] my-1" />
        <div className="flex justify-between items-baseline pt-1">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#1b1c1a]">Total a pagar</span>
            <span className="text-[11px] text-[#504440]">Con cargo a Credencial</span>
          </div>
          <span className="text-2xl font-bold text-[#2c1810] font-mono">${cartTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Final Action Button */}
      <div className="flex flex-col gap-2 pt-2">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleCheckout}
          className="w-full py-4 px-4 bg-[#2c1810] text-white rounded-2xl font-bold text-sm shadow-xl hover:bg-[#090100] active:scale-[0.98] transition-all flex items-center justify-between disabled:opacity-50"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#ffdbc9]">lock</span>
            <span>{isSubmitting ? 'Procesando comanda...' : 'Confirmar y Pagar'}</span>
          </div>
          <span className="font-mono text-base text-[#ffdbc9] font-bold">${cartTotal.toFixed(2)}</span>
        </button>

        <div className="flex items-center justify-center gap-1.5 py-1 text-[#504440]">
          <span className="material-symbols-outlined text-[16px] text-[#8d4e24]">schedule</span>
          <span className="text-xs">Listo en aprox. <strong>8-12 minutos</strong> (antes de tu siguiente clase)</span>
        </div>
      </div>
    </div>
  );
};
