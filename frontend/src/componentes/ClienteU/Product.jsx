import React, { useState } from 'react';
import axios from 'axios';
import '../../Estilos/style_product.css';

const Product = ({ closeModal, onDeviceAdded, setMensajee }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [claveDispositivo, setclaveDispositivo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/vincularDispositivoPorNombre', {
        nombreUsuario,
        claveDispositivo,
      });
      if (response.status === 200) {
        onDeviceAdded(response.data);
        setMensaje('Dispositivo vinculado exitosamente.');
        setTimeout(() => {
          closeModal();
        }, 1500);
      } else {
        setMensaje('Hubo un problema al intentar vincular el dispositivo.');
      }
    } catch (error) {
      console.error('Error al vincular el dispositivo:', error);
      setMensaje('Error al vincular el dispositivo. Por favor, inténtalo de nuevo.');
    }
  };
  
  return (
    <div className="vincular-dispositivo-container">
    <h2>Vincular Dispositivo IoT</h2>
    <p>Por favor, ingresa el nombre de usuario con el que iniciaste sesión y el ID único del dispositivo que se encuentra al lado del producto en la plataforma.</p>
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="nombreUsuario">Nombre de Usuario:</label>
        <input
          type="text"
          id="nombreUsuario"
          placeholder="Ingresa tu nombre de usuario aquí"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="claveDispositivo">ID del Dispositivo:</label>
        <input
          type="text"
          id="claveDispositivo"
          placeholder="Ejemplo: 12345"
          value={claveDispositivo}
          onChange={(e) => setclaveDispositivo(e.target.value)}
          required
        />
      </div>
      <button type="submit" id='b'>Vincular Dispositivo</button>
    </form>
    {mensaje && <div className="mensaje-confirmacion">{mensaje}</div>}
  </div>
  
  );
};

export default Product;
