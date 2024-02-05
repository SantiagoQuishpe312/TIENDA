const request = require("supertest");
const { app, db, server} = require("../app");

describe('Pruebas para la ruta /detalles', () => {
    // Test 1
    it('debería obtener todos los detalles', async () => {
      const response = await request(app).get('/detalles');
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
    });
  
    // Test 2
    it('debería obtener un detalles por ID', async () => {
      const clientId = 1;
      const response = await request(app).get(`/detalles/${clientId}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });
  
    // Test 3
    it('debería crear un nuevo cliente', async () => {
      const newClient = {
        FAC_ID:2,
        PRO_ID:2,
        DET_CANTIDAD:3,
        
      };
      const response = await request(app)
        .post('/detalles')
        .send(newClient);
      expect(response.status).toBe(200);
      // Ajusta la afirmación según tus datos de prueba
    }, 10000);
  
    it('debería actualizar el estado de un cliente de Activo a Inactivo', async () => {
      // Supongamos que ya existe un cliente con el ID 1 en la base de datos
      const clientIdToUpdate = 1;
    
      // Primero, obtenemos el cliente actual para asegurarnos de su estado actual
      const getClientResponse = await request(app).get(`/detalles/${clientIdToUpdate}`);
      const clienteActual = getClientResponse.body[0];
    
      // Verificamos que el cliente exista y tenga el estado inicial 'Activo'
      expect(clienteActual).toBeTruthy();
      //expect(clienteActual.CLI_ESTADO).toBe('Activo');
    
      // Actualizamos el estado a 'Inactivo'
      const updateResponse = await request(app)
        .put(`/detalles/${clientIdToUpdate}`)
        .send({ DET_CANTIDAD: 2 });
    
      // Verificamos que la actualización haya sido exitosa
      expect(updateResponse.status).toBe(200);
    
      // Obtenemos el cliente actualizado para verificar que el estado ahora sea 'Inactivo'
      const getUpdatedClientResponse = await request(app).get(`/detalles/${clientIdToUpdate}`);
      const clienteActualizado = getUpdatedClientResponse.body[0];
    
      // Verificamos que el cliente exista y que el estado ahora sea 'Inactivo'
      expect(clienteActualizado).toBeTruthy();
      expect(clienteActualizado.DET_CANTIDAD).toBe(2);
    }, 10000);
    // Cerrar la conexión a la base de datos después de las pruebas
    afterAll(async () => {
      await db.end(); // Cierra la conexión a la base de datos
      await server.close(); 
      
    });
  });
  