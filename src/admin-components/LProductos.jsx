import React, { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import NavBArAdm from "./navBarAmin";
import TimeoutModal from '../components/modalTime'   // Importa el componente de la modal de inactividad
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la redirección
import { jwtDecode } from "jwt-decode"; // Importa jwt-decode para decodificar el token

const ProductList = () => {
  const [products, setProducts] = useState([]);
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
    fetchProducts();
  }, [verificarToken]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
      });
      fetchProducts(); // Recargar la lista de productos
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.Nombre,
      sortable: true,
    },
    {
      name: "Descripcion",
      selector: (row) => row.Descripcion,
      sortable: true,
    },
    {
      name: "Precio",
      selector: (row) => row.Precio,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.Stock,
      sortable: true,
    },
    {
      name: "Acciones",
      button: true,
      cell: (row) => (
        <>
          <button
            onClick={() => {
              /* Código para abrir el formulario de edición */
            }}
          >
            Editar
          </button>
        </>
      ),
    },
    {
      name: "Acciones",
      button: true,
      cell: (row) => (
        <>
          <button onClick={() => deleteProduct(row.ID_Producto)}>
            Eliminar
          </button>
        </>
      ),
    },
  ];

  return (
    <div>
      <NavBArAdm />
      <DataTable
        title="Lista de Productos"
        columns={columns}
        data={products}
        persistTableHead
        pagination
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
           <TimeoutModal /> {/* Incluir la modal de inactividad */}
    </div>
  );
};

export default ProductList;
