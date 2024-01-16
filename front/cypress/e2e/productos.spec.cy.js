
describe('Regresion productos', () => {

  // Inicia una nueva prueba llamada "Obtener productos".
  it('Obtener productos', () => {
    // Realiza una solicitud GET a la URL 'http://localhost:5000/productos'.
    cy.request('GET', 'http://localhost:5000/productos')
      .then(response => {
        // Después de que la solicitud ha sido completada con éxito, verifica el estado de la respuesta y la longitud del cuerpo.
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(38);
      });
  });

  // Inicia una nueva prueba llamada "Mostrar título correctamente".
  it('Mostrar titulo correctamente', () => {
    // Visita la URL 'http://localhost:3000/registro-productos'.
    cy.visit('http://localhost:3000/registro-productos')
      .then(response => {
        // Después de que la página ha sido cargada, verifica que el elemento h1 contenga el texto 'GESTIÓN DE PRODUCTOS'.
        cy.get('h1').should('contain', 'GESTIÓN DE PRODUCTOS');
      });
  });

  // Inicia una nueva prueba llamada "Verificar que se muestre la tabla de productos".
  it('Verificar que se muestre la tabla de productos', () => {
    // Visita la URL 'http://localhost:3000/registro-productos'.
    cy.visit('http://localhost:3000/registro-productos')
      .then(response => {
        // Después de que la página ha sido cargada, verifica que el elemento table sea visible.
        cy.get('table').should('be.visible');
      });
  });

  // Inicia una nueva prueba llamada "Agregar producto está visible".
  it('Agregar producto esta visible', () => {
    // Visita la URL 'http://localhost:3000/registro-productos'.
    cy.visit('http://localhost:3000/registro-productos')
      .then(response => {
        // Después de que la página ha sido cargada, realiza acciones para agregar un producto y verifica que el cuadro modal sea visible.
        cy.get('.custom-button').contains('Agregar Producto').click();
        cy.get('.modal').should('be.visible');
      });
  });

  // Inicia una nueva prueba llamada "Verificar que se pueda filtrar por categoría".
  it('Verificar que se pueda filtrar por categoría', () => {
    // Visita la URL 'http://localhost:3000/registro-productos'.
    cy.visit('http://localhost:3000/registro-productos')
      .then(response => {
        // Después de que la página ha sido cargada, realiza acciones para seleccionar la categoría 'Calzado' y verifica la cantidad de filas en la tabla.
        cy.get('#categoria').select('Calzado');
        cy.get('table tbody tr').should('have.length', 2);
      });
  });

});
