
describe('Registration test', () => {

  beforeEach(() => {
    cy.visit('/join');
  });

  it('Displays the registration form', () => {
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#login').should('be.visible');
  });

  it('Validation — empty form cant be submitted', () => {
    cy.contains('Create account').click();
    cy.get('#email').should('be.visible');
  });

  it('Validation — email in a wrong format', () => {
    cy.get('#email').type('neplatny-email');
    cy.get('#password').type(Cypress.env('TEST_PASSWORD'));
    cy.contains('Create account').click();
    cy.get('#email').then(($el) => {
      expect($el[0].validationMessage).to.not.be.empty;
    });
  });

  it('Country dropdown working', () => {
    cy.get('#country-dropdown-panel-button')
      .should('be.visible')
      .click();


    cy.get('#country-dropdown-panel', { timeout: 8000 })
      .should('be.visible')
      .contains('Chad')
      .click();

    // Validace vybrané země
    cy.get('#country-dropdown-panel-button')
      .should('contain.text', 'Chad');
  })

  it('Validation - password too short', () => {
    cy.get('#email').type(Cypress.env('TEST_EMAIL'));
    cy.get('#password').type('abc');
    cy.get('#login').type(Cypress.env('TEST_USERNAME'));
    cy.contains('Create account').click();
    cy.url().should('include', '/signup');
  });

  it('Complete form filling', () => {
    cy.get('#email')
      .should('be.visible')
      .type(Cypress.env('TEST_EMAIL'));

    cy.get('#password')
      .should('be.visible')
      .type(Cypress.env('TEST_PASSWORD'));

    cy.get('#login')
      .should('be.visible')
      .type(Cypress.env('TEST_USERNAME'));

    cy.get('#country-dropdown-panel-button')
      .should('be.visible')
      .click();

    cy.get('#country-dropdown-panel', { timeout: 8000 })
      .should('be.visible')
      .contains('Chad')
      .click();

    cy.get('.FormControl-checkbox-labelWrap')
      .should('be.visible')
      .click();

    cy.get('#email').should('have.value', Cypress.env('TEST_EMAIL'));
    cy.get('#login').should('have.value', Cypress.env('TEST_USERNAME'));

    cy.contains('Create account').click();

    cy.url().should('not.equal', 'https://github.com/join');
  });

});