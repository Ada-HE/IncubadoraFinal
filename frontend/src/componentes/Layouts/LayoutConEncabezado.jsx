// En src/componentes/LayoutConEncabezado.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import EncabezadoPublico from '../Compartidos/EncabezadoPublico';
import EncabezadoAdministrativo from '../Compartidos/EncabezadoAdministrativo';
import EncabezadoCliente from '../Compartidos/EncabezadoCliente';
import PieDePagina from '../Compartidos/PieDePagina';
import '../../Estilos/Style_LayoutConEncabezado.css'

const LayoutConEncabezado = ({ children }) => {
  const location = useLocation();
  const mostrarEncabezadoPublico = !location.pathname.startsWith('/admin') && !location.pathname.startsWith('/cliente');

  return (
    <div className="layout-container">
      {mostrarEncabezadoPublico ? <EncabezadoPublico /> : location.pathname.startsWith('/cliente') ? <EncabezadoCliente /> : <EncabezadoAdministrativo />}
      <div className="content-wrap">{children}</div>
      <PieDePagina className="footer" />
    </div>
  );
};

export default LayoutConEncabezado;
