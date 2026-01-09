describe('Registro y Login', () => {

  it('Registro exitoso de usuario nuevo', () => {
    const email = `user${Date.now()}@test.com`;

    cy.visit('/register');

    cy.get('[data-cy=name]').type('Juan Test');
    cy.get('[data-cy=email]').type(email);
    cy.get('[data-cy=password]').type('password123');
    cy.get('[data-cy=register]').click();

    cy.url().should('include', '/dashboard');
  });

  it('Login exitoso', () => {
    cy.login('user@test.com', 'password123');
    cy.visit('/dashboard');
    cy.url().should('include', '/dashboard');
  });

  it('Logout redirige a login', () => {
    cy.login('user@test.com', 'password123');
    cy.visit('/dashboard');

    cy.get('[data-cy=logout]').click();
    cy.url().should('include', '/login');
  });

});
