import React, { useState, useCallback, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import ProductSelector from "./ProductSelector";
import ClientDetailsForm from "./ClientDetailsForm";
import "../css/StyleForm.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import TimeoutModal from "./modalTime";

// Llama a startAnimation en el método handleSubmit justo después de enviar la cotización

const FormularioCotizacion = () => {
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    direccion: "",
    correo: "",
    celular: "",
  });
  const [componentesSeleccionados, setComponentesSeleccionados] = useState([]);
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

  useEffect(() => {
    if (mensaje.texto) {
      const timer = setTimeout(() => setMensaje({ texto: "", tipo: "" }), 2000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  const navigate = useNavigate();

  const verificarToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        // Token ha expirado
        localStorage.removeItem("token");
        navigate("/");
      }
    } else {
      // No hay token
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    verificarToken();
  }, [verificarToken]);

  const handleClientChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleComponenteSeleccionado = useCallback(
    (nuevoComponente) => {
      if (
        !componentesSeleccionados.find(
          (c) => c.ID_Producto === nuevoComponente.ID_Producto
        )
      ) {
        setComponentesSeleccionados((prev) => [...prev, nuevoComponente]);
      }
    },
    [componentesSeleccionados]
  );

  const totalPrecio = componentesSeleccionados.reduce(
    (total, componente) =>
      total + componente.Precio * (componente.Cantidad || 1),
    0
  );

  const handleEliminarComponente = (idProducto) => {
    setComponentesSeleccionados(
      componentesSeleccionados.filter((c) => c.ID_Producto !== idProducto)
    );
  };

  const handleCambiarCantidad = (idProducto, nuevaCantidad) => {
    setComponentesSeleccionados(
      componentesSeleccionados.map((c) =>
        c.ID_Producto === idProducto
          ? { ...c, Cantidad: Math.max(0, Math.min(nuevaCantidad, c.Stock)) }
          : c
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idVendedor = localStorage.getItem("idVendedor");
    const token = localStorage.getItem("token");

    if (!idVendedor || !token) {
      // No hay ID de vendedor o token, redirigir al login
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/guardar-cotizacion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            cliente,
            productos: componentesSeleccionados.map(
              ({ ID_Producto, Precio }) => ({
                ID_Producto,
                Cantidad: 1,
                Precio,
              })
            ),
            ID_Vendedor: Number(idVendedor),
          }),
        }
      );

      if (response.status === 401) {
        // Token expirado o inválido, redirigir al login
        navigate("/");
        return;
      }

      if (!response.ok) throw new Error("Error al guardar la cotización");

      setMensaje({ texto: "Cotización creada exitosamente", tipo: "success" });
      setCliente({
        nombre: "",
        apellido: "",
        rut: "",
        direccion: "",
        correo: "",
        celular: "",
      });
      setComponentesSeleccionados([]);

      startAnimation();
    } catch (error) {
      console.error("Error al guardar la cotización:", error);
      setMensaje({ texto: "Error al crear la cotización", tipo: "danger" });
    }
  };

  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      window.location.reload();
    }, 10000); // Ajusta este tiempo a la duración de tu animación
  };

  return (
    <div className="BD">
      <div className="bg-black">
        <NavbarComponent />
        <div className="container m-auto d-flex align-items-center justify-content-center">
          <form className="row g-3 mt-4" onSubmit={handleSubmit}>
            <h1 className="mt-5 text-center">Datos del Cliente</h1>
            <ClientDetailsForm
              cliente={cliente}
              onChange={handleClientChange}
            />
            <h1 className="mt-5 text-center">Selecciona Tus Componentes</h1>
            <ProductSelector
              onComponenteSeleccionado={handleComponenteSeleccionado}
            />
            {mensaje.texto && (
              <div className={`alert alert-${mensaje.tipo} mt-3 text-center`}>
                {mensaje.texto}
              </div>
            )}
            <h2>Componentes Seleccionados</h2>
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Descripción</th>
                  <th>Imagen</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {componentesSeleccionados.map((componente, index) => (
                  <tr key={`componente-${componente.ID_Producto}-${index}`}>
                    <td>{componente.Nombre}</td>
                    <td>
                      <input
                        type="number"
                        value={componente.Cantidad || 1}
                        onChange={(e) =>
                          handleCambiarCantidad(
                            componente.ID_Producto,
                            parseInt(e.target.value)
                          )
                        }
                        min="1"
                        max={componente.Stock}
                      />
                    </td>
                    <td>$ {componente.Precio.toFixed(0)}</td>
                    <td>{componente.Descripcion}</td>
                    <td>
                      {componente.ImagenURL && (
                        <img
                          src={`/${componente.ImagenURL}`}
                          //src\img-productos\tarjetagrafica\1.jpg
                          //C:img-productos\tarjetagrafica\1.jpg
                          alt={componente.Nombre}
                          style={{ height: "50px" }}
                        />
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handleEliminarComponente(componente.ID_Producto)
                        }
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                      >
                        &times;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h2>
              Total:{" "}
              {totalPrecio.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </h2>
            <div className="d-flex justify-content-center">
              <button className={`order ${isAnimating ? "animate" : ""}`}>
                <span className="default">Crear Cotización</span>
                <span className="success">
                  Cotización Registrada
                  <svg viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </svg>
                </span>
                <div className="box"></div>
                <div className="truck">
                  <div className="back"></div>
                  <div className="front">
                    <div className="window"></div>
                  </div>
                  <div className="light top"></div>
                  <div className="light bottom"></div>
                </div>
                <div className="lines"></div>
              </button>

              <button
                type="button"
                className="btn btn-outline-light mx-2 mb-5"
                onClick={() => {
                  setComponentesSeleccionados([]);
                  setCliente({
                    nombre: "",
                    apellido: "",
                    rut: "",
                    direccion: "",
                    correo: "",
                    celular: "",
                  });
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
      <TimeoutModal />
    </div>
  );
};

export default FormularioCotizacion;
