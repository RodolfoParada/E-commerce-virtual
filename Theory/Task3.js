Task 2: Introducción a Cypress (7 minutos)
Configuración y conceptos básicos de Cypress para testing E2E.

⚙️ Configuración de Cypress
**Instalación y setup:**

    # Instalar Cypress
    npm install --save-dev cypress

    # Abrir Cypress por primera vez (crea estructura)
    npx cypress open

    # Ejecutar tests headless
    npx cypress run

**Estructura de proyecto Cypress:**

    cypress/
    ├── fixtures/          # Datos de test (JSON, imágenes)
    ├── integration/       # Tests E2E
    ├── plugins/           # Plugins y configuración
    └── support/           # Comandos personalizados

    cypress.json           # Configuración global

**Configuración básica (cypress.json):**

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
Concepto clave: Cypress se configura para entorno específico y maneja timeouts automáticamente.

🎯 Filosofía de Cypress
Diferencias clave con Selenium:

Cypress advantages:

Sin WebDriver: Corre dentro del navegador.
Time Travel: Depuración con snapshots.
Auto-wait: Espera automáticamente elementos.
Videos/Screenshots: Grabación automática de fallos.
Hot Reload: Tests se recargan automáticamente.
Developer Experience: Mejor debugging.
Limitaciones:

Solo Chrome/Firefox (navegadores basados en Chromium).
Solo JavaScript (no multi-lenguaje).
No testing de apps nativas móviles.
Concepto clave: Cypress sacrifica flexibilidad por mejor developer experience.

Task 3: Writing E2E Tests con Cypress (8 minutos)
Patrones y técnicas para escribir tests E2E efectivos y mantenibles.

📝 Estructura de un Test E2E
**Patrón AAA adaptado para E2E:**

    // cypress/integration/user-registration.spec.js
    describe('Registro de Usuario', () => {
      beforeEach(() => {
        // Limpiar estado entre tests
        cy.clearLocalStorage();
        cy.clearCookies();

        // Visitar página
        cy.visit('/register');
      });

      it('usuario puede registrarse exitosamente', () => {
        // Arrange - Preparar datos
        const userData = {
          name: 'Juan Pérez',
          email: `juan${Date.now()}@test.com`, // Email único
          password: 'password123'
        };

        // Act - Ejecutar acciones del usuario
        cy.get('[data-cy=name-input]').type(userData.name);
        cy.get('[data-cy=email-input]').type(userData.email);
        cy.get('[data-cy=password-input]').type(userData.password);
        cy.get('[data-cy=confirm-password-input]').type(userData.password);

        cy.get('[data-cy=register-button]').click();

        // Assert - Verificar resultado
        cy.url().should('include', '/dashboard');
        cy.get('[data-cy=welcome-message]').should('contain', userData.name);

        // Verificar persistencia (login automático)
        cy.reload();
        cy.url().should('include', '/dashboard');
      });

      it('muestra errores de validación', () => {
        // Act
        cy.get('[data-cy=register-button]').click();

        // Assert
        cy.get('[data-cy=name-error]').should('contain', 'Nombre requerido');
        cy.get('[data-cy=email-error]').should('contain', 'Email requerido');
        cy.get('[data-cy=password-error]').should('contain', 'Contraseña requerida');

        // Verificar que no se envió formulario
        cy.url().should('include', '/register');
      });

      it('previene registro con email duplicado', () => {
        // Arrange - Crear usuario existente
        cy.request('POST', '/api/users', {
          name: 'Usuario Existente',
          email: 'existing@test.com',
          password: 'password123'
        });

        // Act - Intentar registrar con mismo email
        cy.get('[data-cy=name-input]').type('Juan Pérez');
        cy.get('[data-cy=email-input]').type('existing@test.com');
        cy.get('[data-cy=password-input]').type('password123');
        cy.get('[data-cy=confirm-password-input]').type('password123');
        cy.get('[data-cy=register-button]').click();

        // Assert
        cy.get('[data-cy=email-error]').should('contain', 'Email ya registrado');
        cy.url().should('include', '/register');
      });
    });
Concepto clave: Tests E2E siguen flujos reales del usuario con assertions significativas.

🎭 Page Object Pattern
**Organización de tests complejos:**

    // cypress/support/pages/LoginPage.js
    class LoginPage {
      visit() {
        cy.visit('/login');
        return this;
      }

      fillEmail(email) {
        cy.get('[data-cy=email-input]').type(email);
        return this;
      }

      fillPassword(password) {
        cy.get('[data-cy=password-input]').type(password);
        return this;
      }

      submit() {
        cy.get('[data-cy=login-button]').click();
        return this;
      }

      login(email, password) {
        return this.fillEmail(email)
                   .fillPassword(password)
                   .submit();
      }

      shouldShowError(message) {
        cy.get('[data-cy=error-message]').should('contain', message);
        return this;
      }

      shouldRedirectToDashboard() {
        cy.url().should('include', '/dashboard');
        return this;
      }
    }

    export default new LoginPage();

    // Uso en tests
    import LoginPage from '../support/pages/LoginPage';

    it('login exitoso', () => {
      LoginPage.visit()
               .login('user@test.com', 'password')
               .shouldRedirectToDashboard();
    });

    it('login fallido', () => {
      LoginPage.visit()
               .login('wrong@email.com', 'wrongpass')
               .shouldShowError('Credenciales inválidas');
    });
Concepto clave: Page Objects hacen tests más legibles y mantenibles.