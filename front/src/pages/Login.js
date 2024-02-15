import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthSingleton from "./ProveedorSingleton";
const Login = () => {
  useEffect(() => {
    document.title = "LOGIN"
    
});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();

    // Aquí puedes realizar la validación de las credenciales

    if ((username === "admin" && password === "password") || (username === "admin1" && password === "password1")) {
      setIsLoggedIn(true);
      localStorage.setItem("username", username);
      localStorage.setItem("role", username === "admin" ? "admin" : "admin1"); // Almacenar el rol
    } else {
      alert("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  } else {
    
    return (
      <div style={{ marginTop:"45px",display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "55px" }}>
        <h2>TIENDITA</h2>
        <h2>LOGIN</h2>
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "300px",
            margin: "20px 0",
            padding: "40px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.9)"
          }}
        >
          <label>Usuario:</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Ingrese el usuario"
            style={{
              textAlign: "center",
              padding: "7px 10px",
              borderRadius: "5px",
              marginTop: "10px",
              marginBottom: "10px",
              
            }}
            onChange={handleInputChange}
            required
          />

          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            placeholder="Ingrese la contraseña"
            style={{
              textAlign: "center",
              padding: "7px 10px",
              borderRadius: "5px",
              marginTop: "7px",
              marginBottom: "10px",
              
            }}
            value={password}
            onChange={handleInputChange}
            required
          />

          <button
            type="submit"
            className="custom-button"
            style={{
              
              padding: "10px 20px",
              borderRadius: "5px",
              marginTop: "10px",
            }}
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    );
  }
};

export default Login;
