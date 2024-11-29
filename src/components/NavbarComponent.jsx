import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importar Link desde react-router-dom
import logo from "../img/pngwing.com12.png"; // Asegúrate de que la ruta sea correcta
//import image from "../img/pngwing.com12.png"; // Asegúrate de que la ruta es correcta
import imageM from "../img/klipartz.com.png";
import { useNavigate } from "react-router-dom";
const NavbarComponent = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const toggleNav = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userSession"); // Eliminar la sesión del almacenamiento local
    navigate("/"); // Redirigir al inicio de sesión
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg--dark fixed-top">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" onClick={toggleNav}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link className="navbar-brand" href="/">
          <img
            src={logo}
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          WizardTech
        </Link>

        <section
          className={`offcanvas offcanvas-start ${isNavExpanded ? "show" : ""}`}
          id="menuLateral"
        >
          <div className="offcanvas-header" data-bs-theme="dark">
            <button
              className="btn-close"
              type="button"
              aria-label="Close"
              onClick={toggleNav}
            ></button>
          </div>

          <div className="offcanvas-body d-flex flex-column justify-content-between px-0 bg--dark">
            <ul className="navbar-nav fs-6 justify-content-evenly">
              <li className="nav-item p-3 py-md-1">
                <Link to="/Inicio" className="nav-link">
                  INICIO
                </Link>
              </li>

              <li className="nav-item p-3 py-md-1">
                <Link to="/FormularioCoti" className="nav-link">
                  CREAR COTIZACION{" "}
                  <img src={imageM} alt="mas" width="15" height="15" />{" "}
                </Link>
              </li>

              <li className="nav-item p-3 py-md-1">
                <Link to="/HistorialVentas" className="nav-link">
                  HISTORIAL
                </Link>
              </li>

              {/* <li className="nav-item p-3 py-md-1">
                <Link to="/" className="nav-link">
                  TOTALIZADO
                </Link>
              </li> */}
{/* 
              <li className="nav-item p-3 py-md-1">
                <Link to="/Venta" className="nav-link">
                  VENTA
                </Link>
              </li> */}
              
              <li className="nav-item p-3 py-md-1">
                <a
                  href="/"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault(); // Prevenir recarga de página
                    handleLogout(); // Llamar a la función de cierre de sesión
                  }}
                >
                  CERRAR SESION
                </a>
              </li>
            </ul>
            {/* Más elementos del menú */}

            {/* Iconos responsivos */}
          </div>
        </section>
      </div>
    </nav>
  );
};

export default NavbarComponent;
