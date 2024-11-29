import React, { useState, useEffect } from 'react';

const ProcesarVenta = ({ idCotizacion }) => {
  const [cotizacion, setCotizacion] = useState(null);
  const [metodoPago, setMetodoPago] = useState('');

  useEffect(() => {
    // Aquí se debe cargar los detalles de la cotización
    const cargarDetallesCotizacion = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/detalles-cotizacion/${idCotizacion}`);
        if (!response.ok) {
          throw new Error("Error al obtener los detalles de la cotización");
        }
        const detalles = await response.json();
        setCotizacion(detalles);
      } catch (error) {
        console.error("Error al cargar detalles de la cotización:", error);
      }
    };

    cargarDetallesCotizacion();
  }, [idCotizacion]);

  const handleMetodoPagoChange = (e) => {
    setMetodoPago(e.target.value);
  };

  const procesarVenta = () => {
    // Aquí se implementaría la lógica para procesar la venta
    console.log("Procesando venta con el método de pago:", metodoPago);
  };

  if (!cotizacion) {
    return <div>Cargando detalles de la cotización...</div>;
  }

  return (
    <div>
      <h2>Procesar Venta</h2>
      <div>
        {/* Aquí se pueden mostrar los detalles de la cotización */}
      </div>
      <div>
        <label>
          Método de Pago:
          <select value={metodoPago} onChange={handleMetodoPagoChange}>
            <option value="">Selecciona un método</option>
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="paypal">PayPal</option>
          </select>
        </label>
      </div>
      <button onClick={procesarVenta}>Confirmar Venta</button>
    </div>
  );
};

export default ProcesarVenta;
