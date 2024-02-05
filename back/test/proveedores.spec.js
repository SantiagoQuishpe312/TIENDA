const request = require("supertest");
const { app, db, server} = require("../app");

describe('Pruebas para la ruta /proveedores', () => {
  // Test 1
  it('debería obtener todos los proveedores', async () => {
    const response = await request(app).get('/proveedores');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });

  // Test 2
  it('debería obtener un proveedor por ID', async () => {
    const provId = 1;
    const response = await request(app).get(`/proveedores/${provId}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  // Test 3
  it('debería crear un nuevo proveedor', async () => {
    const newProv = {
      PROV_RUC: '1234567890001',
      PROV_NOMBRE: 'NESTLE',
      PROV_EMAIL: 'juan@example.com',
      PROV_CONTACTO: '123456789',
      PROV_DIRECCION: 'Calle 123, Ciudad',
      PROV_ESTADO: 'Activo',
    };
    const response = await request(app)
      .post('/proveedores')
      .send(newProv);
    expect(response.status).toBe(200);
    // Ajusta la afirmación según tus datos de prueba
  }, 10000);

  it('debería actualizar el estado de un proveedor de Activo a Inactivo', async () => {
    // Supongamos que ya existe un cliente con el ID 1 en la base de datos
    const provIdToUpdate = 1;
  
    // Primero, obtenemos el cliente actual para asegurarnos de su estado actual
    const getProvResponse = await request(app).get(`/proveedores/${provIdToUpdate}`);
    const ProveedorActual = getProvResponse.body[0];
  
    // Verificamos que el cliente exista y tenga el estado inicial 'Activo'
    expect(ProveedorActual).toBeTruthy();
    //expect(clienteActual.CLI_ESTADO).toBe('Activo');
  
    // Actualizamos el estado a 'Inactivo'
    const updateResponse = await request(app)
      .put(`/proveedores/${provIdToUpdate}`)
      .send({ PROV_ESTADO: 'Inactivo' });
  
    // Verificamos que la actualización haya sido exitosa
    expect(updateResponse.status).toBe(200);
  
    // Obtenemos el cliente actualizado para verificar que el estado ahora sea 'Inactivo'
    const getUpdatedProvResponse = await request(app).get(`/proveedores/${provIdToUpdate}`);
    const provActualizado = getUpdatedProvResponse.body[0];
  
    // Verificamos que el cliente exista y que el estado ahora sea 'Inactivo'
    expect(provActualizado).toBeTruthy();
    expect(provActualizado.PROV_ESTADO).toBe('Inactivo');
  }, 10000);
  // Cerrar la conexión a la base de datos después de las pruebas
  afterAll(async () => {
    await db.end(); // Cierra la conexión a la base de datos
    await server.close(); 
    
  });
});
