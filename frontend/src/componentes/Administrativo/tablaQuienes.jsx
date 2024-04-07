import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Estilos/style_tablaquien.css'

const TablaQuienes = () => {
  const [infoQuienes, setInfoQuienes] = useState([]);
  const [editForm, setEditForm] = useState({ id: null, categorias: '', informacion: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    obtenerInfoQuienes();
  }, []);

  const obtenerInfoQuienes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/quienes');
      setInfoQuienes(response.data);
    } catch (error) {
      console.error('Error al obtener la información:', error);
    }
  };



  const handleEdit = (item) => {
    setEditForm({ id: item._id, categorias: item.categorias, informacion: item.informacion });
    setIsEditing(true);
  };


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/quienes/${id}`);
      if (response.status === 200) {
        setInfoQuienes(prevInfoQuienes => prevInfoQuienes.filter(item => item._id !== id));
      } else {
        console.log('Error al eliminar:', response.data);
      }
    } catch (error) {
      console.error('Error al eliminar la información:', error.response ? error.response.data : error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/api/quienes/${editForm.id}`, {
        categorias: editForm.categorias,
        informacion: editForm.informacion
      });
      if (response.status === 200) {
        const updatedInfoQuienes = infoQuienes.map(item => {
          if (item._id === editForm.id) {
            return { ...item, categorias: editForm.categorias, informacion: editForm.informacion };
          }
          return item;
        });
        setInfoQuienes(updatedInfoQuienes);
        setIsEditing(false);
      } else {
        console.log('Error al actualizar:', response.data);
      }
    } catch (error) {
      console.error('Error al actualizar la información:', error.response ? error.response.data : error);
    }
  };




  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditForm({ ...editForm, [name]: value });
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="categorias"
            value={editForm.categorias}
            onChange={handleInputChange}
          />
          <textarea
            name="informacion"
            value={editForm.informacion}
            onChange={handleInputChange}
          />
          <button type="submit">Guardar Cambios</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </form>
      ) : (
        <center>
          <div className="form-table-container">
            <h2 id="h22">Reporte Quienes Somos</h2>
            <table className="form-table">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Información</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {infoQuienes.map((item) => (
                  <tr key={item._id}>
                    <td>{item.categorias}</td>
                    <td>{item.informacion}</td>
                    <td>
                      <button className="eliminar-boton" onClick={() => handleDelete(item._id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </center>
      )}
    </div>
  );
};

export default TablaQuienes;
