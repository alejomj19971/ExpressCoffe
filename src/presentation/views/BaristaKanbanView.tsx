/**
 * Presentation View: BaristaKanbanView
 * Real-time 4-column kitchen & barista Kanban board (Image 7.png)
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Order, OrderStatus } from '../../domain/entities/Order.ts';

export const BaristaKanbanView: React.FC = () => {
  const { orders, advanceOrderStatus, deliverOrderWithPin, showToast } = useApp();

  const [filterType, setFilterType] = useState<'all' | 'bebidas' | 'hornos' | 'express' | 'mesas'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => (prev <= 1 ? 5 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchesNum = order.orderNumber.toLowerCase().includes(q);
      const matchesCust = order.customer.name.toLowerCase().includes(q);
      const matchesItems = order.items.some(i => i.productName.toLowerCase().includes(q));
      if (!matchesNum && !matchesCust && !matchesItems) return false;
    }

    if (filterType === 'express' && order.mode !== 'express') return false;
    if (filterType === 'mesas' && order.mode !== 'table') return false;
    if (filterType === 'bebidas') {
      const hasBeverage = order.items.some(i => i.productName.toLowerCase().includes('latte') || i.productName.toLowerCase().includes('brew') || i.productName.toLowerCase().includes('espresso') || i.productName.toLowerCase().includes('americano'));
      if (!hasBeverage) return false;
    }
    if (filterType === 'hornos') {
      const hasFood = order.items.some(i => i.productName.toLowerCase().includes('focaccia') || i.productName.toLowerCase().includes('muffin') || i.productName.toLowerCase().includes('cookie') || i.productName.toLowerCase().includes('croissant'));
      if (!hasFood) return false;
    }
    return true;
  });

  const pendingOrders = filteredOrders.filter(o => o.status === 'PENDING');
  const preparingOrders = filteredOrders.filter(o => o.status === 'PREPARING');
  const readyOrders = filteredOrders.filter(o => o.status === 'READY_FOR_PICKUP');
  const deliveredOrders = filteredOrders.filter(o => o.status === 'DELIVERED');

  return (
    <div className="flex flex-col w-full gap-5 max-w-[1720px] mx-auto p-4 lg:p-6">
      {/* Top Operational Bar */}
      <section className="bg-white rounded-3xl p-5 shadow-sm border border-[#eae8e4] flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2c1810] text-[#ffdbc9] flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[26px]">view_kanban</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-[#090100] tracking-tight">
                  Gestión de Pedidos en Vivo · Barra Central
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-ping" />
                  Sincronizado
                </span>
              </div>
              <p className="text-xs text-[#504440]">
                4 estaciones activas · Tiempo promedio preparación: 4m 12s
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                showToast(soundEnabled ? 'Alertas sonoras silenciadas' : 'Alertas sonoras activadas');
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#f5f3ef] hover:bg-[#eae8e4] text-[#1b1c1a] text-xs font-semibold transition-all border border-[#eae8e4]"
            >
              <span className={`material-symbols-outlined text-[18px] ${soundEnabled ? 'text-[#e85303]' : 'text-[#827470]'}`}>
                {soundEnabled ? 'notifications_active' : 'notifications_off'}
              </span>
              <span>Alertas sonoras: <strong>{soundEnabled ? 'Activadas' : 'Silenciadas'}</strong></span>
            </button>

            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#f5f3ef] text-[#504440] text-xs border border-[#eae8e4]">
              <span className="material-symbols-outlined text-[16px] animate-spin text-[#8d4e24]">sync</span>
              <span>Refresco en: <strong className="text-[#1b1c1a] font-mono">{countdown}s</strong></span>
            </div>

            <button
              type="button"
              onClick={() => showToast('Abriendo ventana para nueva comanda presencial de mostrador')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2c1810] text-white text-xs font-bold hover:bg-[#090100] active:scale-95 transition-all shadow-md"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>+ Comanda Manual</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#eae8e4]">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: `Todos (${orders.length})` },
              { id: 'bebidas', label: '☕ Solo Bebidas' },
              { id: 'hornos', label: '🥐 Hornos & Caliente' },
              { id: 'express', label: '⚡ Express Mostrador' },
              { id: 'mesas', label: '🪑 Mesa / Terraza' },
            ].map(f => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilterType(f.id as typeof filterType)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  filterType === f.id
                    ? 'bg-[#2c1810] text-white shadow-sm'
                    : 'bg-[#f5f3ef] text-[#504440] hover:bg-[#eae8e4]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative flex items-center min-w-[280px]">
            <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#827470]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar # pedido, cliente o item..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#f5f3ef] text-[#1b1c1a] placeholder:text-[#827470] text-xs outline-none focus:bg-white focus:ring-1 focus:ring-[#8d4e24] border border-transparent focus:border-[#d3c3be]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-[#827470] hover:text-[#1b1c1a]"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 4-COLUMN KANBAN BOARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
        {/* Col 1: Pedido Tomado */}
        <div className="flex flex-col rounded-2xl bg-[#f5f3ef] p-3 gap-3 border border-[#eae8e4]">
          <div className="flex items-center justify-between p-2.5 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#feab79]" />
              <h2 className="text-xs font-bold text-[#1b1c1a]">1. Pedido Tomado</h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#feab79] text-[#783d14] text-[11px] font-bold">
              {pendingOrders.length} nuevos
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {pendingOrders.map(order => (
              <article
                key={order.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-[#eae8e4] flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-bold text-[#090100] font-mono">{order.orderNumber}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#efeeea] text-[#504440] text-[10px] font-semibold">
                        {order.mode === 'express' ? 'Barra Express' : order.tableNumber || 'Mesa'}
                      </span>
                    </div>
                    <span className="text-xs text-[#504440] mt-0.5">
                      {order.customer.name} ({order.customer.role === 'student' ? 'Estudiante' : 'Docente'})
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#efeeea] text-[#504440] text-[10px] font-medium">
                    {order.estimatedPickupTime || 'Hace 2 min'}
                  </span>
                </div>

                {/* Items */}
                <div className="bg-[#f5f3ef] rounded-xl p-2.5 flex flex-col gap-1.5 text-xs">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#1b1c1a]">
                          {item.quantity}× {item.productName}
                        </span>
                        <span className="text-[10px] text-[#8d4e24]">
                          {item.getCustomizationSummary()}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#504440] shrink-0 font-mono">
                        ${item.subtotal.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => advanceOrderStatus(order.id, 'PREPARING')}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#2c1810] text-white text-xs font-bold hover:bg-[#8d4e24] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Iniciar Preparación</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </article>
            ))}
          </div>
        </div>

        {/* Col 2: En Preparación */}
        <div className="flex flex-col rounded-2xl bg-[#f5f3ef] p-3 gap-3 border border-[#eae8e4]">
          <div className="flex items-center justify-between p-2.5 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#8d4e24]" />
              <h2 className="text-xs font-bold text-[#1b1c1a]">2. En Preparación</h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#2c1810] text-white text-[11px] font-bold">
              {preparingOrders.length} activos
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {preparingOrders.map(order => (
              <article
                key={order.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-[#eae8e4] flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                {/* Active Timer Pill */}
                <div className="flex items-center justify-between bg-[#FFF3E0] px-3 py-1.5 rounded-xl border border-[#FFE0B2]">
                  <div className="flex items-center gap-1.5 text-[#783d14]">
                    <span className="material-symbols-outlined text-[16px] animate-pulse">hourglass_top</span>
                    <span className="text-[11px] font-semibold">Tiempo transcurrido:</span>
                  </div>
                  <span className="text-xs font-bold text-[#783d14] font-mono">03:40</span>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-bold text-[#090100] font-mono">{order.orderNumber}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#efeeea] text-[#504440] text-[10px] font-semibold">
                        {order.mode === 'express' ? 'Barra 1 + Horno' : order.tableNumber || 'Mesa'}
                      </span>
                    </div>
                    <span className="text-xs text-[#504440] mt-0.5">{order.customer.name}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#8d4e24] bg-[#ffdbc9]/40 px-2 py-0.5 rounded-md">
                    PIN #{order.pickupPin}
                  </span>
                </div>

                {/* Items */}
                <div className="bg-[#f5f3ef] rounded-xl p-2.5 flex flex-col gap-1.5 text-xs">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#1b1c1a]">
                          {item.quantity}× {item.productName}
                        </span>
                        <span className="text-[10px] text-[#8d4e24]">
                          {item.getCustomizationSummary()}
                        </span>
                      </div>
                      <span className="text-[10px] bg-white px-1.5 py-0.5 rounded text-[#504440] font-mono">
                        En elaboración
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => advanceOrderStatus(order.id, 'READY_FOR_PICKUP')}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#8d4e24] text-white text-xs font-bold hover:bg-[#70370e] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Marcar Listo para Recoger ✓</span>
                </button>
              </article>
            ))}
          </div>
        </div>

        {/* Col 3: Listo para Recoger */}
        <div className="flex flex-col rounded-2xl bg-[#f5f3ef] p-3 gap-3 border border-[#eae8e4]">
          <div className="flex items-center justify-between p-2.5 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#2E7D32]" />
              <h2 className="text-xs font-bold text-[#1b1c1a]">3. Listo para Recoger</h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-[11px] font-bold">
              {readyOrders.length} listos
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {readyOrders.map(order => (
              <article
                key={order.id}
                className="bg-[#F4FBF4] rounded-2xl p-4 shadow-sm border border-[#C8E6C9] flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-bold text-[#1b1c1a] font-mono">{order.orderNumber}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#C8E6C9] text-[#1B5E20] text-xs font-black font-mono">
                        PIN #{order.pickupPin}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#8d4e24] mt-0.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">inventory_2</span>
                      {order.pickupShelf || 'Estante Mostrador B2'}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#504440] font-medium bg-white px-2 py-0.5 rounded-full">
                    {order.customer.name}
                  </span>
                </div>

                <div className="bg-white rounded-xl p-2.5 flex flex-col gap-1 text-xs">
                  {order.items.map(item => (
                    <span key={item.id} className="font-semibold text-[#1b1c1a]">
                      {item.quantity}× {item.productName}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => deliverOrderWithPin(order.id)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#2E7D32] text-white text-xs font-bold hover:bg-[#1B5E20] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">handshake</span>
                  <span>Entregar / Validar PIN #{order.pickupPin}</span>
                </button>
              </article>
            ))}
          </div>
        </div>

        {/* Col 4: Entregado */}
        <div className="flex flex-col rounded-2xl bg-[#f5f3ef] p-3 gap-3 border border-[#eae8e4] opacity-95">
          <div className="flex items-center justify-between p-2.5 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#504440]">task_alt</span>
              <h2 className="text-xs font-bold text-[#1b1c1a]">4. Entregado</h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#eae8e4] text-[#504440] text-[10px] font-semibold">
              Últimos 30m
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {deliveredOrders.map(order => (
              <article
                key={order.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-[#eae8e4] flex flex-col gap-2.5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-[#504440] line-through font-mono">
                        {order.orderNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-semibold">
                        Entregado
                      </span>
                    </div>
                    <span className="text-[11px] text-[#827470]">
                      {order.customer.name} · PIN #{order.pickupPin}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-[#2c1810] font-mono">${order.total.toFixed(2)}</span>
                </div>

                <div className="bg-[#f5f3ef] rounded-xl p-2 text-xs text-[#504440]">
                  {order.items.map(i => `${i.quantity}x ${i.productName}`).join(' + ')}
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#827470]">
                  <span>Tiempo total: <strong>3m 48s</strong></span>
                  <span className="text-[#8d4e24] font-semibold cursor-pointer hover:underline">Ticket fiscal ✓</span>
                </div>
              </article>
            ))}

            {/* Performance Widget */}
            <div className="bg-[#eae8e4] rounded-2xl p-3.5 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#1b1c1a]">
                <span>Rendimiento Última Hora</span>
                <span className="text-[#2E7D32] font-bold">↑ 98% a tiempo</span>
              </div>
              <div className="w-full bg-[#d3c3be] rounded-full h-2 overflow-hidden">
                <div className="bg-[#2E7D32] h-full rounded-full" style={{ width: '92%' }} />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#504440]">
                <span>28 pedidos despachados</span>
                <span>Promedio: 3m 48s</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Shortcuts Footer */}
      <footer className="flex flex-wrap items-center justify-between p-3.5 bg-white rounded-2xl border border-[#eae8e4] text-xs text-[#504440]">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-[#1b1c1a]">Atajos de Teclado Rápido:</span>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-[#f5f3ef] text-[#1b1c1a] rounded text-[10px] font-mono border">Espacio</kbd>
            <span>Siguiente tarjeta</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-[#f5f3ef] text-[#1b1c1a] rounded text-[10px] font-mono border">Enter</kbd>
            <span>Avanzar de columna</span>
          </div>
        </div>
        <div className="text-[11px] text-[#827470]">
          Café Campus v2.4 · Terminal Cocina 01 (Campus Central)
        </div>
      </footer>
    </div>
  );
};
