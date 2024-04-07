import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../Estilos/style_preguntaSecreta.css';

const RecuperacionPreguntaSecreta = () => {
    const [pregunta, setPregunta] = useState('');
    const [respuesta, setRespuesta] = useState('');
    const [intentos, setIntentos] = useState(3); // Iniciar con 3 intentos
    const location = useLocation();
    const navigate = useNavigate();
    const { correo } = location.state;

    useEffect(() => {
        fetchPreguntaSecreta();
    }, [correo]);

    const fetchPreguntaSecreta = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/recuperacion-pregunta?CorreoE=${correo}`);
            setPregunta(response.data.preguntaSecreta);
        } catch (error) {
            console.error('Error al obtener la pregunta secreta:', error);
            alert('No se pudo obtener la pregunta secreta.');
        }
    };

    const handleSubmitRespuesta = async (e) => {
        e.preventDefault();
        if (intentos > 0) {
            try {
                const response = await axios.post(`http://localhost:3001/api/validar`, { CorreoE: correo, respuesta });
                console.log('Respuesta recibida:', response.data);
    
                if (response.data.esCorrecta) {
                    alert('Respuesta correcta.');
                    navigate('/CambiarContra', { state: { correo } }); // Pasa el correo al estado de navegación
                    return;
                }
                
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    const nuevosIntentos = intentos - 1;
                    setIntentos(nuevosIntentos);
    
                    if (nuevosIntentos <= 0) {
                        alert('No te quedan más intentos. Serás redirigido a la página de inicio.');
                        navigate('/');
                    } else {
                        alert('Respuesta incorrecta. Intentos restantes: ' + nuevosIntentos);
                    }
                    return; // Asegúrate de salir de la función aquí para evitar ejecutar código adicional innecesariamente
                }
                console.error('Error al validar la respuesta:', error);
                alert('Ocurrió un error al validar tu respuesta.');
            }
        } else {
            alert('No te quedan más intentos. Serás redirigido a la página de inicio. Revisa bien tu informacion y vuelve a intentarlo');
            navigate('/'); // Redirigir al inicio o a la página de login.
        }
    };
    
    
    return (
        <div className="d1">
            <h2 className="formulario-titulo">Recuperación de Contraseña por Pregunta Secreta</h2>
            {pregunta && (
                <form className="formulario" onSubmit={handleSubmitRespuesta}>
                    <label htmlFor="respuesta" className="formulario-label">{pregunta}</label>
                    <input
                        type="text"
                        id="respuesta"
                        className="formulario-input"
                        placeholder="Tu respuesta"
                        value={respuesta}
                        onChange={(e) => setRespuesta(e.target.value)}
                        required
                    />
                    <button type="submit"  id='b' className="formulario-boton">Validar Respuesta</button>
                </form>
            )}
            <p className="intentos-info">Intentos restantes: {intentos}</p>
        </div>
    );
};

export default RecuperacionPreguntaSecreta;
