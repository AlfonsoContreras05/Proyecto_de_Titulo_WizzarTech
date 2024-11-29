import React, { useState , useEffect, useCallback} from 'react';
import NavBarAdmin from './navBarAmin';
import TimeoutModal from '../components/modalTime'   // Importa el componente de la modal de inactividad
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la redirección
import { jwtDecode } from "jwt-decode"; // Importa jwt-decode para decodificar el token

export function RegisterUser() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sucursales, setSucursales] = useState([]);
  const [idSucursal, setIdSucursal] = useState('');

  

  const navigate = useNavigate();

  const verificarToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        // Token ha expirado
        localStorage.removeItem("token");
        navigate('/LoginAdmin'); // Redirige al login del administrador
      }
    } else {
      // No hay token
      navigate('/LoginAdmin');
    }
  }, [navigate]);


  useEffect(() => {
    verificarToken();
    const cargarSucursales = async () => {
      try {
        const respuesta = await fetch('http://localhost:5000/api/sucursales');
        if (respuesta.ok) {
          const sucursales = await respuesta.json();
          setSucursales(sucursales);
        } else {
          console.error('Error al cargar sucursales:', respuesta);
        }
      } catch (error) {
        console.error('Error al conectar con el servidor:', error);
      }
    };
    cargarSucursales();
  }, [verificarToken]);

  const validarPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  
  const validarTelefono = (celular) => {
    const regex = /^\+56 9\d{8}$/;
    return regex.test(celular);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validar el número de teléfono
    if (!validarTelefono(celular)) {
      alert('El número de teléfono debe seguir el formato +56 9XXXXXXXX.');
      return;
    }
  
    // Validar la contraseña antes de enviar
    if (!validarPassword(password)) {
      alert('La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número y un carácter especial.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/registerVendedor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre,
          apellido: apellido,
          correoElectronico: email,
          telefono: celular,
          idSucursal: idSucursal,
          areaEspecializacion: direccion,
          pass: password,
        }),
      });
  
      if (response.ok) {
        // Limpiar los campos del formulario
        setNombre('');
        setApellido('');
        setDireccion('');
        setCelular('');
        setEmail('');
        setPassword('');
        setIdSucursal('');
  
        // Mostrar mensaje de confirmación
        alert('Vendedor registrado con éxito');
      } else {
        alert('Error en el registro');
      }
    } catch (error) {
      console.error('Error al registrar el vendedor:', error);
      alert('Error al conectar con el servidor');
    }
  };
  

  return (
    <>
    <NavBarAdmin/>
    <div className="container mt-5">
      <form className="row g-3 mt-2" onSubmit={handleSubmit}>
        <div>
          <h1 className="mt-5">Datos del Vendedor</h1>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputNombre" className="form-label">Nombre</label>
          <input 
            type="text" 
            className="form-control bg-dark-x border-0 text-bg-dark" 
            id="inputNombre" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="col-6">
          <label htmlFor="inputRut" className="form-label">Apellido</label>
          <input 
            type="text" 
            className="form-control bg-dark-x border-0 text-bg-dark" 
            id="inputRut" 
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputDireccion" className="form-label">Direccion</label>
          <input 
            type="text" 
            className="form-control bg-dark-x border-0 text-bg-dark" 
            id="inputDireccion" 
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputCelular" className="form-label">Celular</label>
          <input 
            type="text" 
            className="form-control bg-dark-x border-0 text-bg-dark" 
            id="inputCelular" 
            placeholder="+56 9XXXXXXX" 
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
          />
        </div>
        <div className="col-md-4">
        <label htmlFor="inputSucursal" className="form-label">Sucursal</label>
        <select 
          className="form-control bg-dark-x border-0 text-bg-dark" 
          id="inputSucursal"
          value={idSucursal}
          onChange={(e) => setIdSucursal(e.target.value)}
        >
          <option value="">Selecciona una sucursal</option>
          {sucursales.map((sucursal) => (
            <option key={sucursal.ID_Sucursal} value={sucursal.ID_Sucursal}>
              {sucursal.Ubicacion}
            </option>
          ))}
        </select>
      </div>

        <h1>Datos de Autentificación</h1>
        <div className="col-md-4">
          <label htmlFor="inputEmail" className="form-label font-weight-bold">Correo</label>
          <input 
            type="email" 
            className="form-control bg-dark-x border-0 text-bg-dark" 
            id="inputEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputPassword" className="form-label font-weight-bold">Contraseña</label>
          <input 
            type="password" 
            className="form-control bg-dark-x border-0 text-bg-dark" 
            id="inputPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="col-5">
          <button className="button" type="submit">
            <span className="button_lg">
              <span className="button_sl"></span>
              <span className="button_text">Crear Vendedor</span>
            </span>
          </button>
        </div>
        <div className="col-5">
          <button className="button" type="reset">
            <span className="button_lg">
              <span className="button_sl"></span>
              <span className="button_text">Cancelar</span>
            </span>
          </button>
        </div>
      </form>
      <TimeoutModal /> {/* Incluir la modal de inactividad */}
    </div>
    </>
  );
}

export default RegisterUser;
