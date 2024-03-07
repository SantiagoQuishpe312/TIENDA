import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { appObserver } from './appObserver';
const URI = "http://localhost:5000/clientes/";
const ClienteValidacion = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [clientes, setClientes] = useState([]);
  const { id } = useParams();
  const [Cedula, setCedula] = useState("");
  const [PrimerApellido, setPrimerApellido] = useState("");
  const [SegundoApellido, setSegundoApellido] = useState("");
  const [PrimerNombre, setPrimerNombre] = useState("");
  const [SegundoNombre, setSegundoNombre] = useState("");
  const [Email, setEmail] = useState("");
  const [Contacto, setContacto] = useState("");
  const [Direccion, setDireccion] = useState("");
  const [FecNacimiento, setFecNacimiento] = useState("");
  const [Estado, setEstado] = useState("");
  const update = async (e) => {
    e.preventDefault();
    if (!verificarCedula(Cedula)) {
      alert("Cédula no válida");
      return;
    }
    const dob = new Date(FecNacimiento);
    const today = new Date();
    if (dob > today) {
      alert('La fecha de nacimiento no es valida.');
      return;
    }
    let age = today.getFullYear() - dob.getFullYear();

    if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
      age--;
    }
    if (age < 18) {
      alert('El cliente debe tener al menos 18 años.');
      return;
    }
    try {
      const idAux = localStorage.getItem("id");
      const response = await axios.put(URI + idAux, {
        CLI_CEDULA: Cedula,
        CLI_PRIMERAPELLIDO: PrimerApellido,
        CLI_SEGUNDOAPELLIDO: SegundoApellido,
        CLI_PRIMERNOMBRE: PrimerNombre,
        CLI_SEGUNDONOMBRE: SegundoNombre,
        CLI_EMAIL: Email,
        CLI_CONTACTO: Contacto,
        CLI_DIRECCION: Direccion,
        CLI_FECNACIMIENTO: FecNacimiento,
        CLI_ESTADO: Estado,
      });
      const clienteActualizadoData = response.data;
      appObserver.notify({ action: 'update', data: clienteActualizadoData });
      setEditShowModal(false);
      getClientes();
    } catch (error) {
      console.error("Error al Actualizar Datos del Cliente:", error);
    }
  };
  function verificarCedula(cedula) {
    if (typeof (cedula) === 'string' && cedula.length === 10 && /^\d+$/.test(cedula)) {
      // Lógica de verificación de cédula
      var digitos = cedula.split('').map(Number);
      var codigo_provincia = digitos[0] * 10 + digitos[1];

      if (codigo_provincia >= 1 && (codigo_provincia <= 24 || codigo_provincia === 30)) {
        var digito_verificador = digitos.pop();

        var digito_calculado = digitos.reduce(
          function (valorPrevio, valorActual, indice) {
            return valorPrevio - (valorActual * (2 - indice % 2)) % 9 - (valorActual === 9) * 9;
          }, 1000) % 10;
        return digito_calculado === digito_verificador;
      }
    }
    return false;
  }
  const resetState = () => {
    setCedula("");
    setPrimerNombre("");
    setContacto("");
    setEmail("");
  };
  useEffect(() => {
    document.title = "CLIENTES";
    if (id) {
      getClienteById();
    } else {
      getClientes();
    }
  }, [id]);
  useEffect(() => {
    const handleClientesChange = (notification) => {
      const { action, data } = notification;
      let message;
      switch (action) {
        case 'add':
          message = `Nuevo cliente agregado: ${data}`;
          break;
        case 'update':
          message = `Cliente actualizado: ${data}`;
          break;
        default:
          message = 'Acción desconocida';
      }
      alert(message);
    };
    appObserver.subscribe(handleClientesChange);
    return () => {
      appObserver.unsubscribe(handleClientesChange);
    };
  }, []);
  useEffect(() => {
    if (showModal) {
      resetState();
    }
  }, [showModal]);
  const nuevoCliente = async (e) => {
    e.preventDefault();
    if (!verificarCedula(Cedula)) {
      alert("Cédula no válida");
      return;
    }
    try {
      const response = await axios.post(URI, {
        CLI_CEDULA: Cedula,
        CLI_PRIMERAPELLIDO: PrimerApellido,
        CLI_SEGUNDOAPELLIDO: SegundoApellido,
        CLI_PRIMERNOMBRE: PrimerNombre,
        CLI_SEGUNDONOMBRE: SegundoNombre,
        CLI_EMAIL: Email,
        CLI_CONTACTO: Contacto,
        CLI_DIRECCION: Direccion,
        CLI_FECNACIMIENTO: FecNacimiento,
        CLI_ESTADO: 'Activo',
      });
      const nuevoClienteData = response.data;
      appObserver.notify({ action: 'add', data: nuevoClienteData });
      setShowModal(false);
      getClientes();
    } catch (error) {
      console.error('Error al agregar nuevo cliente:', error);
    }
  };
  const validarCorreoElectronico = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      const afterAt = email.substring(atIndex + 1);
      if (/\d/.test(afterAt)) {
        return false;
      }
    }
    return emailRegex.test(email);
  };
  const handleNumeroChange = (e) => {
    const value = e.target.value;

    if (validarNumero(value) || value === "") {
      const inputName = e.target.name;
      switch (inputName) {
        case "cedula":
          setCedula(value);
          break;
        case "telefono":
          setContacto(value);
          break;
        default:
          alert("¡Este Campo solo contiene números!");
          break;
      }
    }
  };
  const handleTextChange = (e) => {
    const value = e.target.value;
    if (validarTexto(value) || value === "") {
      const inputName = e.target.name;
      switch (inputName) {
        case "primerNombre":
          setPrimerNombre(value);
          break;
        case "primerApellido":
          setPrimerApellido(value);
          break;
        case "segundoNombre":
          setSegundoNombre(value);
          break;
        case "segundoApellido":
          setSegundoApellido(value);
          break;
        case "email":
          setEmail(value);
          break;
        case "direccion":
          setDireccion(value);
          break;
        default:
          alert("¡Este Campo solo contiene texto!");
          break;
      }
    }
  };
  const validarTexto = (value) => {
    return /^[a-zA-Z\s]*$/.test(value);
  };
  const validarNumero = (value) => {
    return /^[0-9]*$/.test(value);
  };
  const renderClientesTabla = () => {
    return (
      <table className="centrar-tabla">
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Primer Nombre</th>
            <th>Primer Apellido</th>
            <th>Email</th>
            <th>Contacto</th>
            <th>Dirección</th>
            <th>Fecha Nacimiento</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes
            .filter((cliente) => {
              if (searchTerm === "") {
                return cliente;
              } else if (
                cliente.CLI_CEDULA.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return cliente;
              }
            })
            .map((cliente, index) => (
              <tr key={index}>
                <td>{cliente.CLI_CEDULA}</td>
                <td>{cliente.CLI_PRIMERNOMBRE}</td>
                <td>{cliente.CLI_PRIMERAPELLIDO}</td>
                <td>{cliente.CLI_EMAIL}</td>
                <td>{cliente.CLI_CONTACTO}</td>
                <td>{cliente.CLI_DIRECCION}</td>
                <td>{cliente.CLI_FECNACIMIENTO}</td>
                <td>{cliente.CLI_ESTADO}</td>
                <td>
                  <button onClick={() => handleEdit(cliente)}>Editar</button>
                  <button onClick={() => handleDelete(cliente)}>Eliminar</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };
  const handleEdit = (cliente) => {
    setCedula(cliente.CLI_CEDULA);
    setPrimerNombre(cliente.CLI_PRIMERNOMBRE);
    setSegundoNombre(cliente.CLI_SEGUNDONOMBRE);
    setPrimerApellido(cliente.CLI_PRIMERAPELLIDO);
    setSegundoApellido(cliente.CLI_SEGUNDOAPELLIDO);
    setEmail(cliente.CLI_EMAIL);
    setContacto(cliente.CLI_CONTACTO);
    setDireccion(cliente.CLI_DIRECCION);
    setFecNacimiento(cliente.CLI_FECNACIMIENTO);
    setEstado(cliente.CLI_ESTADO);
    setEditShowModal(true);
  };
  const handleDelete = async (cliente) => {
    if (window.confirm("¿Seguro que desea eliminar este cliente?")) {
      try {
        await axios.delete(URI + cliente.id);
        getClientes();
        alert("Cliente eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
      }
    }
  };
  const getClientes = async () => {
    try {
      const response = await axios.get(URI);
      setClientes(response.data);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };
  const getClienteById = async () => {
    try {
      var idAux = localStorage.getItem("id");
      const res = await axios.get(URI + idAux);

      if (res.data.length > 0) {
        setCedula(res.data[0].CLI_CEDULA);
        setPrimerApellido(res.data[0].CLI_PRIMERAPELLIDO);
        setSegundoApellido(res.data[0].CLI_SEGUNDOAPELLIDO);
        setPrimerNombre(res.data[0].CLI_PRIMERNOMBRE);
        setSegundoNombre(res.data[0].CLI_SEGUNDONOMBRE);
        setEmail(res.data[0].CLI_EMAIL);
        setContacto(res.data[0].CLI_CONTACTO);
        setDireccion(res.data[0].CLI_DIRECCION);
        const formattedDate = new Date(res.data[0].CLI_FECNACIMIENTO)
          .toISOString()
          .split("T")[0];
        setFecNacimiento(formattedDate);
        console.log(res.data[0].CLI_FECNACIMIENTO);
        setEstado(res.data[0].CLI_ESTADO);

      } else {
        console.log("No se encontró ningún cliente con el ID: " + idAux);
      }
    } catch (error) {
      console.error("Error al obtener los datos del cliente:", error);
    }
  };
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <div style={{ textAlign: "center", marginTop: "25px", marginBottom: "25px" }}>
        <h1>GESTIÓN DE CLIENTES</h1>
      </div>
      <button className="custom-button" onClick={() => setShowModal(true)}>
        Agregar Cliente <i className="fas fa-add" style={{ marginLeft: "5px" }}></i>
      </button>
      <br />
      <div className="">
        <br />{" "}
        <input
          type="text"
          id="search"
          name="search"
          value={searchTerm}
          maxLength={13}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por cedula"
        />
      </div>
      <br />
      {renderClientesTabla()}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Agregar Cliente</h2>
            <form onSubmit={nuevoCliente}>
              <div className="form-group">
              <label htmlFor="cedula">Cedula:</label>
                <input
                  type="text"
                  id="cedula"
                  name="cedula"
                  value={Cedula}
                  onChange={handleNumeroChange}
                  maxLength={10}
                  placeholder="Ingrese numero de cedula"
                  required
                />
              </div>
              <div className="form-group">
              <label htmlFor="primerNombre">Primer Nombre:</label>
                <input
                  type="text"
                  id="primerNombre"
                  name="primerNombre"
                  value={PrimerNombre}
                  onChange={handleTextChange}
                  placeholder="Ingrese primer nombre"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="segundoNombre">Segundo Nombre:</label>
                <input
                  type="text"
                  id="segundoNombre"
                  name="segundoNombre"
                  value={SegundoNombre}
                  placeholder="Ingrese segundo nombre"
                  onChange={handleTextChange}
                />
              </div>
              <div className="form-group">
              <label htmlFor="primerApellido">Primer Apellido:</label>
                <input
                  type="text"
                  name="primerApellido"
                  value={PrimerApellido}
                  onChange={handleTextChange}
                  placeholder="Ingrese primer apellido"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="segundoApellido">Segundo Apellido:</label>
                <input
                  type="text"
                  id="segundoApellido"
                  name="segundoApellido"
                  placeholder="Ingrese segundo apellido"
                  onChange={handleTextChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="telefono">Teléfono:</label>
                <input
                  type="telf"
                  id="telefono"
                  name="telefono"
                  maxLength={10}
                  value={Contacto}
                  placeholder="Ingrese telefono"
                  onChange={handleNumeroChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="direccion">Dirección:</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={Direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Ingrese dirección"
                  required
                />
                
              </div>
              <div className="form-group">
                <label htmlFor="correoElectronico">Correo Electrónico:</label>
                <input
                  type="email"
                  id="correoElectronico"
                  name="correoElectronico"
                  placeholder="Ingrese correo electronico"
                  onChange={(e) => setEmail(e.target.value)}
                  value={Email}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="fecha de Nacimiento">
                  Fecha de Nacimiento:
                </label>
                <input
                  type="date"
                  id="FecNacimiento"
                  name="FecNacimiento"
                  onChange={(e) => setFecNacimiento(e.target.value)}
                />
              </div>
              <button className="custom-button" type="submit">
                Registrar
              </button>
            </form>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setEditShowModal(false)}>
              &times;
            </span>
            <h2>Actualizar Cliente</h2>
            <form onSubmit={update}>
              <div className="form-group">
                <label htmlFor="cedula">Cedula:</label>
                <input
                  type="text"
                  id="cedula"
                  name="cedula"
                  maxLength={10}
                  className="centered-input"
                  value={Cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="primerNombre">Primer Nombre:</label>
                <input
                  type="text"
                  id="primerNombre"
                  name="primerNombre"
                  className="centered-input"
                  value={PrimerNombre}
                  onChange={(e) => setPrimerNombre(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="segundoNombre">Segundo Nombre:</label>
                <input
                  type="text"
                  id="segundoNombre"
                  name="segundoNombre"
                  className="centered-input"
                  value={SegundoNombre}
                  onChange={(e) => setSegundoNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="primerApellido">Primer Apellido:</label>
                <input
                  type="text"
                  id="primerApellido"
                  name="primerApellido"
                  className="centered-input"
                  value={PrimerApellido}
                  onChange={(e) => setPrimerApellido(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="segundoApellido">Segundo Apellido:</label>
                <input
                  type="text"
                  id="segundoApellido"
                  name="segundoApellido"
                  className="centered-input"
                  value={SegundoApellido}
                  onChange={(e) => setSegundoApellido(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Teléfono:</label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  className="centered-input"
                  value={Contacto}
                  onChange={handleNumeroChange}
                  maxLength={10}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="direccion">Dirección:</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  className="centered-input"
                  value={Direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="correoElectronico">Correo Electrónico:</label>
                <input
                  type="email"
                  id="correoElectronico"
                  name="correoElectronico"
                  className="centered-input"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="fecha de Nacimiento">
                  Fecha de Nacimiento:
                </label>
                <input
                  type="date"
                  id="FecNacimiento"
                  name="FecNacimiento"
                  value={FecNacimiento}
                  onChange={(e) => setFecNacimiento(e.target.value)}

                />
              </div>
              <button className="custom-button" type="submit">
                Registrar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClienteValidacion;
