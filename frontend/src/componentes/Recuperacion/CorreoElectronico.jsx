import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../../Estilos/style_recuperacion.css';

var apiKey = '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';
function ValidarCorreo() {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get('http://localhost:3001/api/usuarios')
            .then((response) => {
                setUsuarios(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setErrorMessage('Error al obtener los usuarios. Por favor, inténtalo de nuevo más tarde.');
                setIsLoading(false);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const usuarioEncontrado = usuarios.find((usuario) => usuario.CorreoE === correo);

        if (usuarioEncontrado) {
            const shortUUID = uuidv4().substring(0, 6);
            try {
                await axios.patch(`http://localhost:3001/api/usuarios/${usuarioEncontrado._id}`, {
                    Token: shortUUID,
                    expira: new Date(Date.now() + 3600000).toISOString(),
                });
                const htmlContent = `
                <html>
                <head>
                <style>
                  body {
                    font-family: 'Arial', sans-serif;
                    background-color: #F6C088;
                    color: #333;
                    margin: 0;
                    padding: 0;
                  }
                  .email-container {
                    max-width: 600px;
                    margin: 40px auto;
                    background: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
                  }
                  .header {
                    background-color: rgb(56, 25, 4);
                    color: white;
                    padding: 10px;
                    text-align: center;
                    border-radius: 6px 6px 0 0;
                  }
                  .content {
                    margin-top: 20px;
                    padding: 0 15px;
                  }
                  .token {
                    font-size: 24px;
                    margin: 20px 0;
                    word-break: break-all; /* Breaks the token if it's too long */
                  }
                  .footer {
                    margin-top: 20px;
                    text-align: center;
                    padding-top: 20px;
                    border-top: 1px solid #eee;
                  }
                  .copy-button {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 15px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 10px 0;
                    cursor: pointer;
                    border: none;
                    border-radius: 4px;
                  }
                </style>
                </head>
                <body>
                  <div class="email-container">
                    <div class="header">
                      <h1>Huellitas Felices</h1>
                    </div>
                    <div class="content">
                      <h2>Código de Verificación</h2>
                      <p class="token"><strong>${shortUUID}</strong></p>
                      <button class="copy-button" onclick="navigator.clipboard.writeText('${shortUUID}')">Copiar Código</button>
                      <p>Por favor, copia y pega este código en el formulario de recuperación de contraseña para continuar con el proceso.</p>
                    </div>
                    <div class="footer">
                      <p>Gracias por confiar en Huellitas Felices.</p>
                    </div>
                  </div>
                
                  <script>
                    document.querySelector('.copy-button').addEventListener('click', function() {
                      alert('Código copiado al portapapeles');
                    });
                  </script>
                </body>
                </html>
                
                 `;

                await axios.post('https://api.sendinblue.com/v3/smtp/email', {
                    sender: { name: 'Huellitas Felices', email: 'equipomixsand@gmail.com' },
                    to: [{ email: correo }],
                    subject: 'Código de Verificación - Huellitas Felices',
                    htmlContent: htmlContent,
                }, {
                    headers: {
                        'accept': 'application/json',
                        'api-key': apiKey,
                        'Content-Type': 'application/json',
                    },
                });

                navigate('/ConfirmarToken');
            } catch (error) {
                console.error('Error al enviar el correo o actualizar el usuario:', error);
                setErrorMessage('Error al procesar la solicitud. Por favor, inténtalo de nuevo.');
            }
        } else {
            setErrorMessage('Correo no está registrado.');
        }
        setIsLoading(false);
    };

    const goBack = () => navigate(-1);

    return (
        <>
            <div className="d1">
                <ArrowLeftOutlined className="back-icones" onClick={goBack} />
                <Link to="/">
                </Link>
                <h2>Recuperar contraseña</h2>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <label htmlFor="txtcorreo">Correo Electrónico:</label>
                    <input
                        className="estiloInput"
                        type="email"
                        id="txtcorreo"
                        value={correo}
                        placeholder="Inserte correo"
                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                    <button type="submit" id="b" disabled={isLoading}>
                        {isLoading ? 'Enviando...' : 'Validar Correo'}
                    </button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {isLoading && <p>Cargando...</p>}
            </div>
        </>
    );
}

export default ValidarCorreo;
