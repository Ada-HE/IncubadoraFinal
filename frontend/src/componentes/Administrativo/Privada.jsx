import React from 'react';
import { Navigate } from 'react-router-dom';

const RutaPrivada = ({ children, rolesPermitidos }) => {
    // Se asume que el ítem en el localStorage es 'usuarios' y contiene un objeto con IdTipo
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log("Usuario en localStorage:", usuario); // Para fines de diagnóstico
  
    const tienePermiso = usuario && rolesPermitidos.includes(usuario.IdTipo);
    console.log("Tiene permiso:", tienePermiso); // Para fines de diagnóstico
  
    if (!tienePermiso) {
      console.log("Redirigiendo a login..."); // Para fines de diagnóstico
      // La propiedad 'replace' es útil para evitar que el usuario regrese a la ruta protegida con el botón atrás del navegador.
      return <Navigate to="/login" replace />;
    }
  
    return children;
};
  
export default RutaPrivada;