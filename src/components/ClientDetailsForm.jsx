// ClientDetailsForm.jsx

import React from 'react';


const ClientDetailsForm = ({ cliente, onChange }) => {
  return (
    <>
      <div className="col-md-6">
        <label htmlFor="inputNombre" className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control bg-dark-x border-0 text-bg-dark"
          id="inputNombre"
          name="nombre"
          value={cliente.nombre}
          onChange={onChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputApellido" className="form-label">Apellido</label>
        <input
          type="text"
          className="form-control bg-dark-x border-0 text-bg-dark"
          id="inputApellido"
          name="apellido"
          value={cliente.apellido}
          onChange={onChange}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputRut" className="form-label">Rut</label>
        <input
          type="text"
          className="form-control bg-dark-x border-0 text-bg-dark"
          id="inputRut"
          name="rut"
          value={cliente.rut}
          onChange={onChange}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputDireccion" className="form-label">Direccion</label>
        <input
          type="text"
          className="form-control bg-dark-x border-0 text-bg-dark"
          id="inputDireccion"
          name="direccion"
          value={cliente.direccion}
          onChange={onChange}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputCorreo" className="form-label">Email</label>
        <input
          type="text"
          className="form-control bg-dark-x border-0 text-bg-dark"
          id="inputCorreo"
          name="correo"
          value={cliente.correo}
          onChange={onChange}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputCelular" className="form-label">Telefono</label>
        <input
          type="text"
          className="form-control bg-dark-x border-0 text-bg-dark"
          id="inputCelular"
          name="celular"
          value={cliente.celular}
          onChange={onChange}
        />
      </div>
      {/* Agrega aquí más campos para los detalles del cliente */}
    </>
  );
};

export default ClientDetailsForm;
