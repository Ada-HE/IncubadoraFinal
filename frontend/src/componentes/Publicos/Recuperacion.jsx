import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Estilos/style_recuperacion.css';

const Recuperacion = () => {
    const [correo, setCorreo] = useState('');
    const [correoEncontrado, setCorreoEncontrado] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Iniciando el proceso de recuperación para:', correo);
        try {
            const response = await axios.post('http://localhost:3001/api/recuperacion', { CorreoE: correo.trim() });
            console.log('Respuesta recibida:', response.data);
    
            if (response.data.correoEncontrado) {
                console.log('Correo encontrado en la base de datos.', response.data);
                setCorreoEncontrado(true);
                alert('Correo encontrado, siga las instrucciones para la recuperacion de contraseña');
            } else {
                console.log('Correo no encontrado.', response.data.message);
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            if (error.response) {
                console.log('Datos de la respuesta del error:', error.response.data);
                alert(error.response.data.message);
            } else {
                console.log('Error sin respuesta del servidor');
                alert('Ocurrió un error durante la recuperación.');
            }
        }   
    };
    

    const handleMetodoRecuperacion = (metodo) => {

        if (metodo === 'correo') {
            navigate('/RecuperacionCorreo', { state: { correo } });
        } else if (metodo === 'pregunta') {
            navigate('/RecuperacionPreguntaSecreta', { state: { correo } });
        }
    };

    return (
        <div className="recuperacion-container">
            {!correoEncontrado ? (
                <div className="d1">
                    <h2>Recuperación de Contraseña</h2>
                    <p>Por favor, ingresa tu correo electrónico para recibir las instrucciones de recuperación de contraseña.</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="correo">Correo Electrónico:</label>
                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            placeholder="ejemplo@correo.com"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                        />
                        <button type="submit" id='b'>Verificar</button>
                    </form>
                </div>
            ) : (
                <div className="d1">
                    <h2>Elige tu Método de Recuperación</h2>
                    <p>Selecciona cómo quieres recuperar tu contraseña:</p>
                    <br />
                    <p> Por Correo (se enviará un código a tu correo electrónico)</p>
                    <button onClick={() => handleMetodoRecuperacion('correo')} id='b'>
                        Correo Electronico
                    </button>
                    <br />
                    <p>Por Pregunta Secreta (deberás responder a tu pregunta de seguridad)</p>
                    <button onClick={() => handleMetodoRecuperacion('pregunta')} id='b'>
                        Pregunta Secreta
                    </button>
                </div>
            )}
        </div>
    );
};

export default Recuperacion;
