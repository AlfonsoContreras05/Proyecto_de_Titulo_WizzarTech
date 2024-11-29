// ConfirmDeleteModal.jsx
import React, { useState } from 'react';

const ConfirmDeleteModal = ({ onClose, onConfirm, vendedor }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(vendedor.ID_Vendedor, password);
  };

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar Eliminación</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>¿Estás seguro de que deseas eliminar al vendedor {vendedor.Nombre} {vendedor.Apellido}?</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Contraseña del Administrador</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-danger">Eliminar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
