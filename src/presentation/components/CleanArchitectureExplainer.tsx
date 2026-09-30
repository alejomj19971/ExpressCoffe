/**
 * Presentation Component: CleanArchitectureExplainer
 * Interactive inspection tool for Clean Architecture layers, SOLID principles,
 * and live Domain & Use Case Test Runner.
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Product } from '../../domain/entities/Product.ts';
import { Order } from '../../domain/entities/Order.ts';
import { OrderItem } from '../../domain/value-objects/OrderItem.ts';
import { container } from '../../infrastructure/di/container.ts';

interface TestCaseResult {
  name: string;
  category: 'Entity' | 'Use Case' | 'Business Rule';
  status: 'passed' | 'failed' | 'idle';
  durationMs: number;
  details: string;
}

export const CleanArchitectureExplainer: React.FC = () => {
  const { showArchitectureModal, setShowArchitectureModal } = useApp();
  const [activeTab, setActiveTab] = useState<'architecture' | 'solid' | 'tests' | 'code'>('architecture');
  const [testResults, setTestResults] = useState<TestCaseResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  if (!showArchitectureModal) return null;

  const runLiveTests = async () => {
    setIsRunningTests(true);
    setTestResults([]);

    const results: TestCaseResult[] = [];

    // Test 1: Product Entity
    const start1 = performance.now();
    try {
      const p = new Product({
        id: 'test-p1',
        sku: 'TEST-01',
        name: 'Latte Test',
        description: 'Test desc',
        basePrice: 3.60,
        category: 'bebidas',
        imageUrl: '',
        preparationTimeMinutes: 5,
        rating: 4.9,
        isAvailable: true,
      });

      const customizedPrice = p.calculateUnitPrice({
        size: '16oz', // +0.60
        milk: 'avena', // +0.40
        selectedExtras: ['extra-shot'], // +0.75
      });

      if (customizedPrice === 5.35) {
        results.push({
          name: 'Product.calculateUnitPrice() con leche avena, tamaño 16oz y extra shot',
          category: 'Entity',
          status: 'passed',
          durationMs: Number((performance.now() - start1).toFixed(2)),
          details: 'Base $3.60 + 16oz ($0.60) + Avena ($0.40) + Extra ($0.75) = $5.35 exacto',
        });
      } else {
        throw new Error(`Expected 5.35, got ${customizedPrice}`);
      }
    } catch (err: unknown) {
      results.push({
        name: 'Product.calculateUnitPrice()',
        category: 'Entity',
        status: 'failed',
        durationMs: Number((performance.now() - start1).toFixed(2)),
        details: err instanceof Error ? err.message : String(err),
      });
    }

    // Test 2: Order State Machine Invariant
    const start2 = performance.now();
    try {
      const o = new Order({
        id: 'test-ord-1',
        orderNumber: '#TEST-01',
        customer: { id: 'c1', name: 'Test Student', role: 'student' },
        items: [
          new OrderItem({
            id: 'it-1',
            productId: 'p1',
            productName: 'Latte',
            productImageUrl: '',
            unitPrice: 3.60,
            quantity: 1,
          }),
        ],
        status: 'PENDING',
        pickupPin: '88',
        locationName: 'Campus',
        paymentMethod: 'campus_card',
      });

      // Verify canTransitionTo
      const canSkipToDelivered = o.canTransitionTo('DELIVERED');
      if (canSkipToDelivered === false) {
        // Transition to PREPARING should succeed
        o.transitionTo('PREPARING', 'Carlos Barista');
        results.push({
          name: 'Order.transitionTo() protege la máquina de estados (no permite saltar de PENDING a DELIVERED)',
          category: 'Business Rule',
          status: 'passed',
          durationMs: Number((performance.now() - start2).toFixed(2)),
          details: 'PENDING -> PREPARING permitido; PENDING -> DELIVERED bloqueado por invariante de dominio',
        });
      } else {
        throw new Error('Order allowed invalid transition from PENDING directly to DELIVERED');
      }
    } catch (err: unknown) {
      results.push({
        name: 'Order.transitionTo() state invariant',
        category: 'Business Rule',
        status: 'failed',
        durationMs: Number((performance.now() - start2).toFixed(2)),
        details: err instanceof Error ? err.message : String(err),
      });
    }

    // Test 3: Order Subtotal & Discounts
    const start3 = performance.now();
    try {
      const o = new Order({
        id: 'test-ord-2',
        orderNumber: '#TEST-02',
        customer: { id: 'c1', name: 'Test Student', role: 'student' },
        items: [
          new OrderItem({
            id: 'it-1',
            productId: 'p1',
            productName: 'Latte',
            productImageUrl: '',
            unitPrice: 4.75,
            quantity: 1,
          }),
          new OrderItem({
            id: 'it-2',
            productId: 'p2',
            productName: 'Focaccia',
            productImageUrl: '',
            unitPrice: 4.80,
            quantity: 1,
          }),
          new OrderItem({
            id: 'it-3',
            productId: 'p3',
            productName: 'Cookie',
            productImageUrl: '',
            unitPrice: 1.80,
            quantity: 1,
          }),
        ],
        hasReusableCup: true, // -$0.20
        couponCode: 'ESTUDIANTE2024',
        couponDiscountAmount: 2.00, // -$2.00
        pickupPin: '89',
        locationName: 'Campus',
        paymentMethod: 'campus_card',
      });

      // Subtotal = 4.75 + 4.80 + 1.80 = 11.35
      // Total = 11.35 - 2.00 - 0.20 = 9.15
      if (o.subtotal === 11.35 && o.total === 9.15 && o.ecoDiscount === 0.20) {
        results.push({
          name: 'Order calcula Subtotal, Descuento Eco Termo (-$0.20) y Cupón Universitario (-$2.00)',
          category: 'Business Rule',
          status: 'passed',
          durationMs: Number((performance.now() - start3).toFixed(2)),
          details: 'Subtotal: $11.35 | Eco: -$0.20 | Cupón: -$2.00 | Total a pagar: $9.15',
        });
      } else {
        throw new Error(`Expected subtotal 11.35 and total 9.15, got ${o.subtotal} and ${o.total}`);
      }
    } catch (err: unknown) {
      results.push({
        name: 'Order discounts and total calculation',
        category: 'Business Rule',
        status: 'failed',
        durationMs: Number((performance.now() - start3).toFixed(2)),
        details: err instanceof Error ? err.message : String(err),
      });
    }

    // Test 4: CreateOrderUseCase
    const start4 = performance.now();
    try {
      const createdOrder = await container.createOrderUseCase.execute({
        customer: { id: 'c-test', name: 'Tester', role: 'student' },
        items: [
          { productId: 'prod-latte-caramelo', quantity: 2 },
        ],
        hasReusableCup: true,
        couponCode: 'ESTUDIANTE2024',
        paymentMethod: 'campus_card',
      });

      if (createdOrder && createdOrder.id && createdOrder.items.length === 1 && createdOrder.items[0].quantity === 2) {
        results.push({
          name: 'CreateOrderUseCase orquesta validación, generación de PIN y persistencia en repositorio',
          category: 'Use Case',
          status: 'passed',
          durationMs: Number((performance.now() - start4).toFixed(2)),
          details: `Orden creada: ${createdOrder.orderNumber} con PIN #${createdOrder.pickupPin} e inyección de dependencias limpia`,
        });
      } else {
        throw new Error('CreateOrderUseCase returned an invalid order');
      }
    } catch (err: unknown) {
      results.push({
        name: 'CreateOrderUseCase execution',
        category: 'Use Case',
        status: 'failed',
        durationMs: Number((performance.now() - start4).toFixed(2)),
        details: err instanceof Error ? err.message : String(err),
      });
    }

    setTestResults(results);
    setIsRunningTests(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#fbf9f5] text-[#1b1c1a] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-[#d3c3be]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#2c1810] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8d4e24] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[22px]">account_tree</span>
            </div>
            <div>
              <h2 className="text-lg font-bold">Clean Architecture & SOLID Explorer</h2>
              <p className="text-xs text-[#ffdbc9]">Arquitectura limpia y diseño orientado al dominio</p>
            </div>
          </div>
          <button
            onClick={() => setShowArchitectureModal(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-[#eae8e4] bg-[#f5f3ef]">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'architecture'
                ? 'border-[#8d4e24] text-[#8d4e24] bg-[#fbf9f5]'
                : 'border-transparent text-[#504440] hover:text-[#1b1c1a]'
            }`}
          >
            1. Capas Clean Architecture
          </button>
          <button
            onClick={() => setActiveTab('solid')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'solid'
                ? 'border-[#8d4e24] text-[#8d4e24] bg-[#fbf9f5]'
                : 'border-transparent text-[#504440] hover:text-[#1b1c1a]'
            }`}
          >
            2. Principios SOLID Aplicados
          </button>
          <button
            onClick={() => setActiveTab('tests')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'tests'
                ? 'border-[#8d4e24] text-[#8d4e24] bg-[#fbf9f5]'
                : 'border-transparent text-[#504440] hover:text-[#1b1c1a]'
            }`}
          >
            3. Test Runner Interactivo
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'code'
                ? 'border-[#8d4e24] text-[#8d4e24] bg-[#fbf9f5]'
                : 'border-transparent text-[#504440] hover:text-[#1b1c1a]'
            }`}
          >
            4. Estructura de Archivos
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh] no-scrollbar">
          {activeTab === 'architecture' && (
            <div className="flex flex-col gap-6">
              <p className="text-sm text-[#504440] leading-relaxed">
                Esta aplicación implementa rigurosamente el diagrama de círculos concéntricos de <strong>Robert C. Martin (Uncle Bob)</strong>, aislando las reglas de negocio del framework y de la base de datos.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Domain */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>1. Capa de Dominio (Entities & Core)</span>
                  </div>
                  <p className="text-xs text-amber-800">
                    Cero dependencias externas. Contiene las entidades puras del negocio y los contratos (puertos).
                  </p>
                  <ul className="text-xs text-amber-900/90 list-disc pl-4 space-y-1 font-mono">
                    <li>Product.ts (Entidad con cálculo de precio de opciones)</li>
                    <li>Order.ts (Aggregate Root con máquina de estados y descuentos)</li>
                    <li>OrderItem.ts (Value Object inmutable)</li>
                    <li>IProductRepository.ts (Puerto de acceso a catálogo)</li>
                    <li>IOrderRepository.ts (Puerto de persistencia de comandas)</li>
                  </ul>
                </div>

                {/* Application */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                    <span className="material-symbols-outlined text-[18px]">bolt</span>
                    <span>2. Capa de Aplicación (Use Cases)</span>
                  </div>
                  <p className="text-xs text-blue-800">
                    Orquesta el flujo de datos hacia y desde las entidades.
                  </p>
                  <ul className="text-xs text-blue-900/90 list-disc pl-4 space-y-1 font-mono">
                    <li>GetProductsUseCase.ts (Búsqueda y filtrado)</li>
                    <li>CreateOrderUseCase.ts (Orquestación de pedido y PIN)</li>
                    <li>UpdateOrderStatusUseCase.ts (Avance en Kanban)</li>
                    <li>GetActiveOrdersUseCase.ts (Tablero en tiempo real)</li>
                  </ul>
                </div>

                {/* Infrastructure */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                    <span className="material-symbols-outlined text-[18px]">database</span>
                    <span>3. Capa de Infraestructura (Adapters)</span>
                  </div>
                  <p className="text-xs text-emerald-800">
                    Implementaciones concretas de los puertos y fixtures de prueba.
                  </p>
                  <ul className="text-xs text-emerald-900/90 list-disc pl-4 space-y-1 font-mono">
                    <li>MockProductRepository.ts (Implementa IProductRepository)</li>
                    <li>MockOrderRepository.ts (Implementa IOrderRepository)</li>
                    <li>mockData.ts (Datos de prueba ricos del campus)</li>
                    <li>container.ts (Contenedor de Inyección de Dependencias)</li>
                  </ul>
                </div>

                {/* Presentation */}
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                    <span className="material-symbols-outlined text-[18px]">devices</span>
                    <span>4. Capa de Presentación (UI & Controllers)</span>
                  </div>
                  <p className="text-xs text-purple-800">
                    Vistas desacopladas que interactúan exclusivamente vía Use Cases.
                  </p>
                  <ul className="text-xs text-purple-900/90 list-disc pl-4 space-y-1 font-mono">
                    <li>CustomerCatalogView.tsx (Móvil / Estudiante)</li>
                    <li>CartView.tsx (Cálculo de cupón y eco descuento)</li>
                    <li>BaristaKanbanView.tsx (Terminal de barra POS)</li>
                    <li>BaristaDashboardView.tsx (KPIs y horas pico)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'solid' && (
            <div className="flex flex-col gap-4">
              {[
                {
                  letter: 'S',
                  name: 'Single Responsibility Principle (SRP)',
                  desc: 'Cada clase y use case tiene una sola responsabilidad. Por ejemplo, Order.ts solo gestiona las reglas del pedido, mientras que UpdateOrderStatusUseCase.ts solo coordina la transición de estado y su persistencia.',
                  file: 'src/domain/entities/Order.ts & src/application/use-cases/CreateOrderUseCase.ts',
                },
                {
                  letter: 'O',
                  name: 'Open/Closed Principle (OCP)',
                  desc: 'Las entidades y repositorios están abiertos a la extensión y cerrados a la modificación. Nuevos extras o tipos de leche pueden añadirse sin alterar el algoritmo de cálculo de precios.',
                  file: 'src/domain/entities/Product.ts',
                },
                {
                  letter: 'L',
                  name: 'Liskov Substitution Principle (LSP)',
                  desc: 'MockProductRepository y MockOrderRepository pueden ser reemplazados de forma transparente por PostgresProductRepository o FirebaseOrderRepository sin modificar una sola línea de los Use Cases.',
                  file: 'src/infrastructure/repositories/MockOrderRepository.ts',
                },
                {
                  letter: 'I',
                  name: 'Interface Segregation Principle (ISP)',
                  desc: 'Las interfaces IProductRepository e IOrderRepository están segregadas y no fuerzan a los use cases a depender de métodos que no utilizan.',
                  file: 'src/domain/repositories/IProductRepository.ts',
                },
                {
                  letter: 'D',
                  name: 'Dependency Inversion Principle (DIP)',
                  desc: 'Los Use Cases dependen de abstracciones (interfaces IOrderRepository e IProductRepository), nunca de implementaciones concretas. El contenedor de dependencias (container.ts) resuelve las instancias en tiempo de ejecución.',
                  file: 'src/infrastructure/di/container.ts',
                },
              ].map(item => (
                <div key={item.letter} className="p-4 rounded-2xl bg-white border border-[#eae8e4] flex items-start gap-4 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#2c1810] text-[#ffdbc9] font-black text-xl flex items-center justify-center shrink-0">
                    {item.letter}
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <h3 className="font-bold text-sm text-[#1b1c1a]">{item.name}</h3>
                    <p className="text-xs text-[#504440] leading-relaxed">{item.desc}</p>
                    <span className="font-mono text-[11px] text-[#8d4e24] bg-[#f5f3ef] px-2 py-0.5 rounded w-fit mt-1">
                      {item.file}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tests' && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#efeeea]">
                <div>
                  <h3 className="font-bold text-sm text-[#1b1c1a]">Unit Tests en Vivo de Entidades y Use Cases</h3>
                  <p className="text-xs text-[#504440]">
                    Ejecuta aserciones de reglas de negocio directamente sobre las clases Product, Order y CreateOrderUseCase.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={runLiveTests}
                  disabled={isRunningTests}
                  className="px-4 py-2.5 rounded-xl bg-[#2c1810] text-white text-xs font-bold hover:bg-[#8d4e24] transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isRunningTests ? 'sync' : 'play_arrow'}
                  </span>
                  <span>{isRunningTests ? 'Ejecutando...' : 'Correr Pruebas'}</span>
                </button>
              </div>

              {testResults.length === 0 && !isRunningTests && (
                <div className="text-center py-10 text-xs text-[#504440]">
                  Haz clic en &ldquo;Correr Pruebas&rdquo; para validar las entidades y use cases en tiempo real.
                </div>
              )}

              {testResults.length > 0 && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-semibold px-1">
                    <span className="text-[#2E7D32]">
                      ✓ {testResults.filter(t => t.status === 'passed').length} de {testResults.length} pruebas pasadas con éxito
                    </span>
                    <span className="text-[#504440]">
                      Tiempo total: {testResults.reduce((sum, t) => sum + t.durationMs, 0).toFixed(2)}ms
                    </span>
                  </div>

                  {testResults.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white border border-[#eae8e4] flex items-start justify-between gap-3 shadow-sm"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-[#2E7D32] text-[20px] shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-xs text-[#1b1c1a]">{t.name}</span>
                          <span className="text-[11px] text-[#504440] font-mono">{t.details}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#f5f3ef] text-[#8d4e24]">
                          {t.category}
                        </span>
                        <span className="text-[11px] font-mono text-[#504440]">{t.durationMs}ms</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'code' && (
            <div className="flex flex-col gap-3">
              <span className="text-xs text-[#504440]">
                Estructura de directorios generada para este proyecto:
              </span>
              <pre className="p-4 rounded-2xl bg-[#2c1810] text-[#ffdbc9] font-mono text-xs overflow-x-auto leading-relaxed">
{`/src
  /domain                     <- Capa de Dominio (Sin dependencias externas)
    /entities
      Product.ts              <- Entidad Product con reglas y cálculo de precio
      Order.ts                <- Entidad Order (Aggregate Root) con estados y descuentos
    /value-objects
      OrderItem.ts            <- Value Object inmutable para items del pedido
    /repositories
      IProductRepository.ts   <- Puerto / Interfaz de repositorio de productos
      IOrderRepository.ts     <- Puerto / Interfaz de repositorio de pedidos

  /application                <- Capa de Aplicación (Casos de Uso)
    /use-cases
      GetProductsUseCase.ts
      GetProductByIdUseCase.ts
      CreateOrderUseCase.ts
      UpdateOrderStatusUseCase.ts
      GetActiveOrdersUseCase.ts

  /infrastructure             <- Capa de Infraestructura (Adapters & DI)
    /repositories
      MockProductRepository.ts <- Implementa IProductRepository
      MockOrderRepository.ts   <- Implementa IOrderRepository
    /mocks
      mockData.ts             <- Fixtures de productos y comandas con imágenes
    /di
      container.ts            <- Inyección de Dependencias (DIP)

  /presentation               <- Capa de Presentación (React Components & Views)
    /context
      AppContext.tsx          <- Enlaza Use Cases con la interfaz React
    /components
      ProductDetailModal.tsx
      CleanArchitectureExplainer.tsx
    /views
      CustomerCatalogView.tsx
      CartView.tsx
      CustomerOrdersView.tsx
      CustomerProfileView.tsx
      BaristaKanbanView.tsx
      BaristaDashboardView.tsx
      BaristaInvoicingView.tsx
      BaristaProfileView.tsx`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#f5f3ef] border-t border-[#eae8e4] flex items-center justify-between text-xs text-[#504440]">
          <span>Clean Architecture & Domain Driven Design</span>
          <button
            onClick={() => setShowArchitectureModal(false)}
            className="px-4 py-2 rounded-xl bg-[#2c1810] text-white font-semibold hover:bg-[#8d4e24] transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
