import React, { useState, useEffect } from 'react';
import '../../Estilos/style_consultaClientes.css'; // Asegúrate de que el camino al archivo CSS es correcto
import { useNavigate } from 'react-router-dom';

const CrudClientes = () => {
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

  // Función para validar el paso 2
  const validarPaso2 = () => {
    if (!telefono.trim() || !correoElectronico.trim() || !respuesta.trim()) {
      alert('Por favor, completa todos los campos de información de contacto.');
      return false;
    }
    // Aquí puedes agregar validaciones adicionales, como la longitud del teléfono
    if (telefono.length !== 10) {
      alert('El teléfono debe contener 10 dígitos.');
      return false;
    }
    return true;
  };

  // Función para validar el paso 3
  const validarPaso3 = () => {
    if (!usuario.trim() || !password.trim() || !confirmPassword.trim()) {
      alert('Por favor, completa todos los campos de credenciales de acceso.');
      return false;
    }
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
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
  // Datos de contacto
  const [telefono, setTelefono] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  //cargar las preguntas
  const [preguntasSecretas, setPreguntasSecretas] = useState([]);
  //para almacenar los clientes
  const [clientes, setClientes] = useState([]);

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
  //se cargan los clientes en la tabla
  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const respuesta = await fetch('http://localhost:3001/api/usuarios');
        const data = await respuesta.json();
        setClientes(data);
      } catch (error) {
        console.error('Hubo un problema al cargar los clientes:', error);
      }
    };

    cargarClientes();
  }, []);
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');

  // Credenciales de acceso
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
        IdTipo: 'Empleado'
      };

      try {
        // Enviar los datos al servidor
        const response = await fetch('http://localhost:3001/api/usuarios/nuevoEmpleado', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });

        if (response.ok) {

          const data = await response.json();
          alert('Usuario registrado con éxito.');
          navigate('/admin');
        } else {
          alert('Hubo un problema al registrar el usuario.');
        }
      } catch (error) {
        // Hubo un error al enviar la solicitud al servidor
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
            <h2 id='h22'>Información Personal Del Empleado Paso 1:</h2>
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
            <button type="button" id='bb' onClick={nextStep}>Siguiente</button>
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
              <button type="button" id='bb' onClick={prevStep}>Anterior</button>
              <button type="button" id='bb' onClick={nextStep}>Siguiente</button>
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
              type="password"
              id="password"
              name="txtpassword"
              placeholder="Contraseña"
              minLength="8"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required />
            <label htmlFor="password2">Confirma Contraseña:</label>
            <input
              type="password"
              id="password2"
              name="txtpassword2"
              placeholder="Confirma tu contraseña"
              minLength="8"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required />
            <div className='btn'>
              <button type="button" id='bb' onClick={prevStep}>Anterior</button>
              <button type="submit" id='bb' className="submit-button">Registrar</button>
            </div>
          </div>
        )}
      </form>
    </center>
  );
};
export default CrudClientes;