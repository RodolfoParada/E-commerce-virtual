Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', '/api/login', { email, password })
    .then((res) => {
      window.localStorage.setItem('token', res.body.token);
    });
});

Cypress.Commands.add('createUserAPI', (user) => {
  return cy.request('POST', '/api/users', user);
});

Cypress.Commands.add('uniqueEmail', () => {
  return `user_${Date.now()}@test.com`;
});
