import ProductPage from '../support/pages/ProductPage';
import CheckoutPage from '../support/pages/CheckoutPage';

describe('Flujo completo de compra', () => {

  beforeEach(() => {
    cy.login('user@test.com', 'password123');
  });

  it('Usuario puede comprar un producto', () => {
    cy.visit('/products');

    ProductPage
      .searchProduct('Laptop')
      .addFirstProductToCart()
      .goToCart();

    CheckoutPage
      .fillShipping({
        address: 'Av. Siempre Viva 123',
        city: 'Santiago',
        zip: '8320000'
      })
      .completePurchase()
      .shouldShowConfirmation();
  });

});
