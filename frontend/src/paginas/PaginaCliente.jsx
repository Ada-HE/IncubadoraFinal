import React, { useState, useEffect } from 'react';
import imagen1 from '../imagenes/iconos/img_gato.avif';
import imagen2 from '../imagenes/iconos/img_veterinario.jpg';
import imagen3 from '../imagenes/iconos/fondo_empleado.jpg';

const PaginaCliente = () => {
  const imagenes = [imagen1, imagen2, imagen3];
  const [indiceImagen, setIndiceImagen] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceImagen((prevIndice) => (prevIndice + 1) % imagenes.length);
    }, 4000);

    return () => clearInterval(intervalo);
  }, []);

  const estilos = {
    contenedorPrincipal: {
      maxWidth: '100%',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#FFDAB9', 
    },
    tituloBienvenida: {
      textAlign: 'center',
      margin: '20px 0',
      color: '#CC6214'
    },
    carrusel: {
      position: 'relative', // Posicionamiento relativo para el contenedor
      maxWidth: '1000px',
      height: '500px', // Altura fija para el carrusel
      margin: '20px auto',
      overflow: 'hidden', // Oculta cualquier contenido que se desborde
    },
    imagenCarrusel: {
      width: '100%', 
      height: '100%', 
      objectFit: 'cover', // Asegura que la imagen cubra el área sin perder su aspecto
    },
    textoDescripcion: {
      background: 'rgba(255, 255, 255, 0.8)',
      padding: '20px',
      position: 'absolute',
      bottom: '10%',
      left: '50%',
      transform: 'translateX(-50%)',
      maxWidth: '80%',
    },
  };

  return (
    <div style={estilos.contenedorPrincipal}>
      <h1 style={estilos.tituloBienvenida}>Bienvenido a Huellitas Felices - Querido Usuario</h1>
      <div style={estilos.carrusel}>
        <img
          src={imagenes[indiceImagen]}
          alt="Contenido del carrusel"
          style={estilos.imagenCarrusel}
        />
        <div style={estilos.textoDescripcion}>
          <center><p>
            Este sistema está diseñado específicamente para Huellitas Felices, con el propósito de desarrollar una plataforma web interactiva para los amantes de las mascotas...
          </p></center>
        </div>
      </div>
    </div>
  );
};

export default PaginaCliente;
