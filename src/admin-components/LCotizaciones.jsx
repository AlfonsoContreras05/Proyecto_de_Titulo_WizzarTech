import React, { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import NavBarAdmin from "./navBarAmin";
import TimeoutModal from '../components/modalTime'   // Importa el componente de la modal de inactividad
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la redirección
import { jwtDecode } from "jwt-decode"; // Importa jwt-decode para decodificar el token

const ListarCotizaciones = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const navigate = useNavigate();

  const verificarToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        // Token ha expirado
        localStorage.removeItem("token");
        navigate('/LoginAdmin'); // Redirige al login del administrador
      }
    } else {
      // No hay token
      navigate('/LoginAdmin');
    }
  }, [navigate]);

  useEffect(() => {
    verificarToken();
    const fetchCotizaciones = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/LCotizaciones");
        const data = await response.json();
        setCotizaciones(data);
      } catch (error) {
        console.error("Error al obtener las cotizaciones:", error);
      }
    };

    fetchCotizaciones();
  }, [verificarToken]);

  const columnas = [
    {
      name: "ID Cotización",
      selector: (row) => row.ID_Cotizacion,
      sortable: true,
    },
    { name: "Fecha", selector: (row) => row.Fecha_Cotizacion, sortable: true },
    { name: "Estado", selector: (row) => row.Estado, sortable: true },
    { name: "ID Vendedor", selector: (row) => row.ID_Vendedor, sortable: true },
    {
      name: "Nombre Vendedor",
      selector: (row) => `${row.NombreVendedor} ${row.ApellidoVendedor}`,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <button onClick={() => row.ID_Cotizacion}>Editar</button>
          <button onClick={() => row.ID_Cotizacion}>Eliminar</button>
        </>
      ),
    },
    // Agrega aquí más columnas si lo necesitas
  ];

  return (
    <div>
      <div className="container mt-5">
        <NavBarAdmin />
      </div>
      <div className=" ">
        <div className="container mt-3">
          <h2>Listado de Cotizaciones</h2>
          <DataTable
            columns={columnas}
            data={cotizaciones}
            persistTableHead
            pagination
            theme="dark"
            customStyles={{
              headRow: {
                style: {
                  backgroundColor: "#16191c", // Color de fondo de la cabecera
                  color: "#fff", // Color de texto
                  "&:hover": {
                    backgroundColor: "#2c3038", // Color de fondo al pasar el mouse
                  },
                },
              },
              rows: {
                style: {
                  backgroundColor: "#282c34", // Color de fondo de las filas
                  color: "#fff", // Color de texto
                  "&:hover": {
                    backgroundColor: "#2c3038", // Color de fondo al pasar el mouse
                  },
                },
              },
            }}
          />
        </div>
      </div>
      <TimeoutModal /> {/* Incluir la modal de inactividad */}
    </div>
  );
};

export default ListarCotizaciones;
