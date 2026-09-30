/**
 * Presentation View: BaristaInvoicingView
 * Accounting, fiscal invoices & electronic receipts (Image 11.png)
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';

export const BaristaInvoicingView: React.FC = () => {
  const { showToast } = useApp();
  const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState('#FAC-2026-0890');

  const invoices = [
    {
      id: 'fac-1',
      number: '#FAC-2026-0891',
      ticketLabel: 'Ticket Térmico #142',
      time: '09:30 AM',
      relativeTime: 'Hace 12 min',
      client: 'Mateo Ramírez',
      department: 'Fac. Arquitectura (Carnet #7481)',
      concept: '1x Latte Avena + 1x Cookie Choco',
      paymentMethod: 'Credencial',
      status: 'Pagado',
      total: 9.15,
    },
    {
      id: 'fac-2',
      number: '#FAC-2026-0890',
      ticketLabel: 'Factura Fiscal Depto.',
      time: '09:18 AM',
      relativeTime: 'Hace 24 min',
      client: 'Depto. Matemáticas',
      department: 'Prof. Diego Lara (RUT 76.882.110-3)',
      concept: '4x Espresso Doble + 4x Focaccias',
      paymentMethod: 'Débito',
      status: 'Pagado',
      total: 36.80,
    },
    {
      id: 'fac-3',
      number: '#FAC-2026-0889',
      ticketLabel: 'Ticket Térmico #140',
      time: '09:02 AM',
      relativeTime: 'Hace 40 min',
      client: 'Martina Rivas',
      department: 'Fac. Medicina (Estudiante)',
      concept: '1x Flat White Doble + 1x Croissant',
      paymentMethod: 'Credencial',
      status: 'Pagado',
      total: 7.80,
    },
    {
      id: 'fac-4',
      number: '#FAC-2026-0888',
      ticketLabel: 'Boleta Simplificada',
      time: '08:47 AM',
      relativeTime: 'Hace 55 min',
      client: 'Lucas Benítez',
      department: 'Personal Campus · Mantenimiento',
      concept: '2x Iced Caramel Macchiato 20oz',
      paymentMethod: 'Bizum / QR',
      status: 'Pagado',
      total: 9.50,
    },
    {
      id: 'fac-5',
      number: '#FAC-2026-0887',
      ticketLabel: 'Factura Exenta Institucional',
      time: '08:27 AM',
      relativeTime: 'Hace 1h 15m',
      client: 'Vicerrectorado Académico',
      department: 'RUT 76.123.456-K · Orden #884',
      concept: 'Catering Reunión Consejo (12 items)',
      paymentMethod: 'Crédito Campus',
      status: 'Pagado',
      total: 124.00,
    },
  ];

  return (
    <div className="flex flex-col w-full p-4 lg:p-6 gap-6 max-w-[1720px] mx-auto">
      {/* Header */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8d4e24]">
            <span>Módulo Contable & Tributario</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d3c3be]" />
            <span className="text-[#504440] font-normal">SII / DGI Enlace Activo</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#090100] tracking-tight">
            Facturas & Ventas
          </h1>
          <p className="text-xs text-[#504440]">
            Registro fiscal de comandas, comprobantes emitidos y facturación electrónica del campus.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => showToast('Exportando archivo CSV con 142 comprobantes del día...')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#f5f3ef] text-[#1b1c1a] rounded-2xl text-xs font-bold border border-[#eae8e4] shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-[#8d4e24]">download</span>
            <span>Exportar (CSV/Excel)</span>
          </button>
          <button
            type="button"
            onClick={() => showToast('Generando formulario de factura manual con RUT')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#2c1810] hover:bg-[#090100] text-white rounded-2xl text-xs font-bold shadow-md active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Nueva Factura / Manual</span>
          </button>
        </div>
      </section>

      {/* KPI Financial Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-[#eae8e4] flex flex-col justify-between">
          <span className="text-xs uppercase font-bold tracking-wider text-[#504440]">Total Facturado (Hoy)</span>
          <span className="text-3xl font-extrabold text-[#090100] font-mono tracking-tight my-1">$1,284.50</span>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[#2E7D32] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +14.2%
            </span>
            <span className="text-[#504440]">142 comprobantes</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm border border-[#eae8e4] flex flex-col justify-between">
          <span className="text-xs uppercase font-bold tracking-wider text-[#504440]">Ticket Promedio</span>
          <span className="text-3xl font-extrabold text-[#090100] font-mono tracking-tight my-1">$9.05</span>
          <span className="text-xs text-[#504440] flex items-center gap-1 pt-1">
            <span className="material-symbols-outlined text-[15px] text-[#2E7D32]">check_circle</span>
            Combo café + comida en ratio óptimo
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm border border-[#eae8e4] flex flex-col justify-between">
          <span className="text-xs uppercase font-bold tracking-wider text-[#504440]">Facturas Electrónicas DGI</span>
          <span className="text-3xl font-extrabold text-[#090100] font-mono tracking-tight my-1">
            18 <span className="text-sm font-normal text-[#504440]">emitidas</span>
          </span>
          <div className="flex justify-between text-xs pt-1">
            <span className="text-[#504440]">Con RUT institucional</span>
            <span className="text-[#8d4e24] font-bold">100% Timbrado</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm border border-[#eae8e4] flex flex-col justify-between">
          <span className="text-xs uppercase font-bold tracking-wider text-[#504440]">Venta Credencial Campus</span>
          <span className="text-3xl font-extrabold text-[#090100] font-mono tracking-tight my-1">$873.46</span>
          <div className="flex justify-between text-xs pt-1">
            <span className="text-[#2E7D32] font-bold">68% del flujo total</span>
            <span className="text-[#504440]">0% Comisiones</span>
          </div>
        </div>
      </section>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Table of Invoices (8 cols) */}
        <section className="xl:col-span-8 bg-white rounded-3xl shadow-sm border border-[#eae8e4] overflow-hidden flex flex-col">
          <div className="p-4 flex items-center justify-between border-b border-[#eae8e4]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8d4e24] text-[22px]">receipt_long</span>
              <h2 className="text-base font-bold text-[#090100]">Comprobantes Recientes</h2>
            </div>
            <span className="text-xs text-[#504440]">Actualizado en vivo hace 1m</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#f5f3ef] text-[#504440] uppercase tracking-wider font-semibold border-b border-[#eae8e4]">
                  <th className="py-3 px-4">Nº Comprobante</th>
                  <th className="py-3 px-3">Hora</th>
                  <th className="py-3 px-3">Cliente / Facultad</th>
                  <th className="py-3 px-3">Concepto Principal</th>
                  <th className="py-3 px-3">Medio de Pago</th>
                  <th className="py-3 px-3 text-right">Total</th>
                  <th className="py-3 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e4]">
                {invoices.map(inv => {
                  const isSelected = selectedInvoiceNumber === inv.number;
                  return (
                    <tr
                      key={inv.id}
                      onClick={() => setSelectedInvoiceNumber(inv.number)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#ffdbc9]/25 border-l-4 border-l-[#2c1810]'
                          : 'hover:bg-[#f5f3ef]/60'
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-bold text-[#090100]">
                        {inv.number}
                        <span className="block text-[10px] text-[#8d4e24] font-normal">{inv.ticketLabel}</span>
                      </td>
                      <td className="py-3 px-3 text-[#504440]">
                        {inv.time}
                        <span className="block text-[10px] text-[#827470]">{inv.relativeTime}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-[#1b1c1a] block">{inv.client}</span>
                        <span className="text-[10px] text-[#504440]">{inv.department}</span>
                      </td>
                      <td className="py-3 px-3 text-[#504440] max-w-[160px] truncate">{inv.concept}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-[#f5f3ef] text-[#504440] text-[10px] font-semibold">
                          {inv.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-[#090100] font-mono">
                        ${inv.total.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              showToast(`Imprimiendo ticket ${inv.number} en impresora térmica`);
                            }}
                            className="p-1 rounded-lg hover:bg-[#eae8e4] text-[#504440] hover:text-[#1b1c1a]"
                          >
                            <span className="material-symbols-outlined text-[18px]">print</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Selected Invoice Preview Card (4 cols) */}
        <section className="xl:col-span-4 bg-white rounded-3xl p-6 shadow-md border border-[#eae8e4] flex flex-col gap-4">
          <div className="flex items-start justify-between border-b border-[#eae8e4] pb-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#2c1810] flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[14px]">local_cafe</span>
                </div>
                <span className="font-bold text-sm text-[#090100]">Café Campus</span>
              </div>
              <span className="text-[11px] text-[#504440] mt-1">Campus Central · Aulario B</span>
              <span className="text-[10px] text-[#827470]">NIF Fiscal: B-89441029</span>
            </div>
            <div className="text-right">
              <span className="px-2 py-0.5 rounded-full bg-[#feab79] text-[#783d14] text-[10px] font-bold">
                Factura A
              </span>
              <span className="block text-sm font-bold text-[#090100] font-mono mt-1">
                #FAC-2026-0890
              </span>
              <span className="text-[10px] text-[#827470]">14 May 2026 · 09:18 AM</span>
            </div>
          </div>

          {/* Receptor */}
          <div className="p-3 bg-[#f5f3ef] rounded-2xl flex flex-col gap-1 text-xs">
            <span className="text-[10px] uppercase font-bold text-[#8d4e24]">Datos del Receptor</span>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-[#1b1c1a]">Facultad de Ciencias Exactas</p>
                <p className="text-[11px] text-[#504440]">Depto. Matemáticas Puras y Aplicadas</p>
                <p className="text-[11px] text-[#1b1c1a]">RUT: <strong>76.882.110-3</strong></p>
              </div>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded text-[#8d4e24] font-semibold border">
                Docente
              </span>
            </div>
            <span className="text-[10px] text-[#504440] mt-1">
              Solicitante: Prof. Diego Lara (Autorizado)
            </span>
          </div>

          {/* Consumo */}
          <div className="flex flex-col gap-2 text-xs">
            <span className="text-[10px] uppercase font-bold text-[#504440]">Detalle del Consumo</span>
            <div className="flex justify-between items-center py-1 border-b border-[#eae8e4]">
              <div>
                <span className="font-semibold text-[#1b1c1a] block">4x Espresso Doble Cortado</span>
                <span className="text-[10px] text-[#504440]">Granos Huila · Leche Barista</span>
              </div>
              <span className="font-mono font-bold text-[#1b1c1a]">$16.00</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <div>
                <span className="font-semibold text-[#1b1c1a] block">4x Focaccia Romero & Queso</span>
                <span className="text-[10px] text-[#504440]">Masa madre recién horneada</span>
              </div>
              <span className="font-mono font-bold text-[#1b1c1a]">$24.00</span>
            </div>
          </div>

          {/* Totales */}
          <div className="p-3.5 bg-[#f5f3ef] rounded-2xl flex flex-col gap-1.5 text-xs">
            <div className="flex justify-between text-[#504440]">
              <span>Subtotal Neto:</span>
              <span className="font-mono font-semibold text-[#1b1c1a]">$40.00</span>
            </div>
            <div className="flex justify-between text-[#2E7D32]">
              <span>Descuento Convenio Docente (-10%):</span>
              <span className="font-mono font-bold">-$4.00</span>
            </div>
            <div className="flex justify-between text-[#504440]">
              <span>IVA (0% Exento Fondo Universitario Edu):</span>
              <span className="font-mono">$0.00</span>
            </div>
            <div className="h-px bg-[#eae8e4] my-0.5" />
            <div className="flex justify-between items-baseline pt-1">
              <span className="text-sm font-bold text-[#1b1c1a]">Total Pagado:</span>
              <span className="text-2xl font-extrabold text-[#2c1810] font-mono">$36.80</span>
            </div>
          </div>

          {/* DGI Electronic Seal */}
          <div className="p-3 bg-[#f5f3ef] rounded-2xl flex items-center justify-between gap-3 text-xs border border-[#eae8e4]">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold text-[#2E7D32] flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                Timbre Electrónico DGI
              </span>
              <span className="text-[9px] text-[#827470]">Auth: 9811-A093-EE41</span>
              <span className="text-[9px] text-[#827470]">Firma Digital Verificada 09:18:41 UTC</span>
            </div>
            <svg className="w-12 h-12 text-[#2c1810] shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2,2H10V10H2V2M4,4V8H8V4H4M14,2H22V10H14V2M16,4V8H20V4H16M2,14H10V22H2V14M4,16V20H8V16H4M14,14H17V17H14V14M17,17H20V20H17V17M20,14H22V17H20V14M14,20H17V22H14V20M20,20H22V22H20V20M17,14H20V17H17V14Z" />
            </svg>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => showToast('Imprimiendo ticket fiscal en Epson TM-T88VI...')}
              className="py-2.5 px-3 rounded-xl bg-[#2c1810] text-white text-xs font-bold hover:bg-[#090100] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[17px]">print</span>
              <span>Imprimir Ticket</span>
            </button>
            <button
              type="button"
              onClick={() => showToast('Descargando comprobante fiscal PDF...')}
              className="py-2.5 px-3 rounded-xl bg-[#f5f3ef] hover:bg-[#eae8e4] text-[#1b1c1a] text-xs font-bold border border-[#eae8e4] active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[17px] text-[#8d4e24]">picture_as_pdf</span>
              <span>Descargar PDF</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
