// Task 1: ¿Qué es Testing End-to-End? (8 minutos)
// Comprensión de por qué y cuándo usar testing E2E vs otros tipos de testing.

// 🌐 Testing End-to-End (E2E)
// Testing que simula experiencia completa del usuario:

// ¿Por qué E2E testing?

// Verificación de flujos críticos: Compra, registro, login.
// Integración completa: Frontend + Backend + Base de datos.
// Experiencia real del usuario: Navegador real, red real.
// Detección de bugs de integración: Problemas entre capas.
// ¿Cuándo usar E2E?

// ✅ Flujos críticos de negocio: Compra, registro, checkout.
// ✅ Integraciones complejas: Múltiples servicios/APIs.
// ✅ Cambios en UX: Modificaciones que afectan usuario final.
// ✅ Despliegues: Validación antes de release a producción.
// ¿Cuándo NO usar E2E?

// ❌ Lógica unitaria: Mejor con unit tests.
// ❌ Validaciones simples: Mejor con integration tests.
// ❌ Performance: Mejor con tests especializados.
// ❌ Cada commit: Muy lento para CI frecuente.
// Concepto clave: E2E testing valida la aplicación completa desde perspectiva del usuario.

// 🆚 E2E vs Otros Tipos de Testing
// Comparación detallada:

// Aspecto	Unit Test	Integration	E2E
// Alcance	Función individual	Módulos juntos	App completa
// Velocidad	Muy rápido (<1s)	Rápido (1-10s)	Lento (10-60s)
// Fiabilidad	Alta	Media	Baja (flaky)
// Costo mantenimiento	Bajo	Medio	Alto
// Detección bugs	Lógica	Interfaces	UX/Integración
// Cantidad	Muchos (70-80%)	Moderados (20%)	Pocos (5-10%)
// **Estrategia óptima:**

    // Unit tests: Cobertura alta de lógica
    test('calculaTotal maneja descuentos correctamente', () => {
      expect(calcularTotal(100, 0.1)).toBe(90);
    });

    // Integration tests: APIs y DB
    test('POST /orders crea orden completa', async () => {
      const order = await createOrder({ productId: 1, userId: 123 });
      expect(order.status).toBe('pending');
    });

    // E2E tests: Flujos críticos de usuario
    it('usuario puede comprar producto completo', () => {
      cy.visit('/products/1');
      cy.get('[data-cy=add-to-cart]').click();
      cy.get('[data-cy=checkout]').click();
      // ... flujo completo de compra
      cy.url().should('include', '/order-confirmation');
    });
// Concepto clave: Cada tipo de test tiene propósito específico en pirámide de testing.