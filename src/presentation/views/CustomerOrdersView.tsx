/**
 * Presentation View: CustomerOrdersView
 * Live order tracking & past order history (Image 17.png)
 */

import React from 'react';
import { useApp } from '../context/AppContext.tsx';

export const CustomerOrdersView: React.FC = () => {
  const { activeStudentOrder, orders, customer, showToast, addToCart, products, setStudentTab } = useApp();

  const pastOrders = orders.filter(
    o => o.status === 'DELIVERED' || o.id === 'ord-2480' || o.id === 'ord-2481'
  );

  const handleRepeatOrder = (orderNumber: string) => {
    const latte = products.find(p => p.id === 'prod-latte-caramelo');
    const muffin = products.find(p => p.id === 'prod-muffin-arandanos');
    if (latte) addToCart(latte, 1);
    if (muffin) addToCart(muffin, 1);
    showToast(`Items de ${orderNumber} agregados al carrito`);
    setStudentTab('carrito');
  };

  const currentOrder = activeStudentOrder || orders[0];

  return (
    <div className="flex flex-col w-full pb-28 max-w-lg mx-auto px-4 gap-5">
      {/* Active Order Hero Card */}
      {currentOrder && (
        <section className="flex flex-col bg-white rounded-3xl shadow-md border border-[#eae8e4] overflow-hidden">
          {/* Header Banner */}
          <div className="p-4 bg-[#2c1810] text-white flex flex-col gap-2 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#8d4e24] text-white text-[10px] font-bold uppercase tracking-wider">
                  En vivo
                </span>
                <span className="font-bold text-sm text-white">Pedido {currentOrder.orderNumber}</span>
              </div>
              <span className="material-symbols-outlined text-[#feab79]">local_cafe</span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xs text-[#9e7e73]">Hora estimada:</span>
              <p className="text-xl font-bold text-[#feab79] font-mono leading-none">
                {currentOrder.estimatedPickupTime || '10:18 AM'}
              </p>
              <span className="text-xs text-[#eae8e4]">(En ~5 minutos)</span>
            </div>

            {/* Live Progress Bar */}
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mt-1">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  currentOrder.status === 'READY_FOR_PICKUP'
                    ? 'w-[85%] bg-[#2E7D32]'
                    : currentOrder.status === 'DELIVERED'
                    ? 'w-full bg-[#2E7D32]'
                    : 'w-[52%] bg-[#feab79] animate-pulse'
                }`}
              />
            </div>
          </div>

          {/* QR + PIN Pickup Block */}
          <div className="p-4 flex items-center justify-between bg-[#f5f3ef] border-b border-[#eae8e4]">
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-[#504440] uppercase tracking-wider">
                Mostrador Campus
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xs text-[#504440]">PIN:</span>
                <span className="text-2xl font-black text-[#8d4e24] tracking-tight font-mono">
                  #{currentOrder.pickupPin}
                </span>
              </div>
              <p className="text-xs text-[#504440] mt-0.5 line-clamp-1">Muestra este código al barista</p>
            </div>

            {/* Lightweight QR Code */}
            <div className="flex flex-col items-center bg-white p-2 rounded-xl shadow-sm border border-[#eae8e4] shrink-0">
              <svg className="w-14 h-14 text-[#2c1810]" fill="currentColor" viewBox="0 0 100 100">
                <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
                <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
                <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
                <rect height="20" width="10" x="40" y="10" />
                <rect height="10" width="10" x="55" y="5" />
                <rect height="20" width="30" x="35" y="40" />
                <rect height="15" width="15" x="10" y="40" />
                <rect height="10" width="20" x="75" y="45" />
                <rect height="25" width="15" x="40" y="70" />
                <rect height="20" width="25" x="65" y="75" />
              </svg>
              <span className="text-[8px] font-bold text-[#504440] uppercase tracking-wider mt-1">Escanear</span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#1b1c1a]">Progreso de preparación</span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#8d4e24] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#e85303] animate-ping" />
                Mostrador en marcha
              </span>
            </div>

            <div className="relative flex flex-col gap-4 pl-1">
              {/* Connecting line */}
              <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-[#eae8e4] z-0" />

              {/* Step 1: Pedido tomado */}
              <div className="relative z-10 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#8d4e24] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#1b1c1a]">Pedido tomado</p>
                    <span className="text-[11px] text-[#504440]">10:02 AM</span>
                  </div>
                  <p className="text-[11px] text-[#504440]">Confirmado por el sistema de cocina</p>
                </div>
              </div>

              {/* Step 2: En preparación */}
              <div
                className={`relative z-10 flex items-start gap-3 p-2.5 rounded-2xl ${
                  currentOrder.status === 'PREPARING'
                    ? 'bg-[#f5f3ef] border border-[#ffdbc9]'
                    : ''
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                    currentOrder.status === 'PREPARING'
                      ? 'bg-[#e85303] text-white'
                      : currentOrder.status === 'READY_FOR_PICKUP' || currentOrder.status === 'DELIVERED'
                      ? 'bg-[#8d4e24] text-white'
                      : 'bg-[#efeeea] text-[#827470]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {currentOrder.status === 'PREPARING' ? 'sync' : 'check'}
                  </span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#8d4e24]">En preparación</p>
                    {currentOrder.status === 'PREPARING' && (
                      <span className="text-[10px] bg-[#ffdbc9] text-[#70370e] px-2 py-0.5 rounded-full font-bold">
                        En Proceso
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#504440] mt-0.5">
                    Barista Carlos preparando tus bebidas y horneando
                  </p>
                </div>
              </div>

              {/* Step 3: Listo para recoger */}
              <div
                className={`relative z-10 flex items-start gap-3 ${
                  currentOrder.status === 'READY_FOR_PICKUP' ? 'p-2.5 rounded-2xl bg-[#E8F5E9] border border-[#C8E6C9]' : 'opacity-60'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                    currentOrder.status === 'READY_FOR_PICKUP' || currentOrder.status === 'DELIVERED'
                      ? 'bg-[#2E7D32] text-white'
                      : 'bg-[#efeeea] text-[#827470]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">storefront</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0 pt-0.5">
                  <p className="text-xs font-bold text-[#1b1c1a]">Listo para recoger</p>
                  <p className="text-[11px] text-[#504440]">{currentOrder.pickupShelf || 'Mostrador Express Aulario'}</p>
                </div>
              </div>

              {/* Step 4: Entregado */}
              <div className={`relative z-10 flex items-start gap-3 ${currentOrder.status === 'DELIVERED' ? '' : 'opacity-40'}`}>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    currentOrder.status === 'DELIVERED' ? 'bg-[#2E7D32] text-white' : 'bg-[#efeeea] text-[#827470]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">task_alt</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0 pt-0.5">
                  <p className="text-xs font-bold text-[#1b1c1a]">Entregado / Despachado</p>
                  <p className="text-[11px] text-[#504440]">Finaliza con tu PIN #{currentOrder.pickupPin}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen de Items */}
          <div className="px-4 pb-4 flex flex-col gap-3 border-t border-[#eae8e4] pt-3">
            <div className="p-3 bg-[#f5f3ef] rounded-2xl flex flex-col gap-1.5">
              <span className="text-[10px] uppercase font-bold text-[#504440]">Resumen del pedido</span>
              {currentOrder.items.map(item => (
                <div key={item.id} className="flex items-center justify-between text-xs">
                  <span className="text-[#1b1c1a]">
                    {item.quantity}× {item.productName}
                  </span>
                  <span className="font-mono font-bold text-[#1b1c1a]">${item.subtotal.toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => showToast('Comunícate con la Barra Central: Ext. 402')}
                className="py-2.5 px-3 rounded-xl bg-[#efeeea] text-xs font-semibold text-[#1b1c1a] hover:bg-[#eae8e4] flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[17px] text-[#8d4e24]">call</span>
                <span>Contactar</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Recordatorio agendado a las 10:15 AM')}
                className="py-2.5 px-3 rounded-xl bg-[#efeeea] text-xs font-semibold text-[#1b1c1a] hover:bg-[#eae8e4] flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[17px] text-[#8d4e24]">event</span>
                <span>Recordatorio</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Banner Informativo Antifilas */}
      <div className="flex items-center gap-3 p-3.5 bg-[#ffdbc9]/40 border border-[#feab79]/50 rounded-2xl">
        <span className="material-symbols-outlined text-[#8d4e24] shrink-0">notifications_active</span>
        <p className="text-xs text-[#1b1c1a]">
          <strong>Sin filas:</strong> Espera la notificación de &ldquo;Listo&rdquo; antes de acercarte al mostrador central.
        </p>
      </div>

      {/* Historial de Pedidos Recientes */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#1b1c1a]">Historial de pedidos recientes</h2>
          <span className="text-xs font-semibold text-[#8d4e24]">Ver todos</span>
        </div>

        <div className="flex flex-col gap-3">
          {pastOrders.map(order => (
            <article
              key={order.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-[#eae8e4] flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#1b1c1a]">Pedido {order.orderNumber}</span>
                  <span className="text-xs text-[#827470]">·</span>
                  <span className="text-xs text-[#504440]">{order.estimatedPickupTime || 'Completado'}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32]">
                  Entregado
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <p className="text-[#504440] truncate max-w-[240px]">
                  {order.items.map(i => `${i.quantity}x ${i.productName}`).join(', ')}
                </p>
                <span className="font-mono font-bold text-[#1b1c1a]">${order.total.toFixed(2)}</span>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => handleRepeatOrder(order.orderNumber)}
                  className="px-3 py-1.5 rounded-xl bg-[#2c1810] text-white text-xs font-semibold hover:bg-[#8d4e24] active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[15px]">replay</span>
                  <span>Repetir pedido</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
