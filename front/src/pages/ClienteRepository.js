import React, { useState, useEffect } from "react";
import axios from "axios";
import { appObserver } from './appObserver';

const URI = "http://localhost:5000/clientes/";

const ClienteRepository = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);
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

  const resetState = () => {
    setCedula("");
    setPrimerNombre("");
    setContacto("");
    setEmail("");
  };

  useEffect(() => {
    getClientes();
  }, []);

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

  const getClienteById = async () => {
    try {
      const idAux = localStorage.getItem("id");
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
        setEstado(res.data[0].CLI_ESTADO);
      } else {
        console.log("No se encontró ningún cliente con el ID: " + idAux);
      }
    } catch (error) {
      console.error("Error al obtener los datos del cliente:", error);
    }
  };

  const getClientes = async () => {
    try {
      const res = await axios.get(URI);
      setClientes(res.data);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  };

  const deleteClientes = async (id) => {
    try {
      await axios.put(URI + id, {
        CLI_ESTADO: "Inactivo",
      });
      getClientes();
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  };

  const ActivarClientes = async (id) => {
    try {
      await axios.put(URI + id, {
        CLI_ESTADO: "Activo",
      });
      getClientes();
    } catch (error) {
      console.error("Error al activar cliente:", error);
    }
  };

  const renderClientesTabla = () => {
    const filteredClientes = clientes.filter((cliente) => {
      return (
        cliente.CLI_CEDULA.toLowerCase().includes(searchTerm.toLowerCase()) &&
        cliente.CLI_CEDULA !== "9999999999"
      );
    });

    const clientesActivos = filteredClientes.filter(
      (cliente) => cliente.CLI_ESTADO === "Activo"
    );
    const clientesInactivos = filteredClientes.filter(
      (cliente) => cliente.CLI_ESTADO === "Inactivo"
    );

    const clientesOrdenados = [...clientesActivos, ...clientesInactivos];

    return (
      <table className="centrar-tabla">
        <thead>
          <tr>
            <th>CEDULA</th>
            <th>NOMBRE</th>
            <th>EMAIL</th>
            <th>CONTACTO</th>
            <th>DIRECCION</th>
            <th>FECHA DE NACIMIENTO</th>
            <th>ESTADO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {clientesOrdenados.map((cliente, index) => (
            <tr
              key={cliente.CLI_ID}
              style={
                cliente.CLI_ESTADO === "Inactivo"
                  ? { backgroundColor: "pink" }
                  : {}
              }
            >
              <td> {cliente.CLI_CEDULA} </td>
              <td>
                {cliente.CLI_PRIMERAPELLIDO}{" "}
                {cliente.CLI_SEGUNDOAPELLIDO ? cliente.CLI_SEGUNDOAPELLIDO : ""}{" "}
                {cliente.CLI_PRIMERNOMBRE}{" "}
                {cliente.CLI_SEGUNDONOMBRE ? cliente.CLI_SEGUNDONOMBRE : ""}
              </td>
              <td> {cliente.CLI_EMAIL} </td>
              <td> {cliente.CLI_CONTACTO} </td>
              <td> {cliente.CLI_DIRECCION} </td>
              <td>
                {cliente.CLI_FECNACIMIENTO
                  ? new Date(cliente.CLI_FECNACIMIENTO).toLocaleDateString(
                      "es-ES"
                    )
                  : ""}
              </td>
              <td> {cliente.CLI_ESTADO} </td>
              <td>
                <button
                  onClick={() => {
                    localStorage.setItem("id", cliente.CLI_ID);
                    getClienteById();
                    setEditShowModal(true);
                  }}
                  className="btn btn-info"
                >
                  <i className="fas fa-edit"></i>
                </button>
                {cliente.CLI_ESTADO === "Activo" && (
                  <button
                    onClick={() => deleteClientes(cliente.CLI_ID)}
                    className="btn btn-warning"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                )}
                {cliente.CLI_ESTADO === "Inactivo" && (
                  <button
                    onClick={() => ActivarClientes(cliente.CLI_ID)}
                    className="btn btn-success"
                  >
                    <i className="fas fa-check"></i>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      {children}
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Buscar Cliente por Cedula"
              onChange={handleSearch}
            />
            <br />
            <div>{renderClientesTabla()}</div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClienteRepository;
