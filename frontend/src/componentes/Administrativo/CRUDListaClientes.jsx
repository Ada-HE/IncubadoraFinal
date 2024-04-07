import React, { useState, useEffect } from 'react';
import '../../Estilos/style_consultaClientes.css';

const CRUDListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editableCliente, setEditableCliente] = useState({});

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/usuarios/${editableCliente._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CorreoE: editableCliente.CorreoE,
          Telefono: editableCliente.Telefono,
        }),
      });

      if (response.ok) {
        // Actualiza el estado de clientes con los nuevos datos
        setClientes(clientes.map(cliente => cliente._id === editableCliente._id ? { ...cliente, CorreoE: editableCliente.CorreoE, Telefono: editableCliente.Telefono } : cliente));
        setIsEditModalOpen(false);
      } else {
        alert('No se pudieron guardar los cambios.');
      }
    } catch (error) {
      console.error('Hubo un error al modificar el cliente:', error);
      alert('Ocurrió un error al intentar modificar el cliente.');
    }
  };


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
  const eliminarCliente = async (id) => {
    if (window.confirm('¿Estás seguro de querer eliminar este cliente?')) {
      try {
        const respuesta = await fetch(`http://localhost:3001/api/usuarios/${id}`, {
          method: 'DELETE',
        });

        if (respuesta.ok) {
          setClientes(clientes.filter(cliente => cliente._id !== id));
        } else {
          alert('No se pudo eliminar el cliente.');
        }
      } catch (error) {
        console.error('Hubo un error al eliminar el cliente:', error);
        alert('Ocurrió un error al intentar eliminar el cliente.');
      }
    }
  };

  const abrirFormularioDeModificacion = (cliente) => {
    setEditableCliente(cliente);
    setIsEditModalOpen(true);
  };
  return (
    <>
      <center>
        <div className="form-table-container">
          <h2 id="h22">Reporte De Los Clientes</h2>
          <table className="form-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Correo Electronico</th>
                <th>Telefono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente._id}>
                  <td>{cliente.Usuario}</td>
                  <td>{cliente.Nombre}</td>
                  <td>{cliente.APaterno}</td>
                  <td>{cliente.AMaterno}</td>
                  <td>{cliente.CorreoE}</td>
                  <td>{cliente.Telefono}</td>
                  <td>
                    <button onClick={() => abrirFormularioDeModificacion(cliente)}
                      className="modificar-boton">
                      Modificar
                    </button>
                    <button
                      onClick={() => eliminarCliente(cliente._id)}
                      className="eliminar-boton">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </center>
      {isEditModalOpen && (
        <div className="modal" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-contentt" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setIsEditModalOpen(false)}>&times;</span>
            <h2>Editar Cliente</h2>
            <form onSubmit={handleEditSubmit}>
              <label>Usuario: </label>
              <input type="text" value={editableCliente.Usuario} readOnly />
              <label>Nombre: </label>
              <input type="text" value={editableCliente.Nombre} readOnly />
              <label>Correo Electrónico: </label>
              <input type="email" value={editableCliente.CorreoE} onChange={(e) => setEditableCliente({ ...editableCliente, CorreoE: e.target.value })} />
              <label>Teléfono: </label>
              <input type="text" value={editableCliente.Telefono} onChange={(e) => setEditableCliente({ ...editableCliente, Telefono: e.target.value })} />
              <button type="submit" id='b'>Guardar Cambios</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CRUDListaClientes;
