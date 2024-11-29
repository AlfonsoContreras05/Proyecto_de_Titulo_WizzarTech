import React, { useState } from "react";
import "../css/styleLogin.css";
import image from "../img/DR.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";

const LoginAdministrador = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login-adm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log("Token recibido:", data.token); // Mostrar el token en la consola
        localStorage.setItem("token", data.token); // Guardar el token en el almacenamiento local
        window.location.href = "/InicioAdmin"; // Redirigir al administrador a la vista de inicio
      } else {
        console.error("Respuesta del servidor:", response.status, data); // Mostrar error de respuesta del servidor
        setError("Credenciales incorrectas"); // Mostrar mensaje de error de credenciales incorrectas
      }
    } catch (error) {
      console.error("Error en la solicitud fetch:", error); // Mostrar error en la consola
      setError("Ha ocurrido un error al intentar iniciar sesión"); // Mostrar mensaje de error genérico
    }
  };

  return (
    <section className="bg-dark-x">
      <link
        href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;600&display=swap"
        rel="stylesheet"
      />
      <div className="row g-0">
        <div className="col-lg-5 min-vh-100 ">
          <div className="px-lg-5 pt-lg-4 pb-lg-3 p-4 w-100 mb-auto  ">
            <img
              src={image}
              className="img-fluid mirrored-image "
              alt="Imagen descriptiva"
              width="70"
              height=""
            />
          </div>
          <div className="px-lg-5 py-lg-4 p4 w-100 align-self-center">
            <h1 className="font-weight-bold mb-4">Bienvenido Administrador</h1>
            <form className="mb-5" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label font-weight-bold"
                >
                  Usuario
                </label>
                <input
                  type="email"
                  className="form-control bg-dark-x border-0 text-bg-dark"
                  placeholder="Ingresa tu correo electrónico"
                  id="inputEmail"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label font-weight-bold"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control bg-dark-x border-0 mb-2 text-bg-dark"
                  placeholder="Ingresa tu contraseña"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Iniciar sesión
              </button>
            </form>
            {error && <p className="text-danger">{error}</p>}
            <p className="form-label font-weight-bold text-center">
              O inicia sesión como vendedor
            </p>
            <div className="d-flex justify-content-around">
              <Link to="/LoginVendedor">
                <button type="button" className="btn btn-outline-light">
                  Soy vendedor
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-7 d-none d-lg-block">
          <div
            id="carouselExampleSlidesOnly"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item img-1 min-vh-100 active"></div>
              <div className="carousel-item img-2 min-vh-100"></div>
              <div className="carousel-item img-3 min-vh-100"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginAdministrador;
