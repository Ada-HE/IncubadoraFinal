import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../imagenes/logo_huellitas.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faBox, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const EncabezadoPublico = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleMouseEnter = () => {
    setMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setMenuOpen(false);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuario'); // Asegúrate de usar la misma clave que usas para guardar el usuario
    navigate('/login'); // Redirige al usuario a la página de inicio de sesión
  };

  const estilos = {
    encabezado: {
      backgroundColor: '#F7C188',
      display: 'flex',
      justifyContent: 'space-between', // Alinear elementos a los extremos
      alignItems: 'center',
      padding: '0.7rem',
      position: 'relative',
    },
    menuIcon: {
      cursor: 'pointer',
      fontSize: '2.5rem', // Tamaño del icono de menú
      color: 'black', // Color del icono de menú
    },
    logo: {
      height: '80px',
      marginRight: '1rem',
      zIndex: 10, // Asegurar que el logo esté por debajo del menú
    },
    brandName: {
      fontSize: '2rem',
      color: 'black',
      fontWeight: 'bold',
      display: 'block',
      marginBottom: '0.5rem',
      zIndex: 10, // Asegurar que el texto esté por debajo del menú
    },
    nav: {
      width: '25%;', // Ancho del menú
      height: '300%;', // Alto del menú
      position: 'absolute',
      top: '100%',
      right: '0', // Alinear a la derecha
      backgroundColor: '#F7C188', // Fondo blanco del menu que se desplaza
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Sombra sutil
      padding: '1rem',
      margin: '0',
      display: menuOpen ? 'block' : 'none',
      zIndex: 99, // Asegurar que el menú esté por encima de otros elementos
    },
    navItem: {
      margin: '0', // Eliminar el margen izquierdo de los elementos de la lista
    },
    navLink: {
      textDecoration: 'none',
      fontSize: '1.2rem', // Tamaño del texto del menú
      fontWeight: 'bold',
      color: 'black', // Color del texto del menú
      display: 'flex', // Mostrar ícono y texto en línea
      alignItems: 'center', // Alinear ícono y texto verticalmente
      padding: '0.5rem 1rem', // Añadir espacio alrededor del texto
      borderRadius: '2px', // Agregar bordes redondeados
      transition: 'background-color 0.3s', // Transición de color de fondo
    },
    icono: {
      fontSize: '1.5rem', // Tamaño del ícono del menú de inicio hasta el de cerrar sesion
      marginRight: '1.5rem', // Espacio entre el ícono y el texto
    },
  };
  // Definimos el estilo base y el estilo para hover
  const baseStyle = {
    textDecoration: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    borderRadius: '2px',
    transition: 'color 0.3s',
  };

  const hoverStyle = {
    color: 'rgb(150, 134, 134)', // Este será el color del texto al hacer hover
  };

  // Aplicamos el estilo base y añadimos el estilo de hover basado en el estado
  const getStyle = (itemName) => ({
    ...baseStyle,
    ...(hoveredItem === itemName ? hoverStyle : {}),
  });
 return (
  <header style={estilos.encabezado} onMouseLeave={handleMouseLeave}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={logo} alt="Logo Huellitas Felices" style={estilos.logo} />
      <span style={estilos.brandName}>Huellitas Felices</span>
    </div>

    <nav style={{ display: 'flex' }}>
      <ul style={{ display: 'flex', listStyle: 'none', paddingRight: '15px' }}>
        <li style={estilos.navItem}>
          <Link
            to="/cliente"
            style={getStyle('inicio')}
            onMouseEnter={() => setHoveredItem('inicio')}
            onMouseLeave={() => setHoveredItem('')}
          >
            <FontAwesomeIcon icon={faHome} style={estilos.icono} />
            Inicio
          </Link>
        </li>
       
        <li style={estilos.navItem}>
          <Link
            to="/cliente/informacion/dispositivos"
            style={getStyle('dispositivoIot')}
            onMouseEnter={() => setHoveredItem('dispositivoIot')}
            onMouseLeave={() => setHoveredItem('')}
          >
            <FontAwesomeIcon icon={faBox} style={estilos.icono} />
            Dispositivo IoT
          </Link>
        </li>
      </ul>
      {/* Opciones que se despliegan */}
      <FontAwesomeIcon
        icon={menuOpen ? faTimes : faBars}
        style={estilos.menuIcon}
        onMouseEnter={handleMouseEnter}
      />
      {menuOpen && (
        <nav style={estilos.nav} onMouseLeave={handleMouseLeave}>
          <ul style={{ listStyle: 'none', paddingRight: '10px' }}>
            <li style={estilos.navItem}>
              <Link
                to="/cliente/informacion/perfil"
                style={getStyle('perfil')}
                onMouseEnter={() => setHoveredItem('perfil')}
                onMouseLeave={() => setHoveredItem('')}
              >
                <FontAwesomeIcon icon={faUser} style={estilos.icono} />
                Perfil
              </Link>
            </li>
            <li style={estilos.navItem}>
              <button
                onClick={cerrarSesion}
                style={{ ...getStyle('cerrarSesion'), border: 'none', background: 'none' }}
                onMouseEnter={() => setHoveredItem('cerrarSesion')}
                onMouseLeave={() => setHoveredItem('')}
              >
                <FontAwesomeIcon icon={faSignOutAlt} style={estilos.icono} />
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  </header>
);

};

export default EncabezadoPublico;