import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../Estilos/style_preguntaSecreta.css';

const CambiarContra = () => {
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [confirmacionContrasena, setConfirmacionContrasena] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [correo, setCorreo] = useState('');

    // useEffect se encargará de verificar si hay un correo cuando el componente se monte
    useEffect(() => {
        if(location.state && location.state.correo) {
            setCorreo(location.state.correo);
        } else {
            alert('No se proporcionó la información de correo electrónico.');
            navigate('/'); // Redirigir al inicio o a la página de login
        }
    }, [location, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nuevaContrasena !== confirmacionContrasena) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        if (!nuevaContrasena || !confirmacionContrasena) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        try {
            await axios.post(`http://localhost:3001/api/cambiarContra`, { CorreoE: correo, nuevaContrasena });
            alert('Contraseña cambiada con éxito.');
            navigate('/login'); // Redirige a la pantalla de login
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            alert('Hubo un problema al cambiar tu contraseña. Por favor, intenta nuevamente.');
        }
    };

    // Verificamos si ya tenemos un correo antes de renderizar el formulario
    if(!correo) return null;

    return (
        <div className="d1">
            <h2 className="formulario-titulo">Cambiar Contraseña</h2>
            <form className="formulario" onSubmit={handleSubmit}>
                <label htmlFor="nuevaContrasena" className="formulario-label">Nueva Contraseña</label>
                <input
                    type="password"
                    id="nuevaContrasena"
                    className="formulario-input"
                    placeholder="Nueva contraseña"
                    value={nuevaContrasena}
                    onChange={(e) => setNuevaContrasena(e.target.value)}
                    required
                />

                <label htmlFor="confirmacionContrasena" className="formulario-label">Confirmar Nueva Contraseña</label>
                <input
                    type="password"
                    id="confirmacionContrasena"
                    className="formulario-input"
                    placeholder="Confirmar nueva contraseña"
                    value={confirmacionContrasena}
                    onChange={(e) => setConfirmacionContrasena(e.target.value)}
                    required
                />

                <button type="submit" id='b' className="formulario-boton">Cambiar Contraseña</button>
            </form>
        </div>
    );
};

export default CambiarContra;
