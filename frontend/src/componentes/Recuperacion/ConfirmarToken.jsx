import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Estilos/style_confirmacion.css'; // Asegúrate de tener este archivo CSS

function ConfirmarToken() {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const verificarToken = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:3001/api/ValidarToken', {
                token: token.trim(),
            });

            console.log('Respuesta del servidor:', response.data);
            if (response.data.esValido) {
                navigate('/CambiarContra_token', {
                    state: {
                        token: token,
                        usuarioId: response.data.usuarioId 
                    } 
                });
            } else {
                setError('Token inválido o expirado.');
            }
        } catch (e) {
            console.error('Error en la solicitud:', e.response ? e.response.data : e.message);
            setError('Error al validar el token: ' + (e.response ? e.response.data.message : e.message));
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="confirmacion-container">
            <h2>Confirmar Token</h2>
            <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Ingrese el token recibido"
                disabled={loading}
            />
            <button onClick={verificarToken}  disabled={loading || !token}>
                {loading ? 'Verificando...' : 'Confirmar Token'}
            </button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default ConfirmarToken;
