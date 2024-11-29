import React, { useState } from "react";
import "./styleLogin.css";
import image from "../img/DR.png"; // Asegúrate de que la ruta es correcta
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginVendedor = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMensaje, setErrorMensaje] = useState("");
  const [exitoMensaje, setExitoMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json(); // Obtener datos de la respuesta, incluyendo el token y el ID del vendedor
        console.log("Token recibido:", data.token); // Verificar el token recibido

        // Almacenar el token JWT y la información del vendedor en el almacenamiento local
        localStorage.setItem("token", data.token); // Asegúrate de que el servidor envía el token en esta respuesta
        localStorage.setItem("userSession", email);
        localStorage.setItem("idVendedor", data.vendedor.ID_Vendedor);

        setExitoMensaje("Inicio de sesión exitoso. Redirigiendo...");

        // Redirigir al usuario después de un breve retraso
        setTimeout(() => {
          const storedToken = localStorage.getItem("token");
          console.log("Token almacenado:", storedToken); // Verificar el token almacenado
          navigate("/Inicio");
        }, 2000);
      } else {
        setErrorMensaje(
          "Error en el inicio de sesión. Por favor, intenta de nuevo."
        );
        setTimeout(() => setErrorMensaje(""), 3000); // Ocultar mensaje después de 3 segundos
      }
    } catch (error) {
      console.error("Hubo un error al enviar la solicitud", error);
      setErrorMensaje(
        "Error en el inicio de sesión. Por favor, intenta de nuevo."
      );
      setTimeout(() => setErrorMensaje(""), 3000); // Ocultar mensaje después de 3 segundos
    }
  };

  return (
    <div className="bg-dark-x">
      <link
        href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;600&display=swap"
        rel="stylesheet"
      />
      <section>
        <div className="row g-0">
          <div className="col-lg-7 d-none d-lg-block">
            <div
              id="carouselExampleSlidesOnly"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item img-1 min-vh-100 active"></div>
                <div className="carousel-item img-2 min-vh-100 "></div>
                <div className="carousel-item img-3 min-vh-100 "></div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 min-vh-100 ">
            <div className="px-lg-5 pt-lg-1 pb-lg-1 p-4 w-100 mb-1 ">
              <img src={image} className="img-fluid" alt="Imagen descriptiva" width="70" height="" />
              
            </div>

            <div className="px-lg-5 py-lg-1 p-4 w-100 align-self-center">
              <h1 className="form-label font-weight-bold mb-4">Bienvenido</h1>
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
                    placeholder="Ingresa tu usuario"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    required
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
                    placeholder="Ingresa tu correo electrónico"
                    id="exampleInputPassword1"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Iniciar sesión
                </button>
              </form>
              {errorMensaje && (
                <div className="alert alert-danger">{errorMensaje}</div>
              )}
              {exitoMensaje && (
                <div className="alert alert-success">{exitoMensaje}</div>
              )}
              <p className="form-label font-weight-bold text-center">
                O inicia sesión como administrador
              </p>
              <div className="d-flex justify-content-around">
                <Link to="/LoginAdmin">
                  <button type="button" className="btn btn-outline-light">
                    Soy administrador
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginVendedor;
