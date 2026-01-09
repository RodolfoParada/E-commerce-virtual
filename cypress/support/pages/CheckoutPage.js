class CheckoutPage {
  fillShipping(data) {
    cy.get('[data-cy=address]').type(data.address);
    cy.get('[data-cy=city]').type(data.city);
    cy.get('[data-cy=zip]').type(data.zip);
    return this;
  }

  completePurchase() {
    cy.get('[data-cy=checkout-button]').click();
    return this;
  }

  shouldShowConfirmation() {
    cy.get('[data-cy=order-confirmation]').should('be.visible');
  }
}

export default new CheckoutPage();
