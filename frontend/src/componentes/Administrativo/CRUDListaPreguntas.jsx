import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListaPreguntasFrecuentes() {
    const [preguntas, setPreguntas] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editablePregunta, setEditablePregunta] = useState({});
    useEffect(() => {
        fetchPreguntasFrecuentes();
    }, []);

    const fetchPreguntasFrecuentes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/preguntasfrecuentes');
            setPreguntas(response.data);
        } catch (error) {
            console.error('Error al cargar las preguntas frecuentes:', error);
        }
    };

    const eliminarPregunta = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/preguntasfrecuentes/${id}`);
            fetchPreguntasFrecuentes(); // Recargar las preguntas después de eliminar
        } catch (error) {
            console.error('Error al eliminar la pregunta:', error);
        }
    };
    const abrirModalEdicion = (pregunta) => {
        setEditablePregunta(pregunta);
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/api/preguntasfrecuentes/${editablePregunta._id}`, {
                pregunta: editablePregunta.pregunta, // No se edita pero se envía para evitar problemas en el backend
                respuesta: editablePregunta.respuesta,
            });

            if (response.status === 200) {
                fetchPreguntasFrecuentes(); // Recargar las preguntas después de editar
                setIsEditModalOpen(false);
            }
        } catch (error) {
            console.error('Error al actualizar la pregunta:', error);
        }
    };

    return (
        <center>
        <div className="form-table-container">
                <h2> Preguntas Frecuentes</h2>
                <table className="form-table">
                    <thead>
                        <tr>
                            <th>Pregunta</th>
                            <th>Respuesta</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {preguntas.map((pregunta) => (
                            <tr key={pregunta._id}>
                                <td>{pregunta.pregunta}</td>
                                <td>{pregunta.respuesta}</td>
                                <td>
                                    <button
                                        onClick={() => abrirModalEdicion(pregunta)}
                                        className="editar-boton" id='modificarB'>
                                        Modificar
                                    </button>
                                    <button
                                        onClick={() => eliminarPregunta(pregunta._id)}
                                        className="eliminar-boton" id='eliminarB'>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isEditModalOpen && (
                <div className="modal">
                    <div className="modal-content" style={{maxWidth:'500px'}}>
                        <span className="close" onClick={() => setIsEditModalOpen(false)}>&times;</span>
                        <h2>Editar Respuesta</h2>
                        <form onSubmit={handleEditSubmit}>
                            <label>Pregunta:</label>
                            <textarea value={editablePregunta.pregunta} readOnly />
                            <label>Respuesta:</label>
                            <textarea
                                value={editablePregunta.respuesta}
                                onChange={(e) => setEditablePregunta({ ...editablePregunta, respuesta: e.target.value })}
                            />
                            <button type="submit" id='b' >Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            )}
        </center>
    );
}

export default ListaPreguntasFrecuentes;
