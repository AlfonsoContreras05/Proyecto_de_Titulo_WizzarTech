import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom';

const TimeoutModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(120); // 1 minutos = 60 segundos
  const navigate = useNavigate();

  const handleInactivity = useCallback(() => {
    setShowModal(true);
    setCountdown(120); // Reiniciar el contador
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    let timeoutId;
    let countdownId;

    if (showModal) {
      countdownId = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(countdownId);
            handleLogout();
          }
          return prevCount - 1;
        });
      }, 1000);
    }

    const events = ['click', 'mousemove', 'keypress'];
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleInactivity, 60000);
    };

    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timeoutId);
      clearInterval(countdownId);
    };
  }, [showModal, handleInactivity, handleLogout]);

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton style={{ backgroundColor: '#343a40', color: 'white' }}>
        <Modal.Title>Inactividad detectada</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#343a40', color: 'white' }}>
        Parece que has estado inactivo. Serás redirigido al inicio de sesión en {countdown} segundos.
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#343a40', justifyContent: 'center' }}>
        <Button variant="secondary" onClick={handleClose}>
          Continuar
        </Button>
        <Button variant="primary" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TimeoutModal;
