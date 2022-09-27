Cypress.Commands.add('login', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="email-input"]').type('test@test.com')
    cy.get('[data-testid="password-input"]').type('123456789');
    cy.get('[data-testid="login-submit-btn"]').click();
});