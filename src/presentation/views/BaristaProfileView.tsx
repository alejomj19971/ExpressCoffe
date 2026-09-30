/**
 * Presentation View: BaristaProfileView
 * Barista profile & POS hardware/shift settings (Image 1.png)
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';

export const BaristaProfileView: React.FC = () => {
  const { showToast, setCurrentRole } = useApp();

  const [shopOnline, setShopOnline] = useState(true);
  const [peakBuffer, setPeakBuffer] = useState(true);
  const [pinVisible, setPinVisible] = useState(false);
  const [pinValue, setPinValue] = useState('8402');
  const [baristaName, setBaristaName] = useState('Carlos Esteban Morales Rivera');
  const [baristaEmail, setBaristaEmail] = useState('carlos.morales@cafecampus.edu');
  const [baristaPhone, setBaristaPhone] = useState('+34 691 42 08 19');

  const handleSave = () => {
    showToast('Ajustes del turno y parámetros POS guardados correctamente.');
  };

  return (
    <div className="flex flex-col w-full p-4 lg:p-6 gap-6 max-w-[1720px] mx-auto">
      {/* Top Action Bar */}
      <section className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-3xl shadow-sm border border-[#eae8e4]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#f5f3ef] text-[#504440]">
              Estación 02 · Barra Central
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#feab79]/50 text-[#783d14] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#8d4e24] animate-ping" />
              Turno Mañana · Activo
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#090100] tracking-tight">
            Perfil del Vendedor & Ajustes de Operación
          </h1>
          <p className="text-xs text-[#504440]">
            Control centralizado del barista, hardware POS, tiempos de entrega y credenciales de turno.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => showToast('Cambios descartados.')}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#504440] hover:bg-[#f5f3ef] transition-colors"
          >
            Descartar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2c1810] text-white text-xs font-bold hover:bg-[#090100] shadow-md active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[17px]">save</span>
            <span>Guardar Cambios</span>
          </button>
        </div>
      </section>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Barista profile & station tuning */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Barista Master Profile */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#eae8e4] flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-[#efeeea] flex items-center justify-center text-[#2c1810] shadow-inner">
                    <span className="material-symbols-outlined text-[42px]">coffee_maker</span>
                  </div>
                  <span className="absolute -bottom-1 -right-1 p-1 bg-[#feab79] text-[#783d14] rounded-lg shadow-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-[15px]">verified</span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-[#090100]">Carlos Barista</span>
                  <span className="text-xs font-bold text-[#8d4e24]">Jefe de Barra y Cocina</span>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-[#504440]">
                    <span className="font-mono bg-[#f5f3ef] px-2 py-0.5 rounded text-[#1b1c1a] font-bold">
                      #EMP-8042
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-[#8d4e24]">location_on</span>
                      Campus Central · Aulario B
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#504440]">
                  Nombre Completo
                </label>
                <div className="flex items-center px-3 py-2.5 rounded-xl bg-[#f5f3ef] border border-[#eae8e4] text-xs">
                  <span className="material-symbols-outlined text-[#827470] text-[18px] mr-2">badge</span>
                  <input
                    type="text"
                    value={baristaName}
                    onChange={(e) => setBaristaName(e.target.value)}
                    className="bg-transparent text-[#1b1c1a] outline-none w-full font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#504440]">
                  Correo Interno
                </label>
                <div className="flex items-center px-3 py-2.5 rounded-xl bg-[#f5f3ef] border border-[#eae8e4] text-xs">
                  <span className="material-symbols-outlined text-[#827470] text-[18px] mr-2">alternate_email</span>
                  <input
                    type="email"
                    value={baristaEmail}
                    onChange={(e) => setBaristaEmail(e.target.value)}
                    className="bg-transparent text-[#1b1c1a] outline-none w-full font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#504440]">
                  Teléfono Emergencias
                </label>
                <div className="flex items-center px-3 py-2.5 rounded-xl bg-[#f5f3ef] border border-[#eae8e4] text-xs">
                  <span className="material-symbols-outlined text-[#827470] text-[18px] mr-2">call</span>
                  <input
                    type="tel"
                    value={baristaPhone}
                    onChange={(e) => setBaristaPhone(e.target.value)}
                    className="bg-transparent text-[#1b1c1a] outline-none w-full font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#504440]">
                  PIN Rápido POS
                </label>
                <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#f5f3ef] border border-[#eae8e4] text-xs">
                  <div className="flex items-center flex-1 mr-2">
                    <span className="material-symbols-outlined text-[#827470] text-[18px] mr-2">pin</span>
                    <input
                      type={pinVisible ? 'text' : 'password'}
                      value={pinValue}
                      onChange={(e) => setPinValue(e.target.value)}
                      className="bg-transparent text-[#1b1c1a] outline-none font-mono tracking-widest w-24 font-bold"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setPinVisible(!pinVisible)}
                    className="text-[#827470] hover:text-[#1b1c1a] p-1"
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      {pinVisible ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Shift Tuning */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#eae8e4] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8d4e24] text-[22px]">tune</span>
                <h2 className="text-base font-bold text-[#090100]">Configuración de Estación & Despacho</h2>
              </div>
              <span className="text-xs text-[#504440]">Sincronización en vivo</span>
            </div>

            <div className="flex flex-col gap-3">
              {/* Store status */}
              <div className="flex items-center justify-between p-4 bg-[#f5f3ef] rounded-2xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#efeeea] flex items-center justify-center text-[#2c1810] mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">storefront</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1b1c1a]">Estado de Tienda Online</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#feab79] text-[#783d14]">
                        {shopOnline ? 'Recibiendo Pedidos' : 'Pausada'}
                      </span>
                    </div>
                    <span className="text-xs text-[#504440] mt-0.5">
                      Cierre programado del turno matutino fijado para las 14:00 hrs.
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={shopOnline}
                  onClick={() => {
                    setShopOnline(!shopOnline);
                    showToast(shopOnline ? 'Tienda online pausada' : 'Tienda online abierta');
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ${
                    shopOnline ? 'bg-[#2c1810]' : 'bg-[#d3c3be]'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ${
                      shopOnline ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Peak buffer */}
              <div className="flex items-center justify-between p-4 bg-[#f5f3ef] rounded-2xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#efeeea] flex items-center justify-center text-[#8d4e24] mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">bolt</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1b1c1a]">Modo Alta Demanda (Pico de Clases)</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#504440] border">
                        +5 min buffer
                      </span>
                    </div>
                    <span className="text-xs text-[#504440] mt-0.5">
                      Añade 5 minutos automáticos al tiempo estimado de retiro para alumnos y profesores.
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={peakBuffer}
                  onClick={() => {
                    setPeakBuffer(!peakBuffer);
                    showToast(peakBuffer ? 'Buffer de demanda desactivado' : 'Buffer de +5m activado');
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ${
                    peakBuffer ? 'bg-[#8d4e24]' : 'bg-[#d3c3be]'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ${
                      peakBuffer ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Hardware */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-[#f5f3ef] rounded-2xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <span className="material-symbols-outlined text-[#8d4e24] text-[18px]">print</span>
                    <span className="text-[#1b1c1a] font-medium truncate">Epson TM-T88VI</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded">
                    En Línea
                  </span>
                </div>

                <div className="p-3 bg-[#f5f3ef] rounded-2xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#8d4e24] text-[18px]">volume_up</span>
                    <span className="text-[#1b1c1a] font-medium">Campanilla Espresso</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('Sonido de prueba emitido en barra')}
                    className="p-1 text-[#504440] hover:text-[#1b1c1a]"
                    title="Probar sonido"
                  >
                    <span className="material-symbols-outlined text-[18px]">play_circle</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Metrics & Security */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Performance Card */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#eae8e4] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8d4e24] text-[22px]">speed</span>
                <h2 className="text-base font-bold text-[#090100]">Rendimiento de Carlos</h2>
              </div>
              <span className="text-xs font-semibold text-[#8d4e24]">Hoy · 07:00 - 14:00</span>
            </div>

            {/* Quick KPIs */}
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col p-3 bg-[#f5f3ef] rounded-2xl">
                <span className="text-[10px] uppercase font-bold text-[#504440]">Comandas</span>
                <span className="text-2xl font-extrabold text-[#090100] font-mono mt-1">142</span>
                <span className="text-[10px] text-[#2E7D32] font-bold mt-0.5">+18%</span>
              </div>
              <div className="flex flex-col p-3 bg-[#f5f3ef] rounded-2xl">
                <span className="text-[10px] uppercase font-bold text-[#504440]">Tiempo Prom.</span>
                <span className="text-2xl font-extrabold text-[#090100] font-mono mt-1">5.2m</span>
                <span className="text-[10px] text-[#2E7D32] font-bold mt-0.5">&lt;6m</span>
              </div>
              <div className="flex flex-col p-3 bg-[#f5f3ef] rounded-2xl">
                <span className="text-[10px] uppercase font-bold text-[#504440]">Calificación</span>
                <span className="text-2xl font-extrabold text-[#090100] font-mono mt-1">4.9</span>
                <span className="text-[10px] text-[#8d4e24] font-bold mt-0.5">★★★★★</span>
              </div>
            </div>

            {/* Hourly Drink Flow */}
            <div className="p-4 bg-[#f5f3ef] rounded-2xl flex flex-col gap-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#1b1c1a]">Flujo de Bebidas por Hora</span>
                <span className="text-[#8d4e24]">Pico 08:30 (Clase Magna)</span>
              </div>
              <div className="w-full h-20 pt-1">
                <svg className="w-full h-full text-[#8d4e24]" fill="none" viewBox="0 0 300 80">
                  <path
                    d="M 0 65 Q 25 60 50 45 T 100 20 T 150 15 T 200 38 T 250 25 T 300 30 L 300 80 L 0 80 Z"
                    fill="currentColor"
                    fillOpacity="0.15"
                  />
                  <path
                    d="M 0 65 Q 25 60 50 45 T 100 20 T 150 15 T 200 38 T 250 25 T 300 30"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="150" cy="15" r="4" className="fill-[#2c1810]" />
                  <circle cx="250" cy="25" r="3" className="fill-[#8d4e24]" />
                </svg>
              </div>
            </div>
          </div>

          {/* Permisos & Sesiones */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#eae8e4] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8d4e24] text-[22px]">admin_panel_settings</span>
                <h2 className="text-base font-bold text-[#090100]">Permisos & Sesiones</h2>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f5f3ef] text-[#504440]">
                Nivel Admin
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {[
                'Modificación de Catálogo y Precios',
                'Anulación y Devolución de Tickets',
                'Apertura y Cierre de Caja Fiscal',
              ].map(perm => (
                <div key={perm} className="flex items-center justify-between p-2.5 bg-[#f5f3ef] rounded-xl text-xs">
                  <span className="text-[#1b1c1a] font-medium">{perm}</span>
                  <span className="material-symbols-outlined text-[#2E7D32] text-[18px]">check_circle</span>
                </div>
              ))}
            </div>

            {/* Connected devices */}
            <div className="flex flex-col gap-2 pt-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#504440]">
                Dispositivos Vinculados
              </span>
              <div className="flex items-center justify-between p-3 bg-[#f5f3ef] rounded-2xl text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#2c1810] text-[20px]">tablet_mac</span>
                  <div>
                    <span className="font-bold text-[#1b1c1a] block">iPad Pro 12.9&rdquo; · Terminal 01 (Barra)</span>
                    <span className="text-[10px] text-[#2E7D32]">Esta sesión · Activa ahora</span>
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32]" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => showToast('Turno cerrado. Generando arqueo de caja Z en impresora...')}
                className="flex-1 py-3 rounded-2xl bg-[#efeeea] text-[#1b1c1a] text-xs font-bold hover:bg-[#eae8e4] transition-colors"
              >
                Cerrar Turno
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentRole('student');
                  showToast('Sesión de Carlos Barista cerrada.');
                }}
                className="flex-1 py-3 rounded-2xl bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold hover:opacity-90 transition-opacity"
              >
                Salir de Terminal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
