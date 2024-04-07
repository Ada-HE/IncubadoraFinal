import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Estilos/style_productos.css'; // Asegúrate de que la ruta es correcta

const CRUDListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editableProducto, setEditableProducto] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/productos');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al cargar los productos:', error.response?.data?.message || error.message);
        setErrorMessage('Error al cargar los productos: ' + (error.response?.data?.message || error.message));
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
      setErrorMessage('Error al eliminar el producto: ' + (error.response?.data?.message || error.message));
      console.error('Error al eliminar el producto:', (error.response?.data?.message || error.message));
    }
  };
  // Función para abrir el modal de edición y establecer el producto a editar
  const abrirFormularioDeEdicion = (producto) => {
    setEditableProducto(producto);
    setIsEditModalOpen(true);
  };

  // Función para manejar la actualización del producto
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/api/productos/${editableProducto._id}`, editableProducto);
      setProductos(productos.map((producto) => producto._id === editableProducto._id ? editableProducto : producto));
      setIsEditModalOpen(false);
      setSuccessMessage('Producto actualizado correctamente.');
    } catch (error) {
      setErrorMessage('Error al actualizar el producto: ' + (error.response?.data?.message || error.message));
      console.error('Error al actualizar el producto:', error);
    }
  };


  return (
    <div className="form-table-container">
          <h2 id="h22">Reporte De Los Productos</h2>
          <table className="form-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Categoría</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto._id}>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.precio}</td>
              <td>
                <img src={producto.imagenUrl} alt={producto.nombre} style={{ width: '150px' }} />
              </td>
              <td>{producto.categoria}</td>
              <td>
                <button className="modificaar-boton" id='modificarB' onClick={() => abrirFormularioDeEdicion(producto)}>Modificar</button>
                <button className="eliminaar-boton" id='eliminarB' onClick={() => handleDelete(producto._id)}>Eliminar</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-contentte">
            <span className="modal-close" onClick={() => setIsEditModalOpen(false)}>&times;</span>
            <h2>Editar Producto</h2>
            <form onSubmit={handleUpdate}>
              <label>Nombre:</label>
              <input type="text" value={editableProducto.nombre} onChange={(e) => setEditableProducto({ ...editableProducto, nombre: e.target.value })} />

              <label>Descripción:</label>
              <textarea value={editableProducto.descripcion} onChange={(e) => setEditableProducto({ ...editableProducto, descripcion: e.target.value })} />

              <label>Precio:</label>
              <input type="number" value={editableProducto.precio} onChange={(e) => setEditableProducto({ ...editableProducto, precio: e.target.value })} />

              <button type="submit" id='b'>Guardar Cambios</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRUDListaProductos;
