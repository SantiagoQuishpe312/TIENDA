describe('Pruebas de RegistroCliente', () => {
  it('Se carga correctamente y se puede agregar un nuevo cliente', () => {
    // Abrir la página
    cy.visit('http://localhost:3000');

    // Asegurarse de que el formulario de agregar cliente esté cerrado inicialmente
    cy.get('.modal').should('not.be.visible');

    // Hacer clic en el botón para agregar un nuevo cliente
    cy.get('.custom-button').contains('Agregar Cliente').click();

    // Asegurarse de que el formulario de agregar cliente ahora esté visible
    cy.get('.modal').should('be.visible');

    // Llenar el formulario con datos de prueba
    cy.get('#cedula').type('1234567890');
    cy.get('#primerNombre').type('John');
    cy.get('#primerApellido').type('Doe');
    cy.get('#telefono').type('1234567890');
    cy.get('#direccion').type('123 Main St');
    cy.get('#correoElectronico').type('john.doe@example.com');
    cy.get('#FecNacimiento').type('1990-01-01');

    // Enviar el formulario
    cy.get('.custom-button').contains('Registrar').click();

    // Asegurarse de que el formulario de agregar cliente ahora esté cerrado
    cy.get('.modal').should('not.be.visible');

    // Asegurarse de que el cliente recién agregado esté en la tabla
    cy.contains('John Doe').should('exist');
  });
});
