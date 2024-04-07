import React, { useEffect, useState } from 'react';

const estilos = {
    contenedor: {
        maxWidth: '100%',
        padding: '200px 40px',
    },
    tabla: {
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '20px 0',
        fontFamily: '"Segoe UI", Arial, sans-serif',
    },
    cabecera: {
        backgroundColor: '#800080',
        color: 'white',
        padding: '12px 15px',
    },
    celda: {
        border: '1px solid #ddd',
        padding: '10px 15px',
        textAlign: 'left',
        backgroundColor: 'white',
    },
    celdaImpar: {
        backgroundColor: '#f2e5ff',
    },
    titulo: {
        textAlign: 'center',
        color: '#333',
        fontFamily: '"Segoe UI", Arial, sans-serif',
        margin: '20px 0',
        fontSize: '24px',
    },
    botonEliminar: {
        cursor: 'pointer',
        backgroundColor: '#ff0000',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 10px',
    }
};

function CrudUsuarios() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/usuarios')
            .then(response => response.json())
            .then(data => setUsuarios(data))
            .catch(error => console.error("Error al cargar los usuarios:", error));
    }, []);

    const eliminarUsuario = (id) => {
        fetch(`http://localhost:3001/api/usuarios/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setUsuarios(usuarios.filter(usuario => usuario._id !== id));
            } else {
                throw new Error('Failed to delete the user.');
            }
        })
        .catch(error => {
            console.error("Error deleting user:", error);
            alert("Error deleting user.");
        });
    };

    return (
        <div style={estilos.contenedor}>
            <h2 style={estilos.titulo}>Administradores</h2>
            <table style={estilos.tabla}>
                <thead>
                    <tr>
                        <th style={estilos.cabecera}>Username</th>
                        <th style={estilos.cabecera}>Correo</th>
                        <th style={estilos.cabecera}>Password</th>
                        <th style={estilos.cabecera}>Nombre</th>
                        <th style={estilos.cabecera}>Apellido</th>
                        <th style={estilos.cabecera}>Teléfono</th>
                        <th style={estilos.cabecera}>RFC</th>
                        <th style={estilos.cabecera}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.filter(usuario => usuario.tipo.includes('administrador')).map((usuario, index) => (
                        <tr key={usuario._id} style={index % 2 === 0 ? {} : estilos.celdaImpar}>
                            <td style={estilos.celda}>{usuario.username}</td>
                            <td style={estilos.celda}>{usuario.correo}</td>
                            <td style={estilos.celda}>{usuario.password}</td>
                            <td style={estilos.celda}>{usuario.datos_administrativos?.nombre}</td>
                            <td style={estilos.celda}>{usuario.datos_administrativos?.apellido}</td>
                            <td style={estilos.celda}>{usuario.datos_administrativos?.telefono}</td>
                            <td style={estilos.celda}>{usuario.datos_administrativos?.rfc}</td>
                            <td style={estilos.celda}>
                                <button style={estilos.botonEliminar} onClick={() => eliminarUsuario(usuario._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
const CrudInsertarUsuario = () => {
    return (
      <div>
        <h1>CrudInsertarUsuario</h1>
        
      </div>
    );
  };
  
  
export  {CrudUsuarios  ,CrudInsertarUsuario};
