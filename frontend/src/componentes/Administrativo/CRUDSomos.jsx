import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Estilos/style_SomosAdmin.css'; // Asegúrate de que la ruta es correcta

const InformacionComponent = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [informacion, setInformacion] = useState('');
  const [mensaje, setMensaje] = useState(''); // Estado para almacenar el mensaje de éxito o error
  const [esExito, setEsExito] = useState(true); // Estado para determinar si el mensaje es de éxito o error

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/categoriasQuienes');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error cargando las categorías:', error);
      }
    };

    cargarCategorias();
  }, []);

  const enviarInformacion = async () => {
    try {
      await axios.post('http://localhost:3001/api/quienes', { categorias: categoriaSeleccionada, informacion });
      setMensaje('Información agregada exitosamente.');
      setEsExito(true);
    } catch (error) {
      console.error('Error al enviar la información:', error);
      setMensaje('No se pudo agregar la información.');
      setEsExito(false);
    }
  };

  return (
    <div className="formulario-contacto-container">
      <h2>Agregar Información Sobre la Empresa</h2>
      <form>
        <label>Escoge lo que subiras</label>
        <select value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
          <option value="">Seleccione una TIpo</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>{categoria}</option>
          ))}
        </select>
        <label>Ingresa su información</label>
        <textarea value={informacion} onChange={(e) => setInformacion(e.target.value)} placeholder="Escribe aquí la información..."></textarea>

        <button type="button" onClick={enviarInformacion} id='b'>Enviar Información</button>
      </form>
      {mensaje && (
        <div className={esExito ? 'mensaje-exito' : 'mensaje-error'}>
          {mensaje}
        </div>
      )}
    </div>
  );
};

export default InformacionComponent;
