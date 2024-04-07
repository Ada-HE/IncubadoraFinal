import React, { useState } from 'react';
import '../../Estilos/style_consultaReporte.css'; 

const CrudReportes = () => {
  // Estado para la dirección ingresada en el formulario
  const [direccion, setDireccion] = useState('');

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí lógica para enviar la dirección al backend y generar el reporte
    console.log('Generar reporte para la dirección:', direccion);
  };

  // Manejador del cambio de input
  const handleInputChange = (e) => {
    setDireccion(e.target.value);
  };
  return (
    <div className="form-container">
      <form class="form" style={{padding: '20px'}}
     onSubmit={handleSubmit}>
        <h2>REPORTES POR DIRECCION</h2>
        <div className="form-2">
          <label htmlFor="nombre">Direccion:</label>
          <br />
          <input
            type="text"
            id="nombre"
            name="txtRdireccion"
            required
            value={direccion}
            onChange={handleInputChange}
          /><br /><br />
        </div>
        
        <div className="form-group">
         <center><button type="submit" className="submit-button" id="b">Generar</button></center> 
        </div>
      </form>
      <br />
    </div>
  );
};

export default CrudReportes;
