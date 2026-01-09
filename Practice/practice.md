Practical exercise to apply the concepts learned.
Objetivo: Crear una suite completa de E2E tests para una aplicación de E-commerce (Tienda Virtual).

1. Configurar Cypress
Instalar y configurar Cypress.
Crear estructura de carpetas (cypress/integration, cypress/support).
Configurar scripts npm y cypress.json.
2. Page Objects Pattern
LoginPage: Crear clase con métodos para llenar email, password y click en submit.
ProductPage: Métodos para buscar productos y añadir al carrito.
CheckoutPage: Métodos para llenar datos de envío y finalizar compra.
Centralizar selectores (ej: botones de compra, inputs de formulario).
3. Tests de Flujos Críticos
Registro de Usuario: Validar registro exitoso con datos nuevos y manejo de errores (email duplicado).
Login/Logout: Verificar acceso correcto y redirección al cerrar sesión.
Flujo de Compra (Happy Path): Login -> Buscar Producto -> Añadir al Carrito -> Checkout -> Confirmación de Orden.
4. Custom Commands
Comando de Login: Implementar cy.login(email, password) para usar en beforeEach (evitar repetir pasos de UI en cada test).
Utilidades de API: Comando cy.createUserAPI() para crear usuarios de prueba rápidamente sin usar el formulario de registro.
Helpers: Generación de emails únicos para tests de registro.
5. Integración CI/CD
Configurar archivo YAML para GitHub Actions.
Configurar grabación de video y screenshots al fallar.
Generación de reportes de prueba.
📝 Ejercicio
Implementa E2E tests para un flujo de e-commerce que cubra: registro de usuario nuevo, inicio de sesión (login), y el flujo completo de compra de un producto hasta la confirmación.

Requerimientos:
**Instalar Cypress**
npm install --save-dev cypress

**Plugins útiles**
npm install --save-dev cypress-file-upload @cypress/code-coverage

**Configurar scripts (package.json)**
{
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "test:e2e": "cypress run --spec 'cypress/integration/**/*.spec.js'"
  }
}

**Configuración (cypress.json)**
{
  "baseUrl": "http://localhost:3000",
  "viewportWidth": 1280,
  "viewportHeight": 720,
  "video": true,
  "screenshotOnRunFailure": true,
  "retries": 2
}