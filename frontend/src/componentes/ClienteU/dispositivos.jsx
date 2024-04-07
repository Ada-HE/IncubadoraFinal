import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product';
import Modal from 'react-modal';
import '../../Estilos/dispositivos.css';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const ControlPage = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem('usuario') || '{}');

  // Define fetchMisDispositivos fuera de useEffect para que pueda ser reutilizada
  const fetchMisDispositivos = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/misDispositivos/${userInfo._id}`);
      setDispositivos(response.data);
    } catch (error) {
      console.error('Error al obtener mis dispositivos:', error);
    }
  };

  useEffect(() => {
    if (userInfo._id) {
      fetchMisDispositivos();
    }
  }, [userInfo._id]);

  const handleDeviceAdded = (newDevice) => {
    setDispositivos(prevDispositivos => [...prevDispositivos, newDevice]);
    setMensaje('Dispositivo vinculado exitosamente.');
  };

  const handleDeleteDevice = async (claveDispositivo) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este dispositivo?")) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('usuario'));
        const response = await axios.patch(`http://localhost:3001/api/usuarios/${userInfo._id}/desvincularDispositivo`, {
          claveDispositivo
        });

        if (response.status === 200) {
          setMensaje('Dispositivo desvinculado exitosamente.');
          fetchMisDispositivos(); // Actualiza la lista de dispositivos
        } else {
          setMensaje('No se pudo desvincular el dispositivo.');
        }
      } catch (error) {
        console.error('Error al desvincular el dispositivo:', error);
        setMensaje('Error al desvincular el dispositivo. Por favor, inténtalo de nuevo.');
      }
    }
  };


  const openModal = () => {
    setMensaje('');
    setModalIsOpen(true);
  };

  // Actualiza la lista de dispositivos cuando el modal se cierra
  const closeModal = () => {
    setModalIsOpen(false);
    fetchMisDispositivos();
  };

  // Estilos personalizados para el modal
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '50%', // Puedes ajustar el ancho como prefieras
      border: '1px solid #ccc', // Agrega un borde si quieres que tenga más definición
      borderRadius: '10px', // Si deseas bordes redondeados
    },
  };

  const administrarDispositivoo = (claveDispositivo) => {
    navigate(`/cliente/informacion/Decive/${claveDispositivo}`);
  };

  return (
    <div className="formu-table-container">

    <form className="control-pagee">
      <h1>Control de Dispositivos IoT</h1>
      <button className='btn-agregaar' type="button" onClick={openModal}>Agregar Nuevo Dispositivo</button>
      <div className="table-container"> {/* Contenedor agregado para la tabla */}

      {dispositivos.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Número</th>
              <th>Nombre</th>
              <th>Clave</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {dispositivos.map((dispositivo, index) => (
              <tr key={dispositivo._id}>
                <td>{index + 1}</td>
                <td>{dispositivo.nombre}</td>
                <td>{dispositivo.Clave}</td>
                <td>Activo</td>
                <td>
                  <button type="button" className="btn-admin" onClick={() => administrarDispositivoo(dispositivo.Clave)}>
                    Administrar
                  </button>
                  <button className="btn-eliminaar" onClick={() => handleDeleteDevice(dispositivo.Clave)} >
                    Eliminar
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay dispositivos vinculados.</p>
      )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Vincular Nuevo Dispositivo"

      >
        <Product closeModal={closeModal} onDeviceAdded={handleDeviceAdded} setMensajee={setMensaje} />
      </Modal>
    </form>
    </div>

  );
};
export default ControlPage;
