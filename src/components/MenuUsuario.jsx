import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/StyleMenu.css"; // Asegúrate de que la ruta sea correcta
import image from "../img/pngwing.com12.png"; // Asegúrate de que la ruta es correcta
import imageM from "../img/klipartz.com.png";
const MenuUsuario = () => {
  return (
    <div className="bg-dark">
      {" "}
      {/* Esto aplicará el fondo oscuro a todo el contenido */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={image}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            WizardTech
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#menuLateral"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <section
            className="offcanvas offcanvas-start"
            id="menuLateral"
            tabIndex="-1"
          >
            <div className="offcanvas-body d-flex flex-column justify-content-between px-0 bg-dark">
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
                  <Link to="/HistorialVenta" className="nav-link">
                    HISTORIAL
                  </Link>
                </li>
                <li className="nav-item p-3 py-md-1">
                  <Link to="/" className="nav-link">
                    TOTALIZADOS
                  </Link>
                </li>
                <li className="nav-item p-3 py-md-1">
                  <Link to="/" className="nav-link">
                    CERRAR SESION
                  </Link>
                </li>
              </ul>
              {/* Más elementos del menú */}

              {/* Iconos responsivos */}
            </div>
          </section>
        </div>
      </nav>
    </div>
  );
};
export default MenuUsuario;
