const request = require('supertest');
const { app, db, server} = require("../app");// Asegúrate de cambiar el nombre del archivo según tu estructura

// Después de tus pruebas de clientes, podrías agregar las pruebas para productos
describe('Productos API', () => {

  // Pruebas para obtener todos los productos
  describe('GET /productos', () => {
    it('debería obtener todos los productos', async () => {
      const response = await request(app).get('/productos');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(72);
    });
  });

  // Pruebas para obtener un producto por su ID
  describe('GET /productos/:id', () => {
    it('debería obtener un producto por su ID', async () => {
      // Agrega lógica para obtener un ID válido desde tu base de datos
      const idValido = 3;
      const response = await request(app).get(`/productos/${idValido}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });

  });

  // Pruebas para crear un nuevo producto
  describe('POST /productos', () => {
    it('debería crear un nuevo producto', async () => {
        const nuevoProducto = {
            PROV_ID: 1,
            CAT_ID: 1,
            PRO_NOMBRE: 'Producto de Prueba',
            PRO_DESCRIPCION: 'Descripción del producto de prueba',
            PRO_STOCK: 10,
            PRO_PRECIO: 49.99,
            PRO_IVA: 'Aplica', // O el valor que aplique en tu caso
            PRO_ESTADO: 'Disponible', // O el estado que prefieras
          };
          

      const response = await request(app)
        .post('/productos')
        .send(nuevoProducto);

      expect(response.status).toBe(200);
     
    }),10000;
  });

  it('debería actualizar el estado de un producto de Activo a Inactivo', async () => {
    // Supongamos que ya existe un cliente con el ID 1 en la base de datos
    const productIdToUpdate = 1;
  
    // Primero, obtenemos el cliente actual para asegurarnos de su estado actual
    const getProductResponse = await request(app).get(`/productos/${productIdToUpdate}`);
    const productoActual = getProductResponse.body[0];
  
    // Verificamos que el cliente exista y tenga el estado inicial 'Activo'
    expect(productoActual).toBeTruthy();
    //expect(clienteActual.CLI_ESTADO).toBe('Activo');
  
    // Actualizamos el estado a 'Inactivo'
    const updateResponse = await request(app)
      .put(`/productos/${productIdToUpdate}`)
      .send({ PRO_ESTADO: 'Inactivo' });
  
    // Verificamos que la actualización haya sido exitosa
    expect(updateResponse.status).toBe(200);
  
    // Obtenemos el cliente actualizado para verificar que el estado ahora sea 'Inactivo'
    const getUpdatedProductResponse = await request(app).get(`/productos/${productIdToUpdate}`);
    const productoActualizado = getUpdatedProductResponse.body[0];
  
    // Verificamos que el cliente exista y que el estado ahora sea 'Inactivo'
    expect(productoActualizado).toBeTruthy();
    expect(productoActualizado.PRO_ESTADO).toBe('Inactivo');
  }, 10000);
  afterAll(async () => {
    await db.end(); // Cierra la conexión a la base de datos
    await server.close(); 
    
  });
  // Agrega pruebas similares para otras rutas de productos, como actualizar y eliminar
});
