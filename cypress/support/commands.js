/** @format */

Cypress.Commands.add("login", (usr, pwd) => {
  cy.visit("/");
  cy.get("#email").type(usr);
  cy.get('[data-cy="sign-in-main__button"]').click();
  cy.get("#password").type(pwd);
  cy.get('[data-cy="sign-in-main__button"]').click();
  cy.url().should("contain", "/#/home");
});
