/**
 * Presentation View: CustomerProfileView
 * Student profile, campus wallet & loyalty status (Image 5.png)
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { IMAGES } from '../../infrastructure/mocks/mockData.ts';

export const CustomerProfileView: React.FC = () => {
  const { customerBalance, rechargeBalance, setCurrentRole, showToast } = useApp();

  const [autoRecharge, setAutoRecharge] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showRechargeModal, setShowRechargeModal] = useState(false);

  return (
    <div className="flex flex-col w-full pb-28 max-w-lg mx-auto px-4 gap-4">
      {/* Profile Header Card */}
      <section className="relative w-full bg-white rounded-3xl p-4 shadow-sm border border-[#eae8e4] overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={IMAGES.mateoProfile}
              alt="Mateo Ramírez Silva"
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-2xl object-cover shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 bg-[#feab79] text-[#783d14] p-1 rounded-full shadow-sm flex items-center justify-center">
              <span className="material-symbols-outlined text-[13px]">verified</span>
            </span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <h2 className="text-lg font-bold text-[#1b1c1a] truncate">Mateo Ramírez Silva</h2>
            <div className="inline-flex items-center gap-1.5 mt-0.5">
              <span className="inline-block px-2.5 py-0.5 bg-[#f5f3ef] text-[#504440] rounded-full text-xs font-semibold truncate">
                Estudiante · Fac. Arquitectura
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-[#504440] text-xs">
              <span className="material-symbols-outlined text-[15px] text-[#8d4e24]">badge</span>
              <span className="font-mono font-medium">Carnet #7481-ARQ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Credencial & Billetera Universitaria */}
      <section className="w-full bg-[#2c1810] text-[#ffdbc9] rounded-3xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#feab79] text-[20px]">wallet</span>
            <span className="text-xs uppercase tracking-wider text-[#feab79] font-bold">Billetera Campus</span>
          </div>
          <span className="bg-white/15 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
            Sincronizada
          </span>
        </div>

        <div className="flex items-baseline justify-between mb-4">
          <div>
            <p className="text-xs text-[#9e7e73]">Saldo disponible</p>
            <p className="text-3xl font-extrabold text-white font-mono tracking-tight">
              ${customerBalance.toFixed(2)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowRechargeModal(true)}
            className="bg-[#feab79] text-[#783d14] px-4 py-2.5 rounded-2xl text-xs font-bold hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-[17px]">add_circle</span>
            <span>Recargar</span>
          </button>
        </div>

        <div className="bg-black/25 rounded-2xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[16px]">autorenew</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Recarga mensual automática</p>
              <p className="text-[11px] text-[#9e7e73]">$30 cada día 1 del mes</p>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={autoRecharge}
            onClick={() => {
              setAutoRecharge(!autoRecharge);
              showToast(autoRecharge ? 'Recarga automática pausada' : 'Recarga automática activada');
            }}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ${
              autoRecharge ? 'bg-[#feab79]' : 'bg-white/20'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ${
                autoRecharge ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </section>

      {/* Nivel y Beneficios Campus */}
      <section className="w-full bg-white rounded-3xl p-4 shadow-sm border border-[#eae8e4] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ffdbc9] flex items-center justify-center text-[#70370e]">
              <span className="material-symbols-outlined text-[18px]">military_tech</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8d4e24]">Nivel de Lealtad</span>
              <h3 className="text-sm font-bold text-[#1b1c1a]">Espresso Oro</h3>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-[#ffdbc9] text-[#70370e] rounded-full text-[10px] font-bold">
            Top Comensal
          </span>
        </div>

        {/* Progress */}
        <div className="bg-[#f5f3ef] rounded-2xl p-3">
          <div className="flex justify-between items-center mb-1.5 text-xs">
            <span className="font-semibold text-[#1b1c1a]">Próximo café de cortesía</span>
            <span className="text-[#8d4e24] font-bold">8 / 10 pedidos</span>
          </div>
          <div className="w-full bg-[#eae8e4] h-2 rounded-full overflow-hidden">
            <div className="bg-[#8d4e24] h-full rounded-full transition-all duration-500" style={{ width: '80%' }} />
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[#504440] text-xs">
            <span className="material-symbols-outlined text-[15px] text-[#8d4e24]">local_cafe</span>
            <span>¡Solo 2 lattes más para tu bebida gratis!</span>
          </div>
        </div>

        {/* Monthly coupon */}
        <div className="bg-[#ffdbc9]/40 border border-[#feab79]/40 rounded-2xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#feab79] text-[#783d14] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">local_offer</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#1b1c1a] truncate">-20% Descuento del Mes</p>
              <p className="text-[11px] text-[#504440] truncate">Aplicable mostrando credencial institucional</p>
            </div>
          </div>
          <span className="bg-[#8d4e24] text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shrink-0">
            Activo
          </span>
        </div>
      </section>

      {/* Preferencias Habituales */}
      <section className="w-full bg-white rounded-3xl p-4 shadow-sm border border-[#eae8e4] flex flex-col gap-3">
        <h4 className="text-xs uppercase font-bold tracking-wider text-[#8d4e24]">Preferencias de Barista Habitual</h4>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between p-2.5 bg-[#f5f3ef] rounded-xl text-xs">
            <span className="text-[#504440]">Tipo de leche</span>
            <span className="font-semibold text-[#1b1c1a] bg-white px-2 py-1 rounded-lg">Avena (Oat Milk)</span>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-[#f5f3ef] rounded-xl text-xs">
            <span className="text-[#504440]">Nivel de dulzor</span>
            <span className="font-semibold text-[#1b1c1a] bg-white px-2 py-1 rounded-lg">50% Azúcar morena</span>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-[#ffdbc9]/30 rounded-xl text-xs">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#8d4e24] text-[16px]">eco</span>
              <span className="font-semibold text-[#1b1c1a]">Vaso térmico propio</span>
            </div>
            <span className="text-[10px] bg-[#8d4e24] text-white px-2 py-0.5 rounded-full font-bold">
              Siempre activo (-$0.20)
            </span>
          </div>
        </div>
      </section>

      {/* Notificaciones y Sede */}
      <section className="w-full bg-white rounded-3xl p-4 shadow-sm border border-[#eae8e4] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#8d4e24] text-[18px]">notifications_active</span>
            <div>
              <p className="text-xs font-bold text-[#1b1c1a]">Avisos &ldquo;Listo para Recoger&rdquo;</p>
              <p className="text-[11px] text-[#504440]">Push y alerta al sonar timbre de barra</p>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={notificationsEnabled}
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ${
              notificationsEnabled ? 'bg-[#8d4e24]' : 'bg-[#d3c3be]'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ${
                notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </section>

      {/* Switch to Staff Mode Button */}
      <section className="flex flex-col gap-2 pt-2">
        <button
          type="button"
          onClick={() => {
            setCurrentRole('barista');
            showToast('Cambiando a modo Personal de Barra...');
          }}
          className="w-full py-3.5 px-4 bg-[#efeeea] text-[#1b1c1a] hover:bg-[#eae8e4] rounded-2xl text-xs font-bold active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-[#d3c3be]"
        >
          <span className="material-symbols-outlined text-[18px] text-[#8d4e24]">swap_horiz</span>
          <span>Cambiar a Modo Personal / Vendedor POS</span>
        </button>
      </section>

      {/* Quick Recharge Modal */}
      {showRechargeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#1b1c1a]">Recargar Billetera Campus</h3>
              <button
                type="button"
                onClick={() => setShowRechargeModal(false)}
                className="text-[#827470] hover:text-[#1b1c1a]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="text-xs text-[#504440]">
              Selecciona el monto para abonar a tu Credencial #7481-ARQ:
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[10, 20, 30].map(amount => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => {
                    rechargeBalance(amount);
                    setShowRechargeModal(false);
                  }}
                  className="py-3 rounded-2xl bg-[#f5f3ef] hover:bg-[#ffdbc9] text-sm font-bold text-[#2c1810] transition-colors"
                >
                  +${amount}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
