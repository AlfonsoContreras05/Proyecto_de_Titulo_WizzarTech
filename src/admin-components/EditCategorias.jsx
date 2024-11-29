import React, { useState, useEffect,useCallback } from 'react';
import NavBarAdmin from "./navBarAmin";
import DataTable from 'react-data-table-component';
import "../css/StyleHistorial.css";
import TimeoutModal from '../components/modalTime'   // Importa el componente de la modal de inactividad
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la redirección
import { jwtDecode } from "jwt-decode"; // Importa jwt-decode para decodificar el token

function CategoriaManager() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [nuevaCategoria, setNuevaCategoria] = useState({ Nombre: '', Descripcion: '' });
  const navigate = useNavigate();


   // Verificar token JWT
   const verificarToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        navigate('/LoginAdmin');
      }
    } else {
      navigate('/LoginAdmin');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await fetch('http://localhost:5000/api/categorias');
      const data = await response.json();
      setCategorias(data);
    };
    verificarToken();
    fetchCategorias();
  }, [verificarToken]);

  const handleChange = (e, categoria) => {
    const { name, value } = e.target;
    setCategoriaEditando({ ...categoria, [name]: value });
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria({ ...nuevaCategoria, [name]: value });
  };

  const handleSave = async (categoria) => {
    const url = categoria.ID_Categoria
      ? `http://localhost:5000/api/categorias/${categoria.ID_Categoria}`
      : 'http://localhost:5000/api/categorias';
    const method = categoria.ID_Categoria ? 'PUT' : 'POST';

    await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoria),
    });

    recargarCategorias();
  };

  const handleDelete = async (idCategoria) => {
    if (window.confirm('¿Estás seguro de querer eliminar esta categoría?')) {
      await fetch(`http://localhost:5000/api/categorias/${idCategoria}`, {
        method: 'DELETE',
      });

      recargarCategorias();
    }
  };

  const recargarCategorias = async () => {
    const response = await fetch('http://localhost:5000/api/categorias');
    const data = await response.json();
    setCategorias(data);
    setCategoriaEditando(null);
    setNuevaCategoria({ Nombre: '', Descripcion: '' });
  };

  const columnas = [
    {
      name: 'Nombre',
      selector: row => row.Nombre,
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: row => row.Descripcion,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <>
          {categoriaEditando?.ID_Categoria === row.ID_Categoria ? (
            <>
              <button onClick={() => handleSave(categoriaEditando)}>Guardar</button>
              <button onClick={() => setCategoriaEditando(null)}>Cancelar</button>
            </>
          ) : (
            <>
              <button onClick={() => setCategoriaEditando(row)}>Editar</button>
              <button onClick={() => handleDelete(row.ID_Categoria)}>Eliminar</button>
            </>
          )}
        </>
      )
    }
  ];

  const dataConInputs = categorias.map(categoria => {
    if (categoriaEditando?.ID_Categoria === categoria.ID_Categoria) {
      return {
        ...categoria,
        Nombre: (
          <input
            name="Nombre"
            value={categoriaEditando.Nombre}
            onChange={(e) => handleChange(e, categoriaEditando)}
          />
        ),
        Descripcion: (
          <input
            name="Descripcion"
            value={categoriaEditando.Descripcion}
            onChange={(e) => handleChange(e, categoriaEditando)}
          />
        )
      };
    }
    return categoria;
  });

  return (
    <div className='container mt-5 bg-dark-x'>
      <NavBarAdmin />

      <div className='container mt-4 bg-dark-x'>
        <h2>Administrar Categorías</h2>
      </div>
      <DataTable
        columns={columnas}
        data={dataConInputs}
        pagination
        theme="dark"

      // Agrega aquí más propiedades de DataTable si lo necesitas
      />
      <div className="mt-3">
        <h2>Añadir nueva categoría</h2>
        <div className="col-md-5">
          <label>Nombre:</label>
        <input className="form-control bg-dark-x border-0 text-bg-dark"
            name="Nombre"
            value={nuevaCategoria.Nombre}
            onChange={handleNewChange}
        />
        </div>
         
        <div/>
        <div className="col-md-5">
          <label>Descripcion</label>
        <input className="form-control bg-dark-x border-0 text-bg-dark"
          name="Descripcion"
          value={nuevaCategoria.Descripcion}
          onChange={handleNewChange}
        />
        </div>
       
        <div className="col-5 mt-2">
          <button onClick={() => handleSave(nuevaCategoria)} className="button" type="submit">
            <span className="button_lg">
              <span className="button_sl"></span>
              <span className="button_text">Agregar</span>
            </span>
          </button>
        </div>
      </div>
      <TimeoutModal /> {/* Incluir la modal de inactividad */}
    </div>
  );
}

export default CategoriaManager;
