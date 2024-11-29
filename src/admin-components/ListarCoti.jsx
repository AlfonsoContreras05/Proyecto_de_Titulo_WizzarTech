import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import NavBarAdmin from './NavBarAdmin'; // Asegúrate de importar tu NavBar si es necesario

export function ListarCotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([]);

  useEffect(() => {
    const fetchCotizaciones = async () => {
      try {
        const respuesta = await fetch('http://localhost:5000/api/cotizaciones');
        if (respuesta.ok) {
          const datos = await respuesta.json();
          setCotizaciones(datos);
        } else {
          console.error('Error al cargar cotizaciones:', respuesta);
        }
      } catch (error) {
        console.error('Error al conectar con el servidor:', error);
      }
    };

    fetchCotizaciones();
  }, []);

  const columnas = [
    // Define las columnas basadas en los datos de las cotizaciones
    {
      name: 'ID',
      selector: row => row.ID_Cotizacion,
    },
    {
      name: 'Vendedor',
      selector: row => row.NombreVendedor, // Asegúrate de que estos campos existan en tus datos
    },
    // Más columnas aquí...
  ];

  return (
    <div className="container mt-5">
      <NavBarAdmin />
      <h2>Listado de Cotizaciones</h2>
      <DataTable
        columns={columnas}
        data={cotizaciones}
        // Personaliza el estilo si es necesario
      />
    </div>
  );
}

export default ListarCotizaciones;
