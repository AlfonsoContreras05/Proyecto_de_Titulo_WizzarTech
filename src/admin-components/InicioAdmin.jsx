import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CResumen from "./CResumen";
import NavBarAdmin from "./navBarAmin";
import GraficoBarra from "./CGraficoBarra";
import GraficoLineas from './GrafLineas';
import TimeoutModal from '../components/modalTime'; // Importa la modal de inactividad
import { jwtDecode } from "jwt-decode"; // Importa jwt-decode para decodificar el token

class MiComponente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // estadoInicial: valorInicial
    };
  }

  componentDidMount() {
    this.verificarToken();
  }

  verificarToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          // Token ha expirado, redirigir al login
          localStorage.removeItem('token');
          window.location.href = '/';
        }
      } catch (error) {
        // Error al decodificar el token, redirigir al login
        console.error('Error al decodificar el token:', error);
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    } else {
      // No hay token, redirigir al login
      window.location.href = '/';
    }
  }

  render() {
    return (
      <Container className='mt-5'>
        <Row>
          <Col>
            <NavBarAdmin />
          </Col>
        </Row>

        <Row className="my-0">
          <Col>
            <CResumen />
          </Col>
        </Row>

        <Row className="my-4">
          <Col lg={12}>
            <GraficoBarra />
          </Col>
        </Row>

        <Row className="my-4">
          <Col lg={12}>
            <GraficoLineas />
          </Col>
        </Row>

        <TimeoutModal /> {/* Añade la modal de inactividad */}
      </Container>
    );
  }
}

export default MiComponente;
