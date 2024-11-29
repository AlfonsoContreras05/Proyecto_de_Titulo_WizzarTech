import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faChartPie,
  faRankingStar,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const redIconStyle = {
  color: "#EB1616",
};

const DashboardCard = ({ title, value, icon }) => (
  <Card className="bg-secondary rounded text-white">
    <Card.Body
      className="d-flex align-items-center justify-content-between p-4"
      style={{ background: "#333", color: "#fff" }}
    >
      <FontAwesomeIcon icon={icon} size="3x" style={redIconStyle} />
      <div className="ms-3">
        <p className="mb-2">{title}</p>
        <h6 className="mb-0">{value}</h6>
      </div>
    </Card.Body>
  </Card>
);

const Dashboard = () => {
  const [ventasDiarias, setVentasDiarias] = useState(0);
  const [ventasMensuales, setVentasMensuales] = useState(0);
  const [ventasAnuales, setVentasAnuales] = useState(0);

  const [ventasPorSucursal, setVentasPorSucursal] = useState([]);

  useEffect(() => {
    // Aquí puedes hacer tus llamadas a la API para obtener los datos
    // Por ejemplo, usando fetch para obtener las ventas diarias
    fetch("http://localhost:5000/api/ventas-diarias")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => setVentasDiarias(data.ventasDiarias))
      .catch((error) =>
        console.error("Error al obtener ventas diarias:", error)
      );

    // Hacer lo mismo para ventas mensuales y anuales
    fetch("http://localhost:5000/api/ventas-mensuales")
      .then((response) => response.json())
      .then((data) => setVentasMensuales(data.ventasMensuales));

    fetch("http://localhost:5000/api/ventas-anuales")
      .then((response) => response.json())
      .then((data) => setVentasAnuales(data.ventasAnuales));

    fetch("http://localhost:5000/api/ventas-por-sucursal")
      .then((response) => response.json())
      .then((data) => setVentasPorSucursal(data))
      .catch((error) =>
        console.error("Error al obtener ventas por sucursal:", error)
      );
  }, []);

  return (
    <div style={{ background: "#222", padding: "20px", margin: "4% 0 0 0" }}>
      <Row xs={1} md={2} lg={4} className="g-4">
        <Col>
          <DashboardCard
            title="Venta Diaria"
            value={`$${ventasDiarias}`}
            icon={faMoneyBill}
          />
        </Col>
        <Col>
          <DashboardCard
            title="Venta Mensual"
            value={`$${ventasMensuales}`}
            icon={faChartLine}
          />
        </Col>
        <Col>
          <DashboardCard
            title="Venta Anual"
            value={`$${ventasAnuales}`}
            icon={faChartPie}
          />
        </Col>

        <Col>
          <Card className="bg-secondary rounded text-white">
            <Card.Body
              className="d-flex align-items-center justify-content-between p-4"
              style={{ background: "#333", color: "#fff" }}
            >
              <FontAwesomeIcon
                icon={faRankingStar}
                size="3x"
                style={{ color: "#EB1616" }}
              />
              <div className="ms-3">
                {/* <p className="mb-2">Ventas por Sucursal</p> */}
                <div className="mb-0">
                  {ventasPorSucursal.map((sucursal, index) => (
                    <div key={index}>
                      {sucursal.Sucursal}: $
                      {Number(sucursal.TotalVentas).toFixed(0)}
                    </div>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
