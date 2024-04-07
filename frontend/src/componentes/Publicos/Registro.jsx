import React, { useState, useEffect } from 'react';
import '../../Estilos/style_consultaClientes.css'; // Asegúrate de que el camino al archivo CSS es correcto
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RegisCrud = () => {
  const navigate = useNavigate();
  // Función para validar el paso 1
  const validarPaso1 = () => {
    // Aquí debes incluir tus reglas de validación para el paso 1
    if (!nombre.trim() || !apellidoPaterno.trim() || !apellidoMaterno.trim()) {
      alert('Por favor, completa todos los campos de información personal.');
      return false;
    }
    return true;
  };

  // Validación para el paso 2, incluyendo validación de correo electrónico
  const validarPaso2 = () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!telefono.trim() || !correoElectronico.trim() || !respuesta.trim()) {
      alert('Por favor, completa todos los campos de información de contacto.');
      return false;
    }
    if (telefono.length !== 10) {
      alert('El teléfono debe contener 10 dígitos.');
      return false;
    }
    if (!regexEmail.test(correoElectronico)) {
      alert('El formato del correo electrónico no es válido.');
      return false;
    }
    return true;
  };

  // Validación para el paso 3, incluyendo validación de contraseña
  const validarPaso3 = () => {
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!usuario.trim() || !password.trim() || !confirmPassword.trim()) {
      alert('Por favor, completa todos los campos de credenciales de acceso.');
      return false;
    }
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return false;
    }
    if (!regexPassword.test(password)) {
      alert('La contraseña debe tener un mínimo de 8 caracteres, incluir al menos un número y un carácter especial.');
      return false;
    }
    return true;
  };


  // Estados
  const [pasoActual, setPasoActual] = useState(1);
  // Datos personales
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [preguntasSecretas, setPreguntasSecretas] = useState([]);
  useEffect(() => {
    const cargarPreguntasSecretas = async () => {
      try {
        const respuesta = await fetch('http://localhost:3001/api/tblpregunta');
        const preguntas = await respuesta.json();
        setPreguntasSecretas(preguntas);
      } catch (error) {
        console.error('Hubo un problema al cargar las preguntas secretas:', error);
      }
    };

    cargarPreguntasSecretas();
  }, []);
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');

  // Credenciales de acceso
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //mostrar la contraseña
  const [mostrarContrasena, setMostrarContrasena] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validarPaso1() && validarPaso2() && validarPaso3()) {
      // Crear el objeto de usuario
      const userData = {
        Usuario: usuario,
        pssword: password, // Recuerda hashear la contraseña en el backend
        CorreoE: correoElectronico,
        Nombre: nombre,
        APaterno: apellidoPaterno,
        AMaterno: apellidoMaterno,
        Telefono: telefono,
        codigo_verificacion: "un-codigo-unico-aqui", // Deberías generar este código en el backend o aquí si es necesario
        expiracion: "una-fecha-de-expiracion-aqui", // Deberías calcular esta fecha según la lógica de tu negocio
        idSecreta: pregunta,
        respuesta: respuesta,
        IdTipo: 'Cliente'
      };

      try {
        // Enviar los datos al servidor
        const response = await fetch('http://localhost:3001/api/usuarios/nuevoCliente', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });

        if (response.ok) {
          // La respuesta del servidor fue positiva
          const data = await response.json();
          alert('Usuario registrado con éxito.');
          navigate('/login');

        } else {
          alert('Hubo un problema al registrar el usuario.');
        }
      } catch (error) {
        console.error('Hubo un error al intentar registrar el usuario:', error);
        alert('Ocurrió un error al intentar registrar el usuario.');
      }
    }
  };
  const nextStep = () => {
    if ((pasoActual === 1 && validarPaso1()) || (pasoActual === 2 && validarPaso2())) {
      setPasoActual(pasoActual + 1);
    }
  };

  const prevStep = () => {
    if (pasoActual > 1) {
      setPasoActual(pasoActual - 1);
    }
  };


  return (
    <center>
      <form onSubmit={handleSubmit}>
        {pasoActual === 1 && (
          <div className="d1">
            <h2>Información Personal Paso 1:</h2>
            <label htmlFor="Nombre">Nombre:</label>
            <input
              type="text"
              id="Nombre"
              name="txtNombre"
              placeholder="Nombre del cliente"
              maxLength="30"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
            />
            <label htmlFor="Apaterno">Apellido Paterno:</label>
            <input
              type="text"
              id="Apaterno"
              name="txtApaterno"
              placeholder="Apellido paterno"
              maxLength="50"
              value={apellidoPaterno}
              onChange={e => setApellidoPaterno(e.target.value)}
              required />
            <label htmlFor="Amaterno">Apellido Materno:</label>
            <input
              type="text"
              id="Amaterno"
              name="txtAmaterno"
              placeholder="Apellido materno"
              pattern="[a-zA-Z]+"
              maxLength="50"
              value={apellidoMaterno}
              onChange={e => setApellidoMaterno(e.target.value)}
              required />
            <div className='btn'>          
              <button type="button" id='bp' onClick={() => navigate('/login')}>Atras</button>
              <button type="button" id='bp' onClick={nextStep}>Siguiente</button>
            </div>

          </div>
        )}
        {pasoActual === 2 && (
          <div className="d1">
            <h2>Información de Contacto Paso 2:</h2>
            <label htmlFor="Telefono">Telefono:</label>
            <input
              type="number"
              id="Telefono"
              name="txtTelefono"
              placeholder="Telefono"
              pattern="[0-9]{10}"
              value={telefono}
              onChange={e => setTelefono(e.target.value)}
              required />
            <label htmlFor="CorreoE">Correo Electronico:</label>
            <input
              type="email"
              id="CorreoE"
              name="txtCorreoE"
              placeholder="Correo Electronico"
              value={correoElectronico}
              onChange={e => setCorreoElectronico(e.target.value)}
              required />
            <label htmlFor="PreguntaSecreta">Pregunta Secreta:</label>
            <select
              name="txtPreguntaSecreta"
              id="PreguntaSecreta"
              value={pregunta}
              onChange={e => setPregunta(e.target.value)}
              required>
              <option value="">Selecciona Tu Pregunta</option>
              {preguntasSecretas.map((pregunta, index) => (
                <option key={index} value={pregunta}>
                  {pregunta}
                </option>
              ))}
            </select>
            <label htmlFor="Respuesta">Respuesta a la pregunta:</label>
            <input
              type="text"
              id="Respuesta"
              name="txtrespuesta"
              placeholder="Respuesta a la Pregunta Secreta"
              value={respuesta}
              onChange={e => setRespuesta(e.target.value)}
              required />
            <div className='btn'>
              <button type="button" id='bp' onClick={prevStep}>Anterior</button>
              <button type="button" id='bp' onClick={nextStep}>Siguiente</button>
            </div>
          </div>
        )}
        {pasoActual === 3 && (
          <div className="d1">
            <h2>Credenciales de Acceso Paso 3:</h2>
            <label htmlFor="usuario">Usuario:</label>
            <input
              type="text"
              id="usuario"
              name="txtusuario"
              placeholder="Usuario"
              pattern="[a-zA-Z0-9]+"
              maxLength="20"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              required />
            <label htmlFor="password">Contraseña:</label>
            <input
              type={mostrarContrasena ? "text" : "password"}
              id="password"
              name="txtpassword"
              placeholder="Contraseña"
              minLength="8"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password2">Confirma Contraseña:</label>
            <input
              type={mostrarContrasena ? "text" : "password"}
              id="password2"
              name="txtpassword2"
              placeholder="Confirma tu contraseña"
              minLength="8"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <div className='bntContraDiv'>
              <button type="button" className='bntContra' onClick={() => setMostrarContrasena(!mostrarContrasena)}>
                {mostrarContrasena ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <div className='btn'>
              <button type="button" id='bp' onClick={prevStep}>Anterior</button>
              <button type="submit" id='bp' className="submit-button">Registrar</button>
            </div>
          </div>
        )}
      </form>
    </center>
  );
};
export default RegisCrud;