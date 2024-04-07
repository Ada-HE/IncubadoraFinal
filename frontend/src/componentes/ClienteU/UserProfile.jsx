import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Estilos/UserProfile.css';
import imagenAntecedentes from '../../imagenes/Antecedentes.jpeg';

const InformacionPerfil = () => {
  // Estados para los campos basados en tu descripción
  const [usuario, setUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [preguntaSecreta, setPreguntaSecreta] = useState('');
  const [respuestaSecreta, setRespuestaSecreta] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [_id, set_Id] = useState('');

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('usuario'));
    if (userInfo && userInfo._id) {
      cargarPerfilUsuario(userInfo._id);
    }
    console.log('ID del usuario:', userInfo._id);

  }, []);

  const cargarPerfilUsuario = async (_id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/usuarios/${_id}`);
      const datosUsuario = response.data;
      setUsuario(datosUsuario.Usuario || '');
      setNombre(datosUsuario.Nombre || '');
      setApellidoPaterno(datosUsuario.APaterno || '');
      setApellidoMaterno(datosUsuario.AMaterno || '');
      setTelefono(datosUsuario.Telefono || '');
      setCorreo(datosUsuario.CorreoE || '');
      setPreguntaSecreta(datosUsuario.idSecreta || '');
      setRespuestaSecreta(datosUsuario.respuesta || '');
      setTipoUsuario(datosUsuario.IdTipo || '');
      set_Id(_id);
    } catch (error) {
      console.error('Hubo un error al cargar la información del usuario:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioActualizado = {
      Usuario: usuario,
      Nombre: nombre,
      APaterno: apellidoPaterno,
      AMaterno: apellidoMaterno,
      Telefono: telefono,
      CorreoE: correo,
      respuesta: respuestaSecreta,

    };

    try {
      const response = await axios.put(`http://localhost:3001/api/usuarios/${_id}`, usuarioActualizado);
      console.log('Respuesta de actualización:', response.data);
      alert('Información actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar la información:', error);
      alert(`Ocurrió un error al actualizar la información: ${error.response ? error.response.data : error.message}`);
    }
  };

  return (
    <div className="perfil-container">

      <h2 className="perfil-titulo">Perfil</h2>
  
      <div className="perfil-imagen-container">
        <img src={imagenAntecedentes} alt="Profile" className="perfil-imagen" />
      </div>
  
      <form onSubmit={handleSubmit} className="perfil-form">
        {/* División en dos columnas */}
        <div>
          <label htmlFor="usuario">Usuario:</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            disabled
          />
          <label htmlFor="apellidoPaterno">Apellido Paterno:</label>
          <input
            type="text"
            id="apellidoPaterno"
            name="apellidoPaterno"
            value={apellidoPaterno}
            onChange={e => setApellidoPaterno(e.target.value)}
          />
           <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
          />
          <label htmlFor="preguntaSecreta">Pregunta Secreta (no editable):</label>
          <input
            type="text"
            id="preguntaSecreta"
            name="preguntaSecreta"
            value={preguntaSecreta}
            disabled
          />
        </div>
        <div>
        <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
          <label htmlFor="apellidoMaterno">Apellido Materno:</label>
          <input
            type="text"
            id="apellidoMaterno"
            name="apellidoMaterno"
            value={apellidoMaterno}
            onChange={e => setApellidoMaterno(e.target.value)}
          />
          
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
          />
          <label htmlFor="respuestaSecreta">Respuesta Secreta:</label>
          <input
            type="text"
            id="respuestaSecreta"
            name="respuestaSecreta"
            value={respuestaSecreta}
            onChange={e => setRespuestaSecreta(e.target.value)}
          />
        </div>
        {/* Pregunta y respuesta secreta */}
        <div className='perfilB'>
        <div className="perfil-button-container">
          <button type="submit" id='bp' className="perfil-button">Guardar Cambios</button>
        </div>
        </div>
      </form>
    </div>
  );
  }  

export default InformacionPerfil;
