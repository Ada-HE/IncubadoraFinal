import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../imagenes/logo_huellitas.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../Estilos/style_inicio.css';
import {
  faHome,
  faBox,
  faSignOutAlt,
  faEllipsisH,
  faUser,
  faAddressCard,
  faMapMarkerAlt,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';

const EncabezadoPublico = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="headerStyle">
      <div className="brandContainer">
        <img src={logo} alt="Logo Huellitas Felices" className="logoStyle" />
        <span className="brandName">Huellitas Felices</span>
      </div>
      <nav className="navStyle">
        <ul className="navListStyle">
          <li className="navItemStyle">
            <Link to="/" className="navLinkStyle">
              <FontAwesomeIcon icon={faHome} className="iconStyle" />
              Inicio
            </Link>
          </li>
          <li className="navItemStyle">
            <Link to="/productos" className="navLinkStyle">
              <FontAwesomeIcon icon={faBox} className="iconStyle" />
              Productos
            </Link>
          </li>
          <li className="navItemStyle">
            <Link to="/incubes" className="navLinkStyle">
              <FontAwesomeIcon icon={faBox} className="iconStyle" />
              Incubadoras
            </Link>
          </li>
          <li className="navItemStyle">
            <Link to="/login" className="navLinkStyle">
              <FontAwesomeIcon icon={faSignOutAlt} className="iconStyle" />
              Iniciar Sesión
            </Link>
          </li>
          <li className="navItemStyle moreOptions" onMouseOver={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <FontAwesomeIcon icon={faEllipsisH} className="iconStyle" />
            {dropdownOpen && (
              <div className="dropdownContent">
                <Link to="/quienessomos" className="dropdownLinkStyle">
                  <FontAwesomeIcon icon={faUser} className="iconDropdownStyle" />
                  ¿Quiénes Somos?
                </Link>
                <Link to="/informacion" className="dropdownLinkStyle">
                  <FontAwesomeIcon icon={faAddressCard} className="iconDropdownStyle" />
                  Contáctanos
                </Link>
                <Link to="/contactanos" className="dropdownLinkStyle">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="iconDropdownStyle" />
                  Ubicación
                </Link>
                <Link to="/preguntas" className="dropdownLinkStyle">
                  <FontAwesomeIcon icon={faQuestionCircle} className="iconDropdownStyle" />
                  Preguntas Frecuentes
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default EncabezadoPublico;
