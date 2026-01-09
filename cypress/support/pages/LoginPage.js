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
}

export default new LoginPage();
