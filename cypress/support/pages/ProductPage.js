class ProductPage {
  searchProduct(name) {
    cy.get('[data-cy=search-input]').type(name);
    cy.get('[data-cy=search-button]').click();
    return this;
  }

  addFirstProductToCart() {
    cy.get('[data-cy=add-to-cart]').first().click();
    return this;
  }

  goToCart() {
    cy.get('[data-cy=cart-button]').click();
    return this;
  }
}

export default new ProductPage();
