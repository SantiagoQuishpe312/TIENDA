import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/InformeVentas.css";
import { useNavigate } from "react-router-dom";

const InformeVentas = () => {
  const navegate = useNavigate();
  const url = "http://localhost:5000/impresionFactura/informe-ventas/";
  const [datos, setDatos] = useState([""]);
  const fechaInicio = localStorage.getItem("inicio");
  const fechaFinal = localStorage.getItem("final");

  const getTotalFactura = async (inicio, final) => {
    try {
      const res = await axios.get(url + inicio + "/" + final);
      setDatos(res.data);
      console.log(inicio);
      console.log(final);
      console.log(datos);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    getTotalFactura(fechaInicio, fechaFinal);
  }, []);

  return (
    <div className="informe-container">
      {datos && datos[0] ? (
        <div className="informe-content">
          <h1 className="informe-heading">Informe de Ventas</h1>
          <p>
            Desde la fecha {fechaInicio} hasta {fechaFinal}
          </p>
          <h3 className="ventas-heading">
            Total de ventas realizadas: {datos[0].CANTIDAD}
          </h3>
          <img
            src="images/ventasTotales.svg"
            alt="Imagen de ventas"
            className="ventas-image"
            style={{
              marginTop: "15px",
              width: "60%",
              padding: "6px 20px",
             
            }}
          />
          <h4 className="total-sum">Suma total: ${datos[0].TOTAL}</h4>
          <button
            type="button"
            className="custom-button"
            onClick={(e) => navegate("/registro-factura")}
          >
            Regresar
          </button>
        </div>
      ) : (
        <div className="informe-content">
          <p>No se encontraron facturas</p>
          <img
            src="images/ventasTotales.svg"
            alt="Imagen de ventas"
            className="ventas-image"
          />
          <button
            type="button"
            className="custom-button"
            onClick={(e) => navegate("/registro-factura")}
          >
            Regresar
          </button>
        </div>
      )}
    </div>
  );
};

export default InformeVentas;
