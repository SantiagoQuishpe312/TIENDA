describe('Home Page', () => {
  beforeEach(() => {
    // Puedes agregar configuraciones comunes o acciones antes de cada prueba si es necesario
    // Por ejemplo, puedes visitar la página de inicio antes de cada prueba
    cy.visit('/home');
  });

  // Prueba 1: Verifica que el título de la página sea correcto
  it('should have the correct title', () => {
    cy.title().should('eq', 'HOME');
  });

  // Prueba 2: Verifica que la sección de bienvenida esté presente y contenga el texto adecuado
  it('should display welcome section', () => {
    cy.get('.slider_item-detail').should('exist');
    cy.get('.slider_item-detail h1').should('contain', 'Bienvenido');
  });

  // Prueba 3: Verifica que la sección de productos esté presente y contenga las categorías adecuadas
  it('should display product section with categories', () => {
    cy.get('.section2').should('exist');
    cy.get('.functionality__col').should('have.length', 4);
  });

  // Prueba 4: Verifica que la sección de información de la tienda esté presente y contenga el texto adecuado
  it('should display store information section', () => {
    cy.get('#nombreTienda').should('exist');
    cy.get('.text-section3 h3').should('contain', 'Tiendita');
  });

  // Prueba 5: Verifica que la sección de contacto esté presente y contenga la información adecuada
  it('should display contact section', () => {
    cy.get('.section4').should('exist');
    cy.get('.section4-contenedores').should('have.length', 3);
  });

  // Prueba 6: Verifica que haya imágenes en la página
  it('should display images', () => {
    cy.get('img').should('exist');
  });

  // Prueba 7: Verifica que el componente se renderice sin errores y en un tiempo razonable
  it('should render without errors', () => {
    cy.get('.hero_area').should('exist');
  });

  // Prueba 8: Verifica que la sección de bienvenida contenga el texto esperado
  it('should display correct welcome message', () => {
    cy.get('.slider_item-detail h1').should('contain', 'Bienvenido');
  });

  // Prueba 9: Verifica que las imágenes en la sección de productos se carguen correctamente
  it('should display product images', () => {
    cy.get('.functionality__col img').should('be.visible');
  });

  // Prueba 10: Asegúrate de que la sección de información de la tienda esté presente en la página
  it('should display store information section', () => {
    cy.get('#nombreTienda').should('exist');
  });

  // Prueba 11: Asegúrate de que haya imágenes en la página
  it('should display images', () => {
    cy.get('img').should('exist');
  });
});
