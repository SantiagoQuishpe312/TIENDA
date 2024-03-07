import React from "react";
import ClienteValidacion from "./ClienteValidacion";
import ClienteRepository from "./ClienteRepository";

const ClienteRegistro = () => {
  return (
    <ClienteRepository>
      <ClienteValidacion />
    </ClienteRepository>
  );
};

export default ClienteRegistro;



