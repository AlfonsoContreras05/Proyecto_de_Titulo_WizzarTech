import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from 'xlsx';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);



const DashboardCharts = () => {

  const exportToExcel = (data, sheetName, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const handleDownloadVentasAnuales = () => {
    const dataToExport = dataVentasAnuales.datasets[0].data.map((value, index) => ({
      Año: dataVentasAnuales.labels[index],
      Ventas: value
    }));
    exportToExcel(dataToExport, 'Ventas Anuales', 'ventas_anuales');
  };

  const handleDownloadVentasMensuales = () => {
    const dataToExport = dataVentasMensuales.datasets[0].data.map((value, index) => ({
      Mes: dataVentasMensuales.labels[index],
      Ventas: value
    }));
    exportToExcel(dataToExport, 'Ventas Mensuales', 'ventas_mensuales');
  };

  const handleDownloadTopProductos = () => {
    const dataToExport = dataTopProductos.labels.map((label, index) => ({
      Producto: label,
      Ventas: dataTopProductos.datasets[0].data[index]
    }));
    exportToExcel(dataToExport, 'Top Productos', 'top_productos');
  };

  // Estados para los datos de los gráficos
  const [dataVentasAnuales, setDataVentasAnuales] = useState({
    labels: [],
    datasets: [{ label: 'Ventas Anuales ($)', data: [], backgroundColor: 'rgba(255, 99, 132, 0.5)' }]
  });

  const [dataVentasMensuales, setDataVentasMensuales] = useState({
    labels: ['Dic','Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', ],
    datasets: [{ label: 'Ventas Mensuales ($)', data: [], backgroundColor: 'rgba(54, 162, 235, 0.5)' }]
  });

  const [dataTopProductos, setDataTopProductos] = useState({
    labels: [],
    datasets: [{ label: 'Ventas', data: [], backgroundColor: 'rgba(75, 192, 192, 0.5)' }]
  });

  const chartOptions = {
    scales: { y: { beginAtZero: true } }
  };

  // Función para cargar ventas anuales
  const loadVentasAnuales = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/ventas-anuales2");
      const ventasAnuales = await response.json();
      setDataVentasAnuales(prevData => ({
        ...prevData,
        labels: ventasAnuales.map(v => v.year),
        datasets: [{ ...prevData.datasets[0], data: ventasAnuales.map(v => v.totalSales) }]
      }));
    } catch (error) {
      console.error('Error al cargar ventas anuales:', error);
    }
  }, []); // Dependencias vacías

  // Función para cargar ventas mensuales
  const loadVentasMensuales = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/ventas-mensuales2");
      const ventasMensuales = await response.json();
      setDataVentasMensuales(prevData => ({
        ...prevData,
        datasets: [{ ...prevData.datasets[0], data: ventasMensuales.map(v => v.totalSales) }]
      }));
    } catch (error) {
      console.error('Error al cargar ventas mensuales:', error);
    }
  }, []); // Dependencias vacías

  // Función para cargar top de productos
  const loadTopProductos = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/top-productos");
      const topProductos = await response.json();
      setDataTopProductos(prevData => ({
        ...prevData,
        labels: topProductos.map(p => p.Nombre),
        datasets: [{ ...prevData.datasets[0], data: topProductos.map(p => p.totalVendido) }]
      }));
    } catch (error) {
      console.error('Error al cargar top productos:', error);
    }
  }, []); // Dependencias vacías

  useEffect(() => {
    loadVentasAnuales();
    loadVentasMensuales();
    loadTopProductos();
  }, [loadVentasAnuales, loadVentasMensuales, loadTopProductos]);

  return (
    <Container className="d-flex justify-content-center align-items-center max-width-xxl">
      <Row className="g-4">
        {/* Gráfico de Ventas Anuales */}
        <Col md={4}>
          <Card className="text-white bg-dark h-100">
            <Card.Body>
              <Card.Title>Ventas Anuales</Card.Title>
              <Button variant="danger" onClick={handleDownloadVentasAnuales}>Descargar</Button>
              <Bar data={dataVentasAnuales} options={chartOptions} />
            </Card.Body>
          </Card>
        </Col>
        

        {/* Gráfico de Ventas Mensuales */}
        <Col md={4}>
          <Card className="text-white bg-dark h-100">
            <Card.Body>
              <Card.Title>Ventas Mensuales</Card.Title>
              <Button variant="danger" onClick={handleDownloadVentasMensuales}>Descargar</Button>
              <Bar data={dataVentasMensuales} options={chartOptions} />
            </Card.Body>
          </Card>
        </Col>

        {/* Gráfico Top 10 Productos */}
        <Col md={4}>
          <Card className="text-white bg-dark h-100">
            <Card.Body>
              <Card.Title>Top 10 Productos</Card.Title>
              <Button variant="danger" onClick={handleDownloadTopProductos}>Descargar</Button>
              <Bar data={dataTopProductos} options={chartOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};


export default DashboardCharts;
