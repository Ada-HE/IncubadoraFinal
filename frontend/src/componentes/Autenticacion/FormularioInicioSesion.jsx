import React, { useState } from 'react';
import logoHuellitas from '../../imagenes/logo_huellitas.png';
import imagenUsuario from '../../imagenes/user.avif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../../Estilos/style_login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const [idUsuario, setIdUsuario] = useState('');
  const [Usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [IdTipo, setTipoUsuario] = useState('Cliente');
  const [showPassword, setShowPassword] = useState(false);


  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Iniciando sesión con:', Usuario, password, IdTipo);
    try {
      const response = await axios.post('http://localhost:3001/api/usuario', {
        Usuario,
        password,
        IdTipo
      });

      console.log('Respuesta del servidor:', response.data);

      if (response.data) {
        localStorage.removeItem('usuario'); // Asegúrate de que esto coincida con RutaPrivada
        localStorage.setItem('usuario', JSON.stringify(response.data));
        
        const destino = response.data.IdTipo === 'Cliente' ? '/cliente' : '/admin';
        const destino2 = response.data.IdTipo === 'Empleado' ? '/admin' : '/cliente';
        navigate(destino);
        navigate(destino2);
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      if (error.response && error.response.status === 401) {
        alert('Usuario o contraseña incorrectos');
      } else {
        alert('Ocurrió un error al intentar iniciar sesión');
      }
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleLogin}>
        <div className="d1">

          <h1>Iniciar Sesión</h1>
          <div className="form-group">
            <div className="img">
              <img src={imagenUsuario} alt="imgLogin" width="150" />
            </div>
            <br />
            <label htmlFor="usuario">Ingrese su Usuario:</label>
            <input
              type="text"
              id="usuario"
              name="txtusuario"
              placeholder="Usuario"
              value={Usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
            <div className="input-group">
              <label htmlFor="password">Ingrese su Contraseña</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="txtpassword"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="password-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
          </div>
          <label htmlFor="tipo">Seleccione su tipo de usuario:</label>
          <select
            id='tipo'
            name="selectTipo"
            value={IdTipo}
            onChange={(e) => setTipoUsuario(e.target.value)}
            className=""
          >
            <option value="Cliente">Cliente</option>
            <option value="Empleado">Empleado</option>
          </select>
          <div className="form-group">
            <button id="b" type="submit">Acceder</button>
          </div>
          <div className="links-container-login">
            <Link to="/registro" className="link registro">Regístrate</Link>
            <Link to="/recuperacion" className="link registro">¿Olvidaste tu contraseña?</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;