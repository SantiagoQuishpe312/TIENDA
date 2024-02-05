// cypress/integration/ejemplo_prueba.spec.js

describe('Mi primera prueba en Cypress', () => {
    it('Debe cargar la página correctamente', () => {
      cy.visit('http://localhost:3000/');
      cy.contains('Bienvenido').should('be.visible');
    });
  });
  