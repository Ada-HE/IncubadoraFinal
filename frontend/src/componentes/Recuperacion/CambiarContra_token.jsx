import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../Estilos/style_preguntaSecreta.css';

const CambiarContrasena = () => {
    const navigate = useNavigate();
    const { state } = useLocation(); // No es necesario llamar a useLocation() dos veces
    const usuarioId = state?.usuarioId; // Cambié esto para usar el _id que se debe pasar desde ConfirmarToken
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [confirmacionContrasena, setConfirmacionContrasena] = useState('');
    const [error, setError] = useState('');
    const [cambioExitoso, setCambioExitoso] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nuevaContrasena !== confirmacionContrasena) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        if (!usuarioId) {
            setError('No se proporcionó el identificador del usuario.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/cambiarContraT', {
                usuarioId: usuarioId,
                nuevaContrasena: nuevaContrasena
            });

            if (response.data.message) {
                setCambioExitoso(true);
                setError('');
                navigate('/login', { replace: true });
            } else {
                setError(response.data.message || 'Error desconocido al cambiar la contraseña.');
            }
        } catch (error) {
            setError('Hubo un problema al cambiar la contraseña. Por favor, inténtalo de nuevo.');
            console.error('Error al cambiar la contraseña:', error.response?.data || error);
        }
    };


    if (cambioExitoso) {
        return (
            <div className="d1">
                <h2 className="formulario-titulo">Cambio de Contraseña Exitoso</h2>
                <p className="exito-mensaje">Tu contraseña ha sido cambiada con éxito.</p>
                <button onClick={() => navigate('/login')} className="formulario-boton">
                    Iniciar Sesión
                </button>
            </div>
        );
    }

    return (
        <div className="d1">
            <h2 className="formulario-titulo">Cambiar Contraseña</h2>
            <form className="formulario" onSubmit={handleSubmit}>
                {error && <p className="error-mensaje">{error}</p>}
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

export default CambiarContrasena;
