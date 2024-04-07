import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../imagenes/logo_huellitas.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPlus, faBars, faTimes, faHome, faUsers, faBox, faUser, faWifi, faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const EncabezadoAdministrativo = () => {
  // Estado para la apertura del menú principal y submenús
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [productosSubmenuOpen, setProductosSubmenuOpen] = useState(false);
  const [clientesSubmenuOpen, setClientesSubmenuOpen] = useState(false);
  const [preguntasSubmenuOpen, setPreguntasSubmenuOpen] = useState(false);
  const [quienesSubmenuOpen, setQuienesSubmenuOpen] = useState(false);

  // Nuevo estado para gestionar el hover de los enlaces
  const [hoveredLink, setHoveredLink] = useState(null);

  const cerrarSubmenus = () => {
    setProductosSubmenuOpen(false);
    setClientesSubmenuOpen(false);
    setPreguntasSubmenuOpen(false);
    setQuienesSubmenuOpen(false);
  };


  const cerrarSesion = () => {
    localStorage.removeItem('usuario'); // Asegúrate de usar la misma clave que usas para guardar el usuario
    navigate('/login'); // Redirige al usuario a la página de inicio de sesión
  };

  // Toggle para el menú principal
  const toggleMenu = () => {
    if (!menuOpen) {
      // Si el menú va a abrirse, cerramos todos los submenús
      setProductosSubmenuOpen(false);
      setClientesSubmenuOpen(false);
      setPreguntasSubmenuOpen(false);
      setQuienesSubmenuOpen(false);
    }
    setMenuOpen(!menuOpen);
  };

  const getLinkStyle = (linkName) => ({
    textDecoration: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: hoveredLink === linkName ? 'rgb(150, 134, 134)' : 'black', // Cambia el color basado en el estado
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    borderRadius: '2px',
    transition: 'color 0.3s',
    cursor: 'pointer',
  });

  // Toggle específico para submenús
  const toggleSubmenu = (submenu) => {
    // Cerrar el menú principal
    setMenuOpen(false);

    // Cerrar todos los submenús
    setProductosSubmenuOpen(false);
    setClientesSubmenuOpen(false);
    setPreguntasSubmenuOpen(false);
    setQuienesSubmenuOpen(false);

    // Abrir solo el submenú específico
    switch (submenu) {
      case 'productos':
        setProductosSubmenuOpen(true);
        break;
      case 'clientes':
        setClientesSubmenuOpen(true);
        break;
      case 'preguntas':
        setPreguntasSubmenuOpen(true);
        break;
      case 'quienes':
        setQuienesSubmenuOpen(true);
        break;
      default:
        // En caso de ningún valor conocido, no abrimos ningún submenú
        break;
    }
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
    submenu: {
      display: 'block',
      position: 'absolute',
      left: '0', // Alinea el submenú directamente debajo del elemento de Productos
      top: '100%', // El submenú empieza justo debajo del botón de Productos
      backgroundColor: '#F7C188',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      padding: '0.5rem',
      width: 'inherit', // El ancho del submenú se ajusta al contenido
      zIndex: 100, // Mantiene el submenú en la parte superior
      cursor: 'pointer',
    },
    navLink: {
      textDecoration: 'none',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: 'black',
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem 1rem',
      borderRadius: '2px',
      transition: 'background-color 0.3s',
      cursor: 'pointer',
      backgroundColor: hoveredLink === 'navLink' ? 'rgb(150, 134, 134)' : 'transparent', // Nuevo estilo de fondo
    },
    submenuLink: {
      textDecoration: 'none',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: 'black',
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem 1rem',
      borderRadius: '2px',
      transition: 'background-color 0.3s ease 0s',
      backgroundColor: hoveredLink === 'submenuLink' ? 'rgb(150, 134, 134)' : 'transparent', // Nuevo estilo de fondo
    },
    icono: {
      fontSize: '1.5rem', // Tamaño del ícono del menú de inicio hasta el de cerrar sesion
      marginRight: '1.5rem', // Espacio entre el ícono y el texto
    },
  };

  return (
    <header style={estilos.encabezado}>
      <div style={{ display: 'flex', alignItems: 'center' }}> {/* Contenedor del logo y el texto */}
        <img src={logo} alt="Logo Huellitas Felices" style={estilos.logo} />
        <span style={estilos.brandName}>Huellitas Felices</span>
      </div>
      <nav style={{ display: 'flex' }}>
        <ul style={{ display: 'flex', listStyle: 'none', paddingRight: '15px' }}>

          {/* Enlaces siempre visibles */}
          <li style={estilos.navItem}>
            <Link to="/admin"
              style={getLinkStyle('inicio')} // Usa getLinkStyle para determinar el estilo basado en el hover
              onMouseEnter={() => setHoveredLink('inicio')}
              onMouseLeave={() => setHoveredLink('')}
            >
              <FontAwesomeIcon icon={faHome} style={estilos.icono} />
              Inicio
            </Link>
          </li>
          <li style={{ ...estilos.navItem, position: 'relative' }}
            onMouseEnter={() => {
              toggleSubmenu('productos');
              setHoveredLink('productos'); // Actualiza el estado para aplicar el estilo de hover
            }}
            onMouseLeave={() => {
              cerrarSubmenus();
              setHoveredLink(''); // Restablece el estado cuando el mouse sale
            }}
          >
            <div style={getLinkStyle('productos')}>
              <FontAwesomeIcon icon={faBox} style={estilos.icono} />
              Productos
            </div>
            {productosSubmenuOpen && (
              <div style={estilos.submenu}>
                <Link to="/admin/informacion/productos/lista"
                  style={getLinkStyle('listaProductos')} // Aplica estilo dinámico
                  onMouseEnter={() => setHoveredLink('listaProductos')}
                  onMouseLeave={() => setHoveredLink('')}
                >
                  <FontAwesomeIcon icon={faList} style={estilos.icono} />
                  Lista de Productos
                </Link>
                <Link to="/admin/informacion/productos/agregar"
                  style={getLinkStyle('agregarProducto')} // Aplica estilo dinámico
                  onMouseEnter={() => setHoveredLink('agregarProducto')}
                  onMouseLeave={() => setHoveredLink('')}
                >
                  <FontAwesomeIcon icon={faPlus} style={estilos.icono} />
                  Agregar Producto
                </Link>
              </div>
            )}
          </li>
          <li style={{ ...estilos.navItem, position: 'relative' }}
            onMouseEnter={() => {
              toggleSubmenu('clientes');
              setHoveredLink('clientes'); // Establece el estado al entrar el mouse
            }}
            onMouseLeave={() => {
              cerrarSubmenus();
              setHoveredLink(''); // Restablece el estado al salir el mouse
            }}
          >
            {/* Cambia <div> por un botón o maneja el evento de click para la navegación si es necesario */}
            <div style={getLinkStyle('clientes')}>
              <FontAwesomeIcon icon={faUsers} style={estilos.icono} />
              Usuarios
            </div>
            {clientesSubmenuOpen && (
              <div style={estilos.submenu}>
                {/* Aplica el efecto hover a cada Link dentro del submenu */}
                <Link to="/admin/informacion/clientes/lista"
                  style={getLinkStyle('listaClientes')} // Usa getLinkStyle para determinar el estilo basado en el hover
                  onMouseEnter={() => setHoveredLink('listaClientes')}
                  onMouseLeave={() => setHoveredLink('')}
                >
                  <FontAwesomeIcon icon={faList} style={estilos.icono} />
                  Lista de Usuarios
                </Link>
                <Link to="/admin/informacion/clientes/agregar"
                  style={getLinkStyle('agregarEmpleado')} // Usa getLinkStyle para determinar el estilo basado en el hover
                  onMouseEnter={() => setHoveredLink('agregarEmpleado')}
                  onMouseLeave={() => setHoveredLink('')}
                >
                  <FontAwesomeIcon icon={faPlus} style={estilos.icono} />
                  Agregar Empleado
                </Link>
              </div>
            )}
          </li>
          <li style={{ ...estilos.navItem, position: 'relative' }}
            onMouseEnter={() => {
              toggleSubmenu('preguntas');
              setHoveredLink('preguntas'); // Establece el estado al entrar el mouse
            }}
            onMouseLeave={() => {
              cerrarSubmenus();
              setHoveredLink(''); // Restablece el estado al salir el mouse
            }}
          >
            <div style={getLinkStyle('preguntas')}>
              <FontAwesomeIcon icon={faUsers} style={estilos.icono} />
              Preguntas Frecuentes
            </div>
            {preguntasSubmenuOpen && (
              <div style={estilos.submenu}>
                <Link to="/admin/informacion/preguntas/lista"
                  style={getLinkStyle('listaPreguntas')} // Usa getLinkStyle para el hover
                  onMouseEnter={() => setHoveredLink('listaPreguntas')}
                  onMouseLeave={() => setHoveredLink('')}
                >
                  <FontAwesomeIcon icon={faList} style={estilos.icono} />
                  Lista de Preguntas
                </Link>
                <Link to="/admin/informacion/preguntas/agregar"
                  style={getLinkStyle('agregarPregunta')} // Usa getLinkStyle para el hover
                  onMouseEnter={() => setHoveredLink('agregarPregunta')}
                  onMouseLeave={() => setHoveredLink('')}
                >
                  <FontAwesomeIcon icon={faPlus} style={estilos.icono} />
                  Agregar Pregunta
                </Link>
              </div>
            )}
          </li>

          <li style={{ ...estilos.navItem, position: 'relative' }}
            onMouseEnter={() => {
              toggleSubmenu('quienes');
              setHoveredLink('quienes'); // Establece 'quienes' como el enlace actualmente 'hovereado'
            }}
            onMouseLeave={() => {
              cerrarSubmenus();
              setHoveredLink(''); // Restablece hoveredLink al salir el mouse, quitando el efecto hover
            }}
          >
            <div style={getLinkStyle('quienes')}>
              <FontAwesomeIcon icon={faUsers} style={estilos.icono} />
              Quiénes somos
            </div>
            {quienesSubmenuOpen && (
              <div style={estilos.submenu}>
                <Link to="/admin/informacion/quienes/lista"
                  style={getLinkStyle('listaQuienesSomos')} // Aplica el estilo de hover
                  onMouseEnter={() => setHoveredLink('listaQuienesSomos')}
                  onMouseLeave={() => setHoveredLink('')}
                >
                  <FontAwesomeIcon icon={faList} style={estilos.icono} />
                  Lista Quiénes Somos
                </Link>
                <Link to="/admin/informacion/quienes/agregar"
                  style={getLinkStyle('agregarQuienesSomos')} // Aplica el estilo de hover
                  onMouseEnter={() => setHoveredLink('agregarQuienesSomos')}
                  onMouseLeave={() => setHoveredLink('')}
                >
                  <FontAwesomeIcon icon={faPlus} style={estilos.icono} />
                  Agregar Quiénes Somos
                </Link>
              </div>
            )}
          </li>

        </ul>
        <FontAwesomeIcon
          icon={menuOpen ? faTimes : faBars}
          style={estilos.menuIcon}
          onClick={toggleMenu}
        />
        {/* Menú de navegación */}
        {menuOpen && (
          <nav style={estilos.nav} onMouseLeave={toggleMenu}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {/* Ejemplo para "Dispositivos IoT" */}
              <li style={estilos.navItem}>
                <Link to="/admin/informacion/dispositivoiot"
                  style={getLinkStyle('dispositivoIot')} // Aplica el estilo de hover
                  onMouseEnter={() => setHoveredLink('dispositivoIot')}
                  onMouseLeave={() => setHoveredLink('')}
                >
                  <FontAwesomeIcon icon={faWifi} style={estilos.icono} />
                  Dispositivos IoT
                </Link>
              </li>
              {/* Ejemplo para "Cerrar Sesión" */}
              <li style={estilos.navItem}>
                <button onClick={cerrarSesion}
                  style={{ ...getLinkStyle('cerrarSesion'), border: 'none', background: 'none' }} // Aplica el estilo de hover
                  onMouseEnter={() => setHoveredLink('cerrarSesion')}
                  onMouseLeave={() => setHoveredLink('')}
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

export default EncabezadoAdministrativo;