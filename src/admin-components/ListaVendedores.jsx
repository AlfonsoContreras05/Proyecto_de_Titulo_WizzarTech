import React, { useState, useEffect, useMemo, useCallback } from "react";
import NavBArAdm from "./navBarAmin";
import DataTable from "react-data-table-component";
import "../css/StyleHistorial.css";
import EditModal from "./EditVendedorModal";
import ConfirmDeleteModal from "./EliminarCotizacion";
import TimeoutModal from '../components/modalTime'   // Importa el componente de la modal de inactividad
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la redirección
import { jwtDecode } from "jwt-decode"; // Importa jwt-decode para decodificar el token


export function ListarVendedores() {
  const [vendedores, setVendedores] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVendedor, setSelectedVendedor] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedVendedorToDelete, setSelectedVendedorToDelete] = useState(null);

  const navigate = useNavigate();

  const verificarToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        // Token ha expirado
        localStorage.removeItem("token");
        navigate('/login-admin'); // Redirige al login del administrador
      }
    } else {
      // No hay token
      navigate('/login-admin');
    }
  }, [navigate]); // Agrega navigate como dependencia

  useEffect(() => {
    verificarToken();
    cargarVendedores();
  }, [verificarToken]); // Solo depende de verificarToken



  const cargarVendedores = async () => {
    const token = localStorage.getItem("token");
    try {
      const respuesta = await fetch("http://localhost:5000/api/vendedores-admin", {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (respuesta.ok) {
        const datos = await respuesta.json();
        setVendedores(datos);
      } else {
        console.error("Error al cargar vendedores:", respuesta);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  const handleEdit = (vendedor) => {
    setSelectedVendedor(vendedor);
    setIsEditModalOpen(true);
  };

  const handleSave = async (updatedVendedor) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/vendedores/${updatedVendedor.ID_Vendedor}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedVendedor),
        }
      );

      if (response.ok) {
        alert("Vendedor actualizado con éxito");
        cargarVendedores();
      } else {
        alert("Error al actualizar el vendedor");
      }
    } catch (error) {
      console.error("Error al actualizar el vendedor:", error);
      alert("Error al conectar con el servidor");
    }
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = (vendedor) => {
    setSelectedVendedorToDelete(vendedor);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async (idVendedor, adminPassword) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/vendedoresD/${idVendedor}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ adminPassword }),
        }
      );

      if (response.ok) {
        alert("Vendedor eliminado con éxito");
        cargarVendedores(); // Recargar la lista de vendedores
      } else {
        const errorText = await response.text();
        alert(errorText);
      }
    } catch (error) {
      console.error("Error al eliminar el vendedor:", error);
      alert("Error al conectar con el servidor");
    }

    setIsConfirmModalOpen(false);
  };

  const filteredItems = vendedores.filter(
    (item) =>
      item.ID_Vendedor && item.ID_Vendedor.toString().includes(filterText)
  );

  const subHeaderComponent = useMemo(
    () => (
      <input
        type="text"
        placeholder="Buscar Cotización"
        className="dataTable-input"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
    ),
    [filterText]
  );

  const columnas = [
    {
      name: "ID",
      sortable: true,
      selector: (row) => row.ID_Vendedor,
    },
    {
      name: "Nombre",
      sortable: true,
      selector: (row) => row.Nombre,
    },
    {
      name: "Apellido",
      sortable: true,
      selector: (row) => row.Apellido,
    },
    {
      name: "Correo Electrónico",
      sortable: true,
      selector: (row) => row.Correo_Electronico,
    },
    {
      name: "Teléfono",
      sortable: true,
      selector: (row) => row.Telefono,
    },
    {
      name: "Sucursal",
      sortable: true,
      // Asegúrate de que los datos de la sucursal se pueden mapear correctamente
      selector: (row) => `Sucursal ${row.ID_Sucursal}`,
    },
    {
      name: "Direccion",
      sortable: true,
      selector: (row) => row.Area_Especializacion,
    },
    {
      name: "Contraseña",
      sortable: true,
      selector: (row) => row.pass,
     // selector: (row) => ("*****")
    },
    {
      name: "Total de Ventas",
      selector: (row) => row.TotalVentas,
      sortable: true,
      format: (row) => {
        const totalVentas = parseFloat(row.TotalVentas); // Convierte a número flotante
        return totalVentas ? `$${totalVentas.toFixed(0)}` : "$0.00"; // Formatea a moneda
      },
    },

    {
      name: "Acciones",
      button: true,
      cell: (row) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
          <button
            className="btn btn-primary btn-custom"
            onClick={() => handleEdit(row)} // Cambia esto para pasar el objeto row completo
          >
            Editar
          </button>
        </div>
      ),
    },
    {
      name: "Acciones",
      button: true,
      cell: (row) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
          <button
            className="btn btn-danger btn-custom"
            onClick={() => handleDeleteClick(row)}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  const paginacionopcion = {
    rowsPerPageText: "Filas por pagina",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="container mt-5">
      <div className="">
        <NavBArAdm />
        <div className="table table-dark table-striped mt-5">

          <h2>Listado de Vendedores</h2>
          <DataTable
            columns={columnas}
            data={filteredItems}
            subHeader
            subHeaderComponent={subHeaderComponent}
            pagination
            paginationComponentOptions={paginacionopcion}
            fixedHeader
            fixedHeaderScrollHeight="600px"
            theme="dark"
            customStyles={{
              headRow: {
                style: {
                  backgroundColor: "#16191c",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#2c3038" },
                },
              },
              rows: {
                style: {
                  backgroundColor: "#282c34",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#2c3038" },
                },
              },
            }}
          />
          {isEditModalOpen && (
            <EditModal
              vendedor={selectedVendedor}
              onClose={() => setIsEditModalOpen(false)}
              onSave={handleSave}
            />
          )}
          {isConfirmModalOpen && (
            <ConfirmDeleteModal
              onClose={() => setIsConfirmModalOpen(false)}
              onConfirm={handleConfirmDelete}
              vendedor={selectedVendedorToDelete}
            />
          )}
        </div>
      </div>
      <TimeoutModal /> {/* Incluye el componente de la modal de inactividad */}
    </div>
  );
}

export default ListarVendedores;
