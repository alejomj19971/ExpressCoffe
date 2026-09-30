/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './presentation/context/AppContext.tsx';
import { CustomerCatalogView } from './presentation/views/CustomerCatalogView.tsx';
import { CartView } from './presentation/views/CartView.tsx';
import { CustomerOrdersView } from './presentation/views/CustomerOrdersView.tsx';
import { CustomerProfileView } from './presentation/views/CustomerProfileView.tsx';
import { BaristaKanbanView } from './presentation/views/BaristaKanbanView.tsx';
import { BaristaDashboardView } from './presentation/views/BaristaDashboardView.tsx';
import { BaristaInvoicingView } from './presentation/views/BaristaInvoicingView.tsx';
import { BaristaProfileView } from './presentation/views/BaristaProfileView.tsx';
import { ProductDetailModal } from './presentation/components/ProductDetailModal.tsx';

const MainLayout: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    studentTab,
    setStudentTab,
    baristaTab,
    setBaristaTab,
    cart,
    orders,
    toastMessage,
  } = useApp();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1b1c1a] flex flex-col font-sans selection:bg-[#ffdbc9] selection:text-[#70370e]">
      {/* Universal Top Switcher / Contract Bar */}
      <header className="sticky top-0 z-40 bg-[#fbf9f5]/95 backdrop-blur-xl border-b border-[#eae8e4] px-4 py-2.5 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#2c1810] flex items-center justify-center text-[#ffdbc9] shadow-sm">
            <span className="material-symbols-outlined text-[18px]">local_cafe</span>
          </div>
          <span className="text-base font-extrabold tracking-tight text-[#090100]">
            Café Campus
          </span>
        </div>

        {/* Zone 2: Role Switcher */}
        <div className="flex items-center gap-2">
          {/* Segmented Role Switcher */}
          <div className="p-1 bg-[#efeeea] rounded-xl flex items-center gap-1 shadow-inner">
            <button
              type="button"
              onClick={() => setCurrentRole('student')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentRole === 'student'
                  ? 'bg-[#2c1810] text-white shadow-sm'
                  : 'text-[#504440] hover:text-[#1b1c1a]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">school</span>
              <span className="hidden sm:inline">Modo Estudiante</span>
              <span className="sm:hidden">Estudiante</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentRole('barista')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentRole === 'barista'
                  ? 'bg-[#2c1810] text-white shadow-sm'
                  : 'text-[#504440] hover:text-[#1b1c1a]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">badge</span>
              <span className="hidden sm:inline">Personal de Barra / POS</span>
              <span className="sm:hidden">Barista</span>
            </button>
          </div>
        </div>

        {/* Zone 3: Campus Status */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
            Barra Abierta
          </span>
        </div>
      </header>

      {/* Mode 1: Student Experience (Mobile First Viewport) */}
      {currentRole === 'student' && (
        <div className="flex-1 flex flex-col w-full relative">
          <main className="flex-1 w-full pt-2">
            {studentTab === 'explorar' && <CustomerCatalogView />}
            {studentTab === 'carrito' && <CartView />}
            {studentTab === 'pedidos' && <CustomerOrdersView />}
            {studentTab === 'perfil' && <CustomerProfileView />}
          </main>

          {/* Student Fixed Bottom Navigation Bar */}
          <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#eae8e4] pb-safe shadow-[0_-4px_20px_rgba(44,24,16,0.06)]">
            <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
              <button
                type="button"
                onClick={() => setStudentTab('explorar')}
                className={`flex flex-col items-center justify-center w-16 h-12 transition-colors ${
                  studentTab === 'explorar'
                    ? 'text-[#8d4e24] font-bold'
                    : 'text-[#504440] hover:text-[#1b1c1a]'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">storefront</span>
                <span className="text-[10px] mt-0.5">Explorar</span>
              </button>

              <button
                type="button"
                onClick={() => setStudentTab('carrito')}
                className={`relative flex flex-col items-center justify-center w-16 h-12 transition-colors ${
                  studentTab === 'carrito'
                    ? 'text-[#8d4e24] font-bold'
                    : 'text-[#504440] hover:text-[#1b1c1a]'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                  {totalCartCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-[#e85303] text-white text-[9px] min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center font-bold">
                      {totalCartCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-0.5">Carrito</span>
              </button>

              <button
                type="button"
                onClick={() => setStudentTab('pedidos')}
                className={`flex flex-col items-center justify-center w-16 h-12 transition-colors ${
                  studentTab === 'pedidos'
                    ? 'text-[#8d4e24] font-bold'
                    : 'text-[#504440] hover:text-[#1b1c1a]'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">receipt_long</span>
                <span className="text-[10px] mt-0.5">Pedidos</span>
              </button>

              <button
                type="button"
                onClick={() => setStudentTab('perfil')}
                className={`flex flex-col items-center justify-center w-16 h-12 transition-colors ${
                  studentTab === 'perfil'
                    ? 'text-[#8d4e24] font-bold'
                    : 'text-[#504440] hover:text-[#1b1c1a]'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">account_circle</span>
                <span className="text-[10px] mt-0.5">Perfil</span>
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Mode 2: Barista / Kitchen Management Dashboard */}
      {currentRole === 'barista' && (
        <div className="flex-1 flex flex-col md:flex-row w-full">
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-[#f5f3ef] border-r border-[#eae8e4] p-4 flex flex-col justify-between shrink-0 shadow-sm">
            <div className="flex flex-col gap-4">
              {/* Turn Status */}
              <div className="flex items-center justify-between p-3 bg-[#efeeea] rounded-2xl">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] animate-pulse" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1b1c1a]">Abierto</span>
                    <span className="text-[11px] text-[#504440]">Turno Mañana</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#eae8e4] text-[#504440]">
                  Activo
                </span>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-1 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setBaristaTab('dashboard')}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all ${
                    baristaTab === 'dashboard'
                      ? 'bg-[#2c1810] text-white shadow-sm'
                      : 'text-[#504440] hover:bg-[#eae8e4] hover:text-[#1b1c1a]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[19px]">space_dashboard</span>
                    <span>Dashboard</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setBaristaTab('kanban')}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all ${
                    baristaTab === 'kanban'
                      ? 'bg-[#2c1810] text-white shadow-sm'
                      : 'text-[#504440] hover:bg-[#eae8e4] hover:text-[#1b1c1a]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[19px]">view_kanban</span>
                    <span>Tablero de Pedidos</span>
                  </div>
                  {pendingOrdersCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#feab79] text-[#783d14] text-[10px] font-bold">
                      {pendingOrdersCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setBaristaTab('catalogo')}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all ${
                    baristaTab === 'catalogo'
                      ? 'bg-[#2c1810] text-white shadow-sm'
                      : 'text-[#504440] hover:bg-[#eae8e4] hover:text-[#1b1c1a]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[19px]">restaurant_menu</span>
                    <span>Catálogo & Menú</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setBaristaTab('facturas')}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all ${
                    baristaTab === 'facturas'
                      ? 'bg-[#2c1810] text-white shadow-sm'
                      : 'text-[#504440] hover:bg-[#eae8e4] hover:text-[#1b1c1a]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[19px]">receipt_long</span>
                    <span>Facturas & Ventas</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setBaristaTab('perfil')}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all ${
                    baristaTab === 'perfil'
                      ? 'bg-[#2c1810] text-white shadow-sm'
                      : 'text-[#504440] hover:bg-[#eae8e4] hover:text-[#1b1c1a]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[19px]">settings</span>
                    <span>Ajustes & Terminal</span>
                  </div>
                </button>
              </nav>
            </div>

            {/* Sidebar Footer User info */}
            <div className="flex flex-col gap-2 pt-4 border-t border-[#eae8e4]">
              <div className="flex items-center justify-between p-2.5 bg-[#efeeea] rounded-2xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#2c1810] text-[#ffdbc9] flex items-center justify-center font-bold text-xs">
                    CB
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1b1c1a]">Carlos Barista</span>
                    <span className="text-[10px] text-[#504440]">Admin Cocina</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCurrentRole('student')}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-[#8d4e24] hover:bg-[#eae8e4] transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
                <span>Modo Estudiante</span>
              </button>
            </div>
          </aside>

          {/* Main Workspace */}
          <main className="flex-1 w-full bg-[#fbf9f5] overflow-y-auto">
            {baristaTab === 'dashboard' && <BaristaDashboardView />}
            {baristaTab === 'kanban' && <BaristaKanbanView />}
            {baristaTab === 'catalogo' && (
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Catálogo de Productos (Modo Barista)</h2>
                <CustomerCatalogView />
              </div>
            )}
            {baristaTab === 'facturas' && <BaristaInvoicingView />}
            {baristaTab === 'perfil' && <BaristaProfileView />}
          </main>
        </div>
      )}

      {/* Product Detail Customization Modal */}
      <ProductDetailModal />

      {/* Micro-interaction Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#2c1810] text-white shadow-2xl text-xs font-medium border border-[#8d4e24]/40 animate-slide-up">
          <span className="material-symbols-outlined text-[18px] text-[#feab79]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
