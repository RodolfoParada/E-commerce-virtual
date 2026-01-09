// Task 4: Integración en CI/CD y Best Practices (7 minutos)
// Configuración de Cypress en pipelines y mejores prácticas.

// 🔄 Cypress en CI/CD
// **Configuración para GitHub Actions:**

//     # .github/workflows/e2e.yml
//     name: E2E Tests

//     on:
//       push:
//         branches: [main, develop]
//       pull_request:
//         branches: [main]

//     jobs:
//       e2e:
//         runs-on: ubuntu-latest

//         steps:
//           - name: Checkout code
//             uses: actions/checkout@v3

//           - name: Setup Node.js
//             uses: actions/setup-node@v3
//             with:
//               node-version: '18'

//           - name: Install dependencies
//             run: npm ci

//           - name: Start application
//             run: npm run start &
//             env:
//               NODE_ENV: test

//           - name: Wait for app to be ready
//             run: |
//               timeout 60 bash -c 'until curl -f http://localhost:3000; do sleep 2; done'

//           - name: Run E2E tests
//             run: npm run test:e2e
//             env:
//               CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}

//           - name: Upload test results
//             uses: actions/upload-artifact@v3
//             if: failure()
//             with:
//               name: cypress-videos
//               path: cypress/videos/

// **Configuración en package.json:**

    {
      "scripts": {
        "test:e2e": "cypress run",
        "test:e2e:headed": "cypress run --headed",
        "test:e2e:record": "cypress run --record",
        "cypress:open": "cypress open"
      }
    }
// Concepto clave: Cypress se integra perfectamente en pipelines modernos de CI/CD.

// 🎯 Best Practices para E2E Testing
// 1. Selectores Estables:

    // ❌ Mal - selectores frágiles
    cy.get('.btn-primary').click(); // Puede cambiar
    cy.get('#submit-btn').click(); // IDs pueden cambiar

    // ✅ Bien - data attributes específicos
    cy.get('[data-cy=submit-button]').click();
    cy.get('[data-cy=user-name]').type('Juan');

    // En JSX
    <button data-cy="submit-button">Enviar</button>

// **2. Gestión de Estado:**

    // cypress/support/commands.js
    Cypress.Commands.add('login', (email, password) => {
        // Encapsulamos la lógica repetitiva
        cy.visit('/login');
        cy.get('[data-cy=email]').type(email);
        cy.get('[data-cy=password]').type(password);
        cy.get('[data-cy=login]').click();
        cy.url().should('not.include', '/login');
    });

    // Uso en tests
    beforeEach(() => {
      cy.login('user@test.com', 'password');
    });

// **3. Custom Commands:**

    // cypress/support/commands.js
    Cypress.Commands.add('createUser', (userData) => {
      cy.request('POST', '/api/users', userData)
        .then((response) => {
          expect(response.status).to.eq(201);
          return response.body;
        });
    });

    Cypress.Commands.add('cleanupTestData', () => {
      cy.request('DELETE', '/api/test-data');
    });

    // Uso
    beforeEach(() => {
      cy.cleanupTestData();
      cy.createUser({ name: 'Test User', email: 'test@example.com' });
    });

// **4. Fixtures para Datos:**

    // cypress/fixtures/users.json
    {
      "admin": {
        "name": "Admin User",
        "email": "admin@test.com",
        "password": "admin123",
        "role": "admin"
      },
      "user": {
        "name": "Regular User",
        "email": "user@test.com",
        "password": "user123",
        "role": "user"
      }
    }

    // Uso en tests
    cy.fixture('users').then((users) => {
      cy.login(users.admin.email, users.admin.password);
    });
// Concepto clave: Las mejores prácticas hacen tests E2E más rápidos, confiables y mantenibles.

