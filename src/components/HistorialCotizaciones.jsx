import React, { useEffect, useState, useMemo, useCallback } from "react";
import NavbarComponent from "./NavbarComponent";
import DataTable from "react-data-table-component";
import "../css/StyleHistorial.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ModalVenta from "./ModalVenta"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import TimeoutModal from './modalTime';

const HistorialCotizaciones = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [filterText, setFilterText] = useState("");
  const idVendedor = localStorage.getItem("idVendedor");

  const [showModal, setShowModal] = useState(false);
  const [selectedCotizacion, setSelectedCotizacion] = useState(null);

  const navigate = useNavigate();

  const verificarTokenYRedirigir = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          // Token ha expirado
          localStorage.removeItem('token');
          navigate('/');
        }
      } catch (error) {
        // En caso de un error (token inválido, etc.)
        console.error('Error al decodificar el token:', error);
        localStorage.removeItem('token');
        navigate('/');
      }
    } else {
      // No hay token
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    verificarTokenYRedirigir();
  }, [verificarTokenYRedirigir]);

  const actualizarCotizaciones = async () => {
    try {
      const url = `http://localhost:5000/api/cotizaciones-vendedor/${idVendedor}`;
      const respuesta = await fetch(url);
      if (respuesta.ok) {
        const data = await respuesta.json();
        const cotizacionesFiltradas = data.filter(cot => cot.Estado !== "Pagado");
        setCotizaciones(cotizacionesFiltradas);
      } else {
        console.error("Error al recargar las cotizaciones");
      }
    } catch (error) {
      console.error("Error al cargar las cotizaciones:", error);
    }
  };

  // Función para calcular el tiempo restante
  useEffect(() => {
    if (!idVendedor) {
      console.error("ID del vendedor no encontrado");
      return;
    }

    const cargarCotizaciones = async () => {
      try {
        const url = `http://localhost:5000/api/cotizaciones-vendedor/${idVendedor}`;
        const respuesta = await fetch(url);
        if (respuesta.ok) {
          const data = await respuesta.json();
          const cotizacionesFiltradas = data.filter(cot => cot.Estado !== "Pagado").map((cot) => {
            // Utiliza el estado y las horas transcurridas de la API
            return {
              ...cot,
              TiempoRestante: cot.HorasTranscurridas <= 48 ? `${48 - cot.HorasTranscurridas}h restantes` : "Expirado"
            };
          });

          setCotizaciones(cotizacionesFiltradas);
        }
      } catch (error) {
        console.error("Error al cargar las cotizaciones:", error);
      }
    };

    cargarCotizaciones();

    const headerElement = document.querySelector("header.sc-dIUfKc.goZmTm");

    // Verifica si el elemento se encontró antes de intentar quitar la clase
    if (headerElement) {
      // Quita la clase "goZmTm"
      headerElement.classList.remove("goZmTm");
    }
  }, [idVendedor]);

  
  const columnas = [
    {
      name: "ID Cotización",
      selector: (row) => row.ID_Cotizacion,
      sortable: true,
    },
    {
      name: "Cantidad de Productos",
      selector: (row) => row.Productos.split(",").length,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => `$${row.total.toFixed(0)}`,
      sortable: true,
    },
    {},
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <button onClick={() => handleVerCotizacion(row.ID_Cotizacion)}>
            Ver
          </button>
          <button onClick={() => handleDescargarCotizacion(row.ID_Cotizacion)}>
            Descargar
          </button>
          <button 
            onClick={() => handleComprarCotizacion(row)}
            disabled={row.Estado === 'Expirado'} // Deshabilita si el estado es 'Expirado'
          >
            Comprar
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {},
    {
      name: "Estado",
      selector: (row) => row.Estado,
      sortable: true,
    },
    {
      name: "Tiempo Restante",
      selector: (row) => `(${row.TiempoRestante})`,
      sortable: true,
    },
  ];

  const filteredItems = cotizaciones.filter(
    (item) =>
      item.ID_Cotizacion && item.ID_Cotizacion.toString().includes(filterText)
  );

  const subHeaderComponent = useMemo(() => {
    return (
      <input
        type="text"
        placeholder="Buscar Cotización"
        className="dataTable-input"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
    );
  }, [filterText]);

  const handleComprarCotizacion = (cotizacion) => {
    console.log("Total de la cotización:", cotizacion.total);
    setSelectedCotizacion(cotizacion);
    setShowModal(true);
  };
  

  const handleVerCotizacion = async (idCotizacion) => {
    try {
      // Obtener los detalles de la cotización del servidor
      const response = await fetch(
        `http://localhost:5000/api/detalles-cotizacion/${idCotizacion}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los detalles de la cotización");
      }
      const detallesCotizacion = await response.json();
  
      // Crear un nuevo documento PDF
      const doc = new jsPDF();
  
      // Título e información de la factura
      doc.setFontSize(20);
      doc.text("COTIZACION", 150, 20, 'right');
      doc.setFontSize(12);
      doc.text(`Cotizacion Nro: ${idCotizacion}`, 150, 30, 'right');
      // Agregar fecha, fecha de vencimiento, número de cuenta aquí...
  
      // Información del pagador
      doc.text("Informacion De Pago", 20, 50);
      // Agregar detalles de la cuenta aquí...
  
      // Información del destinatario
      doc.text("Cobrar a:", 110, 50);
      // Agregar nombre y dirección de la empresa aquí...
  
      // Tabla de productos
      doc.autoTable({
        startY: 70,
        head: [["NO", "PRODUCT DESCRIPTION", "UNIT PRICE", "QTY", "TOTAL"]],
        body: detallesCotizacion.productos.map((producto, index) => [
          index + 1,
          producto.nombreProducto,
          `$${producto.precioUnitario}`,
          producto.cantidad,
          `$${producto.cantidad * producto.precioUnitario}`
        ]),
      });
             // Calculando sub total
    const subtotal = detallesCotizacion.productos.reduce((total, producto) => {
      return total + (producto.cantidad * producto.precioUnitario);
    }, 0);

    // Calculando IVA (19%)
    const iva = subtotal * 0.19;

    // Calculando total final
    const totalFinal = subtotal + iva;

    // Mostrando los totales
    let finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Sub Total: $${subtotal.toFixed(0)}`, 150, finalY, 'right');
    doc.text(`IVA 19%: $${iva.toFixed(0)}`, 150, finalY + 10, 'right');
    doc.setFontSize(14);
    doc.text(`Total: $${totalFinal.toFixed(0)}`, 150, finalY + 20, 'right');
  
      // Totales y firma
      // Agregar sub total, impuestos y total aquí...
      doc.text("Gracias Por Su Cotizacion", 150, doc.lastAutoTable.finalY + 5, 'right');
      doc.line(100, doc.lastAutoTable.finalY + 25, 200, doc.lastAutoTable.finalY + 25); // Línea para la firma
  
      // Abrir el PDF en una nueva ventana o descargarlo
      doc.output("dataurlnewwindow"); // Para abrir en una nueva ventana
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };
  

  const handleDescargarCotizacion = async (idCotizacion) => {
    try {
      // Obtener los detalles de la cotización del servidor
      const response = await fetch(
        `http://localhost:5000/api/detalles-cotizacion/${idCotizacion}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los detalles de la cotización");
      }
      const detallesCotizacion = await response.json();

      // Crear un nuevo documento PDF
      const doc = new jsPDF();

      // Agregar contenido al PDF (por ejemplo, detalles de la cotización)
      doc.text(`Cotización ID: ${idCotizacion}`, 10, 10);
      // Más contenido...

      // Usar jsPDF-AutoTable para agregar una tabla con los productos
    doc.autoTable({
      startY: 70,
      head: [["NO", "PRODUCT DESCRIPTION", "UNIT PRICE", "QTY", "TOTAL"]],
      body: detallesCotizacion.productos.map((producto, index) => [
        index + 1,
        producto.nombreProducto,
        `$${producto.precioUnitario}`,
        producto.cantidad,
        `$${producto.cantidad * producto.precioUnitario}`
      ]),
    });

      // Abrir el PDF en una nueva ventana o descargarlo
      //doc.output('dataurlnewwindow'); // Para abrir en una nueva ventana
      doc.save(`cotizacion-${idCotizacion}.pdf`); // Para descargar
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  /*  const handleComprarCotizacion = (idCotizacion) => {
    console.log("Comprar cotización:", idCotizacion);
    // Aquí añadir la lógica para manejar la compra de la cotización
  };*/

  return (
    <div className="bg-dark">
      <div className="historial-container bg-black mt-5">
        <NavbarComponent />
        <div className="container historial-content">
          <h2>Historial de Cotizaciones</h2>
          <DataTable
            columns={columnas}
            data={filteredItems}
            subHeader
            subHeaderComponent={subHeaderComponent}
            persistTableHead
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
          {showModal && (
            <ModalVenta
              cotizacion={selectedCotizacion}
              onClose={() => setShowModal(false)}
              onPagoExitoso = {actualizarCotizaciones}
            />
          )}
        </div>
      </div>
      <TimeoutModal />
    </div>
  );
};

export default HistorialCotizaciones;
