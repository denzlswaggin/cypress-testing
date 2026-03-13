Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('url test', () => {
  it('passes', () => {
    cy.visit('https://github.com/')
  })
})


it('Navigation testing', () => {
  cy.visit('https://github.com/cypress-io/cypress');
  
  cy.get('#issues-tab').click();
  
  cy.url().should('include', '/issues');

  cy.get('#pull-requests-tab').click();

  cy.url().should('include','/pulls')

  cy.get('#discussions-tab').click();

  cy.url().should('include','/discussions');

  cy.get('#actions-tab').click();

  cy.url().should('include',"/actions");
});

it('Registration validation', () =>  {
  cy.visit('https://github.com/');

  /* cy.get('#user-email').first()
  .type('test-user@seznam.cz')
  .should('have.value', 'test-user@seznam.cz');

  */


  cy.get('.js-hero-action').click();
});