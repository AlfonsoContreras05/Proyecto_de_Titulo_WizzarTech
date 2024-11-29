import React, { useState, useEffect } from "react";

const EditVendedorModal = ({ vendedor, onClose, onSave }) => {
  const [nombre, setNombre] = useState(vendedor.Nombre);
  const [apellido, setApellido] = useState(vendedor.Apellido);
  const [Correo_Electronico, setCorreoElectronico] = useState(
    vendedor.Correo_Electronico
  );
  const [Telefono, setTelefono] = useState(vendedor.Telefono);
  const [idSucursal, setIdSucursal] = useState(vendedor.ID_Sucursal || "");
  const [Area_Especializacion, setAreaEspecializacion] = useState(
    vendedor.Area_Especializacion
  );
  const [newPassword, setNewPassword] = useState(""); // Nuevo campo para nueva contraseña
  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    const cargarSucursales = async () => {
      try {
        const respuesta = await fetch("http://localhost:5000/api/sucursales");
        if (respuesta.ok) {
          const datosSucursales = await respuesta.json();
          setSucursales(datosSucursales);
        } else {
          console.error("Error al cargar sucursales:", respuesta);
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
      }
    };

    cargarSucursales();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedVendedor = {
      ID_Vendedor: vendedor.ID_Vendedor, // Asegúrate de incluir el ID del vendedor
      Nombre: nombre,
      Apellido: apellido,
      Correo_Electronico: Correo_Electronico,
      Telefono: Telefono,
      ID_Sucursal: idSucursal,
      Area_Especializacion: Area_Especializacion,
      pass: newPassword ? newPassword : undefined,
    };

    onSave(updatedVendedor);
    setNewPassword(""); // Limpia el campo de la nueva contraseña
  };

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Vendedor</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Mail</label>
                <input
                  type="text"
                  className="form-control"
                  value={Correo_Electronico}
                  onChange={(e) => setCorreoElectronico(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Telefono</label>
                <input
                  type="text"
                  className="form-control"
                  value={Telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Sucursal</label>
                {sucursales.length > 0 ? (
                  <select
                    className="form-control"
                    value={idSucursal}
                    onChange={(e) => setIdSucursal(e.target.value)}
                  >
                    {sucursales.map((sucursal) => (
                      <option
                        key={sucursal.ID_Sucursal}
                        value={sucursal.ID_Sucursal}
                      >
                        {sucursal.Ubicacion}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>Cargando sucursales...</p>
                )}
              </div>

              <div className="form-group">
                <label>Direccion</label>
                <input
                  type="text"
                  className="form-control"
                  value={Area_Especializacion}
                  onChange={(e) => setAreaEspecializacion(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Nueva Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Ingresa una nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              {/* Agrega más campos aquí... */}
              <button type="submit" className="btn btn-success">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVendedorModal;
