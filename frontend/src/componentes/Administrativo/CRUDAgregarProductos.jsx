import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Estilos/style_productos.css';



const CrudAgregarProductos = () => {
  const [colorSeleccionado, setColorSeleccionado] = useState('');
  const [tamanoSeleccionado, setTamanoSeleccionado] = useState('');

  // Definiciones estáticas para colores y tamaños
  const colores = [
    'Negro', 'Café', 'Blanco', 'Gris', 'Rojo',
    'Azul Marino', 'Verde Oliva', 'Amarillo', 'Naranja', 'Púrpura',
    'Rosa', 'Cian', 'Magenta', 'Lima', 'Marfil',
    'Marrón', 'Turquesa', 'Plata', 'Oro', 'Bronce'
  ];

  const tamanos = [
    'Extra Grande', 'Grande', 'Mediano',
    'Pequeño', 'Extra Pequeño'
  ];


  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [productos, setProductos] = useState([]);


  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/productos');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };
    fetchProductos();
  }, []);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/productos/${id}`);
      setProductos(productos.filter((producto) => producto._id !== id));
      setSuccessMessage('Producto eliminado correctamente.');
    } catch (error) {
      setErrorMessage('Error al eliminar el producto.');
      console.error('Error al eliminar el producto:', error);
    }
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(`Cambiando: ${name} a ${value}`); // Agregar esta línea para depuración

    switch (name) {
      case 'nombre':
        setNombre(value);
        break;
      case 'descrip':
        setDescripcion(value);
        break;
      case 'precio':
        setPrecio(value);
        break;
      case 'categoria':
        setCategoriaSeleccionada(value);
        break;
      default:
        break;
      case 'color':
        setColorSeleccionado(value);
        break;
      case 'tamano':
        setTamanoSeleccionado(value);
        break;
    }
  };

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('imagen', imagen); // Asegúrate de que 'imagen' es el archivo seleccionado

    try {
      const uploadResponse = await axios.post('http://localhost:3001/api/imagenes/upload', formData);
      const imagenUrl = uploadResponse.data.url; // Asume que el endpoint de subida devuelve un objeto con una propiedad 'url'

      const productoData = {
        nombre,
        descripcion,
        precio,
        categoria: categoriaSeleccionada,
        color: colorSeleccionado, // Incluir color seleccionado
        tamano: tamanoSeleccionado, // Incluir tamaño seleccionado
        imagenUrl,
      };
      const response = await axios.post('http://localhost:3001/api/productos', productoData);
      setSuccessMessage('Producto creado exitosamente.');
    } catch (error) {
      console.error('Hubo un error al guardar el producto', error);
      setErrorMessage('Error al guardar el producto. Por favor, inténtalo de nuevo.');
    }
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Hubo un problema al cargar las categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <>
      <form className="forma" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="d3">
          <h2>Agregar Productos</h2>
          {/* Campos para nombre, descripción, precio, imagen y categoría */}
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre" // esto debe coincidir con el lado del servidor
            onChange={handleInputChange}
            value={nombre}
            required
          />
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            name="categoria"
            onChange={handleInputChange}
            value={categoriaSeleccionada}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>

          <label htmlFor="tamano">Tamaño:</label>
          <select id="tamano" name="tamano" onChange={handleInputChange} value={tamanoSeleccionado} required>
            <option value="">Selecciona un tamaño</option>
            {tamanos.map((tamano, index) => (
              <option key={index} value={tamano}>
                {tamano}
              </option>
            ))}
          </select>

          <label htmlFor="color">Color:</label>
          <select id="color" name="color" onChange={handleInputChange} value={colorSeleccionado} required>
            <option value="">Selecciona un color</option>
            {colores.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>



          <label htmlFor="precio">Precio:</label>
          <input
            type="text"
            id="precio"
            name="precio"
            onChange={handleInputChange}
            value={precio}
            required
          />

          <label htmlFor="descrip">Descripción:</label>
          <textarea
            id="descrip"
            name="descrip"
            onChange={handleInputChange}
            value={descripcion}
            required
          />

          <label htmlFor="imagen">Imagen:</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={handleImageChange}
            required
          />

          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="submit-button" id='b'>Guardar</button>
        </div>
      </form>
    </>
  );
};


export default CrudAgregarProductos;
