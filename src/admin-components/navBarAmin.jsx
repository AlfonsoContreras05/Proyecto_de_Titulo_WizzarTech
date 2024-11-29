import React from "react";
import "../css/StyleMenu.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
import image from "../img/pngwing.com12.png";
import image2 from '../img/klipartz.com.png';
import image3 from '../img/pngwing.com (13).png';
import image4 from '../img/pngegg (5).png';
import image5 from '../img/pngegg (4).png';
import image6 from '../img/GundamX.png';
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg--dark fixed-top ">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src={image}
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          WizardTech
        </a>

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
          <div className="offcanvas-header" data-bs-theme="dark">
            <a className="navbar-brand" href="/">
              <img
                src={image}
                alt="Logo"
                width="30"
                height="24"
                className="d-inline-block align-text-top"
              />
              WizardTech
            </a>
            <button
              className="btn-close"
              type="button"
              aria-label="Close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>

          <div className="offcanvas-body d-flex flex-column justify-content-between px-0 bg-dark" />
          <ul className="navbar-nav fs-6 justify-content-evenly">
            <li className="nav-item p-3 py-md-1">
              <a href="/InicioAdmin" className="nav-link">
                INICIO
              </a>
            </li>
            <li className="nav-item p-3 py-md-1">
              <a href="/LVendedores" className="nav-link">
                VENDEDORES
              </a>
            </li>
            <li className="nav-item p-3 py-md-1">
              <a href="/RUsuario" className="nav-link">
                NUEVO VENDEDOR{" "}
                <img
                  src={image2}
                  alt="mas"
                  width="15"
                  height="15"
                />
              </a>
            </li>
            <li className="nav-item p-3 py-md-1">
              <a href="/LCotizaciones" className="nav-link">
                COTIZACIONES
              </a>
            </li>
            <li className="nav-item p-3 py-md-1">
              <a href="/LCotizaciones" className="nav-link">
                TOTALIZADOS
              </a>
            </li>

            <li className="nav-item p-3 py-md-1">
              <a href="/ProductList" className="nav-link">
                PRODUCTOS
              </a>
            </li>

            <li className="nav-item p-3 py-md-1">
              <a href="/ECategorias" className="nav-link">
                CATEGORIAS
              </a>
            </li>

            <li className="nav-item p-3 py-md-1">
              <a href="/" className="nav-link">
                CERRAR SESION
              </a>
            </li>
          </ul>

          <div className="d-lg-none align-self-center py-3">
            <a className="navbar-brand" href="/">
              <img src={image6} alt="Logo" width="40" height="40" />
            </a>
            <a className="navbar-brand" href="/">
              <img
                src={image5}
                alt="Logo"
                width="40"
                height="40"
              />
            </a>
            <a className="navbar-brand" href="/">
              <img
                src={image4}
                alt="Logo"
                width="40"
                height="40"
              />
            </a>
            <a className="navbar-brand" href="/">
              <img
                src={image3}
                alt="Logo"
                width="40"
                height="40"
              />
            </a>

            {/* ... lista de elementos de navegación ... */}

            <div className="d-lg-none align-self-center py-3">
              {/* ... enlaces con iconos ... */}
            </div>
          </div>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
