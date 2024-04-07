import React, { useState } from 'react';
import '../../Estilos/style_formuContact.css'; // Asegúrate de tener la ruta correcta al archivo CSS

const FormularioContacto = () => {
  const [mensaje, setMensaje] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [motivo, setMotivo] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/mensajes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mensaje, nombre, email, motivo })
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setMensaje('');
        setNombre('');
        setEmail('');
        setMotivo('');
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      alert('Hubo un error al enviar el mensaje. Intente nuevamente más tarde.');
      console.error('Error al enviar el mensaje:', error);
    }
    console.log('Mensaje enviado:', { mensaje, nombre, email, motivo });

  };
  return (
    <div className="formulario-contacto-container">
      <form onSubmit={handleSubmit}>

        <h2 id='ww'>Contactanos</h2>
        <label htmlFor="motivo">Motivo de Contacto:</label>
        <select
          id="motivo"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          required
        >
          <option value="">Seleccione el motivo de contacto</option>
          <option value="consulta">Consulta</option>
          <option value="soporte">Soporte</option>
          <option value="sugerencia">Sugerencia</option>
        </select>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          placeholder="Su Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Su Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="mensaje">Mensaje:</label>
        <textarea
          id="mensaje"
          placeholder="Su Mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
        ></textarea>

        

        <button type="submit" id='b2' className='submit-button'>Enviar</button>
      </form>
    </div>
  );
};

export default FormularioContacto;
