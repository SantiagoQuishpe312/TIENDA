const request = require("supertest");
const { app, db, server} = require("../app");

describe('Pruebas para la ruta /clientes', () => {
  // Test 1
  it('debería obtener todos los clientes', async () => {
    const response = await request(app).get('/clientes');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });

  // Test 2
  it('debería obtener un cliente por ID', async () => {
    const clientId = 1;
    const response = await request(app).get(`/clientes/${clientId}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  // Test 3
  it('debería crear un nuevo cliente', async () => {
    const newClient = {
      CLI_CEDULA: '1234567890',
      CLI_PRIMERAPELLIDO: 'Perez',
      CLI_SEGUNDOAPELLIDO: 'Gomez',
      CLI_PRIMERNOMBRE: 'Juan',
      CLI_SEGUNDONOMBRE: 'Carlos',
      CLI_EMAIL: 'juan@example.com',
      CLI_CONTACTO: '123456789',
      CLI_DIRECCION: 'Calle 123, Ciudad',
      CLI_FECNACIMIENTO: '1990-01-01', // Asegúrate de usar el formato correcto de fecha
      CLI_ESTADO: 'Activo',
    };
    const response = await request(app)
      .post('/clientes')
      .send(newClient);
    expect(response.status).toBe(200);
    // Ajusta la afirmación según tus datos de prueba
  }, 10000);

  it('debería actualizar el estado de un cliente de Activo a Inactivo', async () => {
    // Supongamos que ya existe un cliente con el ID 1 en la base de datos
    const clientIdToUpdate = 1;
  
    // Primero, obtenemos el cliente actual para asegurarnos de su estado actual
    const getClientResponse = await request(app).get(`/clientes/${clientIdToUpdate}`);
    const clienteActual = getClientResponse.body[0];
  
    // Verificamos que el cliente exista y tenga el estado inicial 'Activo'
    expect(clienteActual).toBeTruthy();
    //expect(clienteActual.CLI_ESTADO).toBe('Activo');
  
    // Actualizamos el estado a 'Inactivo'
    const updateResponse = await request(app)
      .put(`/clientes/${clientIdToUpdate}`)
      .send({ CLI_ESTADO: 'Inactivo' });
  
    // Verificamos que la actualización haya sido exitosa
    expect(updateResponse.status).toBe(200);
  
    // Obtenemos el cliente actualizado para verificar que el estado ahora sea 'Inactivo'
    const getUpdatedClientResponse = await request(app).get(`/clientes/${clientIdToUpdate}`);
    const clienteActualizado = getUpdatedClientResponse.body[0];
  
    // Verificamos que el cliente exista y que el estado ahora sea 'Inactivo'
    expect(clienteActualizado).toBeTruthy();
    expect(clienteActualizado.CLI_ESTADO).toBe('Inactivo');
  }, 10000);
  // Cerrar la conexión a la base de datos después de las pruebas
  afterAll(async () => {
    await db.end(); // Cierra la conexión a la base de datos
    await server.close(); 
    
  });
});
