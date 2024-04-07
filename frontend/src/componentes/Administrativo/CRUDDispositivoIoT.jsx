import React, { useState } from 'react';
import axios from 'axios';
import '../../Estilos/style_iot.css';

const CrudDispositivo = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [dimension, setDimension] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [clave, setClave]= useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'nombre':
        setNombre(value);
        break;
      case 'clave':
          setClave(value);
          break;
      case 'precio':
        setPrecio(value);
        break;
      case 'dimension':
        setDimension(value);
        break;
      case 'descripcion':
        setDescripcion(value);
        break;
      default:
        break;
    }
  };

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imagen) {
      setErrorMessage('Por favor, selecciona una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('imagen', imagen);

    try {
      const uploadResponse = await axios.post('http://localhost:3001/api/imagenes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const imagenUrl = uploadResponse.data.url;

      const productoData = {
        nombre,
        clave,
        precio,
        dimension,
        descripcion,
        imagenUrl,
      };

      await axios.post('http://localhost:3001/api/incubadoras', productoData);
      setSuccessMessage('Dispositivo creado exitosamente.');
      // Limpiar el formulario después de la inserción exitosa
      setNombre('');
      setClave('');
      setPrecio('');
      setDimension('');
      setDescripcion('');
      setImagen(null);
    } catch (error) {
      console.error('Hubo un error al guardar el dispositivo', error);
      setErrorMessage('Error al guardar el dispositivo. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-detalles">
      <h2>Agregar Dispositivo</h2>
      <label>Nombre</label>
      <input type="text" name="nombre" value={nombre} onChange={handleInputChange} placeholder="Nombre" required />
      <label>Clave</label>
      <input type="text" name="clave" value={clave} onChange={handleInputChange} placeholder="Clave" required />
      <label>Precio</label>
      <input type="text" name="precio" value={precio} onChange={handleInputChange} placeholder="Precio" required />
      <label>Dimension</label>
      <input type="text" name="dimension" value={dimension} onChange={handleInputChange} placeholder="Dimensión" required />
      <label>Descripcion</label>
      <textarea name="descripcion" value={descripcion} onChange={handleInputChange} placeholder="Descripción" required />
      <label>Imagen</label>
      <input type="file" name="imagen" onChange={handleImageChange} required />
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button type="submit" id='b' >Guardar Dispositivo</button>
    </form>
  );
};

export default CrudDispositivo;