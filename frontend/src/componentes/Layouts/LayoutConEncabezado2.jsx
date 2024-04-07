// En src/componentes/LayoutConEncabezado.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import EncabezadoPublico from '../Compartidos/EncabezadoPublico';
import EncabezadoCliente from '../Compartidos/EncabezadoCliente';
import PieDePagina from '../Compartidos/PieDePagina';

const LayoutConEncabezado2 = ({ children }) => {
  const location = useLocation();
  const mostrarEncabezadoPublico2 = !location.pathname.startsWith('/cliente');

  return (
    <>
      {mostrarEncabezadoPublico2 ? <EncabezadoPublico /> : <EncabezadoCliente /> }
      <div>{children}</div>
      <PieDePagina />
    </>
  );
};

export default LayoutConEncabezado2;
