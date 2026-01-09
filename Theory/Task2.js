// Task 2: Introducción a Cypress (7 minutos)
// Configuración y conceptos básicos de Cypress para testing E2E.

// ⚙️ Configuración de Cypress
// **Instalación y setup:**

//     # Instalar Cypress
//     npm install --save-dev cypress

//     # Abrir Cypress por primera vez (crea estructura)
//     npx cypress open

//     # Ejecutar tests headless
//     npx cypress run

// **Estructura de proyecto Cypress:**

//     cypress/
//     ├── fixtures/          # Datos de test (JSON, imágenes)
//     ├── integration/       # Tests E2E
//     ├── plugins/           # Plugins y configuración
//     └── support/           # Comandos personalizados

//     cypress.json           # Configuración global

// **Configuración básica (cypress.json):**

    {
      "baseUrl": "http://localhost:3000",
      "viewportWidth": 1280,
      "viewportHeight": 720,
      "defaultCommandTimeout": 10000,
      "requestTimeout": 10000,
      "responseTimeout": 10000,
      "video": true,
      "screenshotOnRunFailure": true,
      "retries": {
        "runMode": 2,
        "openMode": 0
      }
    }
// Concepto clave: Cypress se configura para entorno específico y maneja timeouts automáticamente.

// 🎯 Filosofía de Cypress
// Diferencias clave con Selenium:

// Cypress advantages:

// Sin WebDriver: Corre dentro del navegador.
// Time Travel: Depuración con snapshots.
// Auto-wait: Espera automáticamente elementos.
// Videos/Screenshots: Grabación automática de fallos.
// Hot Reload: Tests se recargan automáticamente.
// Developer Experience: Mejor debugging.
// Limitaciones:

// Solo Chrome/Firefox (navegadores basados en Chromium).
// Solo JavaScript (no multi-lenguaje).
// No testing de apps nativas móviles.
// Concepto clave: Cypress sacrifica flexibilidad por mejor developer experience.