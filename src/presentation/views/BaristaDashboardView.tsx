/**
 * Presentation View: BaristaDashboardView
 * Operational analytics & peak-hour management (Image 9.png)
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';

export const BaristaDashboardView: React.FC = () => {
  const { orders, advanceOrderStatus, showToast } = useApp();

  const [peakModeActive, setPeakModeActive] = useState(false);
  const [onlineOrdersPaused, setOnlineOrdersPaused] = useState(false);
  const [timeframe, setTimeframe] = useState<'today' | 'week' | 'month'>('today');

  const waitingOrders = orders.filter(o => o.status === 'PENDING');

  return (
    <div className="flex flex-col w-full p-4 lg:p-6 gap-6 max-w-[1720px] mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#8d4e24]">
            <span className="w-2 h-2 rounded-full bg-[#8d4e24]" />
            <span>Aulario B · Campus Central</span>
            <span className="text-[#d3c3be]">/</span>
            <span>Miércoles, 24 Octubre 2026</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#090100] tracking-tight mt-1">
            Panel de Control <span className="text-sm font-normal text-[#504440]">· Operaciones Hoy</span>
          </h1>
        </div>

        <div className="flex items-center flex-wrap gap-3">
          <div className="flex items-center p-1 bg-[#efeeea] rounded-xl">
            {(['today', 'week', 'month'] as const).map(tf => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  timeframe === tf
                    ? 'bg-[#2c1810] text-white shadow-sm'
                    : 'text-[#504440] hover:text-[#1b1c1a]'
                }`}
              >
                {tf === 'today' ? 'Hoy' : tf === 'week' ? 'Esta semana' : 'Este mes'}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => showToast('Generando reporte CSV de ventas del turno...')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#f5f3ef] text-[#1b1c1a] text-xs font-semibold border border-[#eae8e4] shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[17px] text-[#8d4e24]">file_download</span>
            <span>Descargar Reporte</span>
          </button>

          <button
            type="button"
            onClick={() => showToast('Abriendo ventana de comanda rápida en mostrador')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2c1810] text-white text-xs font-bold hover:bg-[#090100] shadow-md active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[17px]">add_circle</span>
            <span>+ Nuevo Pedido Mostrador</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="flex flex-col justify-between p-5 bg-white rounded-3xl shadow-sm border border-[#eae8e4]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#504440]">Ventas del Día</span>
            <div className="w-9 h-9 rounded-xl bg-[#ffdbc9]/40 flex items-center justify-center text-[#8d4e24]">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-[#090100] font-mono tracking-tight">$1,284.50</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +14.2%
            </span>
            <span className="text-xs text-[#504440]">vs. ayer ($1,124.00)</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="flex flex-col justify-between p-5 bg-white rounded-3xl shadow-sm border border-[#eae8e4]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#504440]">Pedidos Totales</span>
            <div className="w-9 h-9 rounded-xl bg-[#ffdbc9]/40 flex items-center justify-center text-[#8d4e24]">
              <span className="material-symbols-outlined text-[20px]">receipt</span>
            </div>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#090100] font-mono tracking-tight">142</span>
            <span className="text-xs text-[#504440]">tickets</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#e85303] font-bold">28 en curso</span>
            <span className="text-[#d3c3be]">·</span>
            <span className="text-[#504440]">114 listos</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="flex flex-col justify-between p-5 bg-white rounded-3xl shadow-sm border border-[#eae8e4]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#504440]">Tiempo de Preparación</span>
            <div className="w-9 h-9 rounded-xl bg-[#ffdbc9]/40 flex items-center justify-center text-[#8d4e24]">
              <span className="material-symbols-outlined text-[20px]">timer</span>
            </div>
          </div>
          <div className="my-2 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-[#090100] font-mono tracking-tight">5.2</span>
            <span className="text-sm font-semibold text-[#504440]">min</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#504440]">
            <span className="bg-[#E8F5E9] text-[#2E7D32] px-2 py-0.5 rounded-full font-bold text-[10px]">
              Meta &lt;6m
            </span>
            <span>Ritmo óptimo barra</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="flex flex-col justify-between p-5 bg-white rounded-3xl shadow-sm border border-[#eae8e4]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#504440]">Alertas de Stock</span>
            <div className="w-9 h-9 rounded-xl bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
          </div>
          <div className="my-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-[#ba1a1a] font-mono tracking-tight">3</span>
            <span className="text-xs font-bold text-[#ba1a1a]">insumos críticos</span>
          </div>
          <span className="text-xs text-[#504440] truncate">Avena Barista, Vasos 20oz, Croissant</span>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Peak Chart & Queue */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Peak Hours Chart */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#eae8e4] flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#8d4e24]">Afluencia en Campus</span>
                <h2 className="text-lg font-bold text-[#090100]">Volumen de Pedidos por Hora Pico</h2>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#504440]">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#2c1810]" /> Horas Clave
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#ffdbc9]" /> Volumen Base
                </span>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="w-full pt-3">
              <svg className="w-full h-44 overflow-visible" preserveAspectRatio="none" viewBox="0 0 680 160">
                <defs>
                  <linearGradient id="dashboardPeakGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#8d4e24" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#8d4e24" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line stroke="#efeeea" strokeDasharray="4" strokeWidth="1.5" x1="0" x2="680" y1="30" y2="30" />
                <line stroke="#efeeea" strokeDasharray="4" strokeWidth="1.5" x1="0" x2="680" y1="80" y2="80" />
                <line stroke="#efeeea" strokeWidth="1.5" x1="0" x2="680" y1="130" y2="130" />
                <path
                  d="M 0,130 Q 50,120 70,85 T 140,95 T 220,20 T 300,105 T 380,85 T 460,35 T 540,110 T 620,125 L 680,130 L 0,130 Z"
                  fill="url(#dashboardPeakGrad)"
                />
                <path
                  d="M 0,130 Q 50,120 70,85 T 140,95 T 220,20 T 300,105 T 380,85 T 460,35 T 540,110 T 620,125 L 680,130"
                  fill="none"
                  stroke="#2c1810"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
                <circle cx="70" cy="85" fill="#ffffff" r="5" stroke="#8d4e24" strokeWidth="2.5" />
                <circle cx="220" cy="20" fill="#e85303" r="6.5" stroke="#ffffff" strokeWidth="2" />
                <circle cx="460" cy="35" fill="#2c1810" r="5" stroke="#ffffff" strokeWidth="2" />
              </svg>

              <div className="grid grid-cols-6 text-center mt-3 text-xs text-[#504440]">
                <div>
                  <span className="font-bold text-[#1b1c1a]">08:00 AM</span>
                  <span className="block text-[10px] text-[#8d4e24]">Break Rápido</span>
                </div>
                <div>
                  <span className="font-bold text-[#1b1c1a]">09:00 AM</span>
                  <span className="block text-[10px]">Docencia</span>
                </div>
                <div>
                  <span className="font-bold text-[#e85303]">10:00 AM</span>
                  <span className="inline-block px-1.5 py-0.2 rounded-full bg-[#feab79] text-[9px] font-bold text-[#783d14]">
                    Pico Máx
                  </span>
                </div>
                <div>
                  <span className="font-bold text-[#1b1c1a]">11:30 AM</span>
                  <span className="block text-[10px]">Estudio</span>
                </div>
                <div>
                  <span className="font-bold text-[#1b1c1a]">01:00 PM</span>
                  <span className="block text-[10px] text-[#8d4e24]">Almuerzos</span>
                </div>
                <div>
                  <span className="font-bold text-[#1b1c1a]">03:00 PM</span>
                  <span className="block text-[10px]">Tarde Chill</span>
                </div>
              </div>
            </div>
          </div>

          {/* Queue Table */}
          <div className="bg-white rounded-3xl shadow-sm border border-[#eae8e4] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 bg-[#f5f3ef] border-b border-[#eae8e4]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e85303] animate-ping" />
                <h2 className="text-sm font-bold text-[#090100]">Pedidos en Espera de Atención</h2>
                <span className="px-2 py-0.5 rounded-full bg-[#feab79] text-[#783d14] text-xs font-bold">
                  {waitingOrders.length} pendientes
                </span>
              </div>
              <span className="text-xs text-[#504440]">Sincronización en vivo</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#f5f3ef] text-[#504440] uppercase tracking-wider font-semibold border-b border-[#eae8e4]">
                    <th className="py-3 px-4">Ticket</th>
                    <th className="py-3 px-4">Estudiante / Docente</th>
                    <th className="py-3 px-4">Detalle Pedido</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Modalidad</th>
                    <th className="py-3 px-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eae8e4]">
                  {waitingOrders.map(order => (
                    <tr key={order.id} className="hover:bg-[#f5f3ef]/50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#090100]">
                        {order.orderNumber}
                        <span className="block text-[10px] font-normal text-[#827470]">Hace 3 min</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-[#1b1c1a] block">{order.customer.name}</span>
                        <span className="text-[10px] text-[#504440]">{order.customer.facultyOrDept || 'Campus'}</span>
                      </td>
                      <td className="py-3.5 px-4 min-w-[180px]">
                        <span className="font-medium text-[#1b1c1a]">
                          {order.items.map(i => `${i.quantity}x ${i.productName}`).join(', ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#090100] font-mono">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-[#efeeea] text-[#504440] text-[10px] font-semibold">
                          {order.mode === 'express' ? 'Barra Express' : order.tableNumber || 'Mesa'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => advanceOrderStatus(order.id, 'PREPARING')}
                          className="px-3 py-1.5 rounded-xl bg-[#2c1810] text-white text-xs font-semibold hover:bg-[#8d4e24] active:scale-95 transition-all shadow-sm"
                        >
                          A Preparación
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Quick Toggles & Inventory */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Quick Toggles */}
          <div className="p-5 bg-white rounded-3xl shadow-sm border border-[#eae8e4] flex flex-col gap-3">
            <span className="text-xs uppercase font-bold tracking-wider text-[#504440]">
              Control Operativo Express
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setPeakModeActive(!peakModeActive);
                  showToast(peakModeActive ? 'Modo Alta Demanda desactivado' : 'Modo Alta Demanda (+5 min buffer) activado');
                }}
                className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all text-center gap-1 active:scale-95 ${
                  peakModeActive
                    ? 'bg-[#feab79] text-[#783d14] border-[#feab79] font-bold shadow-sm'
                    : 'bg-[#f5f3ef] text-[#504440] border-[#eae8e4] hover:bg-[#eae8e4]'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">local_fire_department</span>
                <span className="text-xs font-bold">Modo Pico</span>
                <span className="text-[10px] opacity-80">{peakModeActive ? 'Alerta ON (+5m)' : 'Inactivo'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOnlineOrdersPaused(!onlineOrdersPaused);
                  showToast(onlineOrdersPaused ? 'Tienda Online reactivada' : 'Tienda Online pausada: Solo Mostrador');
                }}
                className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all text-center gap-1 active:scale-95 ${
                  onlineOrdersPaused
                    ? 'bg-[#ffdad6] text-[#ba1a1a] border-[#ffdad6] font-bold shadow-sm'
                    : 'bg-[#f5f3ef] text-[#504440] border-[#eae8e4] hover:bg-[#eae8e4]'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">pause_circle</span>
                <span className="text-xs font-bold">Pausar Online</span>
                <span className="text-[10px] opacity-80">{onlineOrdersPaused ? 'Solo Mostrador' : 'Recibiendo'}</span>
              </button>
            </div>
          </div>

          {/* Critical Inventory */}
          <div className="p-5 bg-white rounded-3xl shadow-sm border border-[#eae8e4] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]">inventory_2</span>
                <h3 className="text-sm font-bold text-[#090100]">Insumos en Estado Crítico</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a]">
                Reponer Hoy
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#1b1c1a]">Leche de Avena Barista</span>
                  <span className="text-[#ba1a1a]">12% (3 Litros)</span>
                </div>
                <div className="w-full h-2 bg-[#f5f3ef] rounded-full overflow-hidden">
                  <div className="bg-[#ba1a1a] h-full rounded-full" style={{ width: '12%' }} />
                </div>
                <span className="text-[10px] text-[#504440]">Consumo aprox: 10L en próxima hora pico</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#1b1c1a]">Vasos Compostables 20oz</span>
                  <span className="text-[#ba1a1a]">8% (18 unidades)</span>
                </div>
                <div className="w-full h-2 bg-[#f5f3ef] rounded-full overflow-hidden">
                  <div className="bg-[#ba1a1a] h-full rounded-full" style={{ width: '8%' }} />
                </div>
                <span className="text-[10px] text-[#504440]">Alerta bodega: Paquete en tránsito</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#1b1c1a]">Croissants de Mantequilla</span>
                  <span className="text-[#783d14]">4 unidades</span>
                </div>
                <div className="w-full h-2 bg-[#f5f3ef] rounded-full overflow-hidden">
                  <div className="bg-[#feab79] h-full rounded-full" style={{ width: '22%' }} />
                </div>
                <span className="text-[10px] text-[#504440]">Hornear lote 3 programado 11:00 AM</span>
              </div>
            </div>
          </div>

          {/* Payment Methods Donut */}
          <div className="p-5 bg-white rounded-3xl shadow-sm border border-[#eae8e4] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#090100]">Métodos de Pago</h3>
              <span className="text-xs text-[#504440]">Hoy</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#efeeea" strokeWidth="4.5" />
                  <circle
                    cx="18"
                    cy="18"
                    fill="transparent"
                    r="15.915"
                    stroke="#2c1810"
                    strokeDasharray="68 32"
                    strokeDashoffset="0"
                    strokeWidth="4.5"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    fill="transparent"
                    r="15.915"
                    stroke="#8d4e24"
                    strokeDasharray="22 78"
                    strokeDashoffset="-68"
                    strokeWidth="4.5"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    fill="transparent"
                    r="15.915"
                    stroke="#feab79"
                    strokeDasharray="10 90"
                    strokeDashoffset="-90"
                    strokeWidth="4.5"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-[#090100] font-mono leading-none">68%</span>
                  <span className="text-[8px] uppercase tracking-tighter text-[#504440]">Campus</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 flex-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 font-medium text-[#1b1c1a]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2c1810]" /> Credencial
                  </span>
                  <span className="font-bold text-[#090100] font-mono">68%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 font-medium text-[#1b1c1a]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8d4e24]" /> Tarjetas
                  </span>
                  <span className="font-bold text-[#090100] font-mono">22%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 font-medium text-[#1b1c1a]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#feab79]" /> Bizum/QR
                  </span>
                  <span className="font-bold text-[#090100] font-mono">10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
