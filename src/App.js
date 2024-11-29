import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginVendedor from './components/loginVendedor.jsx'; 
import './components/styleLogin.css'; // Asegúrate de reemplazar esto con la ruta correcta a tu archivo CSS
import MenuUsuario from './components/MenuUsuario'; 
import FormularioCoti from './components/FormularioCoti.jsx'
import NavbarComponent from './components/NavbarComponent.jsx';
import ComponenteProductos  from './components/ComponenteProductos.jsx';
import HistorialVentas from './components/HistorialCotizaciones.jsx';
import Inicio from './components/ComponenteInicio.jsx';
import Venta from './components/ProcesarVenta.jsx';
import ModalV from './components/ModalVenta.jsx';
import LoginAdministrador from './admin-components/adminlogin.jsx';
import NavBarAdmin from './admin-components/navBarAmin.jsx';
import InicioAdmin from './admin-components/InicioAdmin.jsx';
import CResumen from './admin-components/CResumen.jsx';
import RUsuario from './admin-components/CrearVendedor.jsx';
import LVendedores from './admin-components/ListaVendedores.jsx';
import LCotizaciones from './admin-components/LCotizaciones.jsx';
import ECategorias from './admin-components/EditCategorias.jsx';
import ProductList from './admin-components/LProductos.jsx';
function App() {
  return (
    <Router>
      <div>
        <Routes> {/* Usa Routes para envolver Route */}
          <Route path="/" element={<LoginVendedor />} />
          <Route path="/Menu-Usuario" element={<MenuUsuario />} />
          <Route path="/FormularioCoti" element={<FormularioCoti/>} />
          <Route path="/NavbarComponent" element={<NavbarComponent/>} />
          <Route path="/ComponenteProductos" element={<ComponenteProductos/>} />
          <Route path="/HistorialVentas" element={<HistorialVentas/>} />
          <Route path="/Inicio" element={<Inicio/>} />
          <Route path="/Venta" element={<Venta/>} />
          <Route path='/ModalVenta' element={<ModalV/>} />
          <Route path='/LoginAdmin' element={<LoginAdministrador/>} />
          <Route path='/NavBarAdmin' element={<NavBarAdmin/>} />
          <Route path='/InicioAdmin' element={<InicioAdmin/>} />
          <Route path='/CResumen' element={<CResumen/>} />
          <Route path='/RUsuario' element={<RUsuario/>} />
          <Route path='/LVendedores' element={<LVendedores/>} />
          <Route path='/ECategorias' element={<ECategorias/>} />
          <Route path="/LoginVendedor" element={<LoginVendedor/>} />
          <Route path="/LCotizaciones" element={<LCotizaciones/>} />
          <Route path="/ProductList" element={<ProductList/>} />
          


          {/* Puedes agregar más rutas aquí */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
