import React, { useState } from 'react';
import '../../Estilos/style_preguntasFAQ.css';

function PreguntasFrecuentes() {
  const [respuesta, setRespuesta] = useState('');
  const [pregunta, setPregunta] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [esExito, setEsExito] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMensaje(''); 

    if (!pregunta.includes('?')) {
      setEsExito(false);
      setMensaje('La pregunta debe incluir signos de interrogación.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/preguntasfrecuentes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pregunta, respuesta }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Pregunta insertada:', data);
      setPregunta('');
      setRespuesta('');
      setEsExito(true);
      setMensaje('Pregunta insertada con éxito!');
    } catch (error) {
      console.error('Error al insertar pregunta:', error);
      setEsExito(false);
      setMensaje('Error al insertar pregunta. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="formulario-contacto-container">
      <form onSubmit={handleSubmit}>
        <h2>Administración de preguntas frecuentes</h2>
        <label>Pregunta</label>
        <input
          type="text"
          placeholder="Escribe tu pregunta aquí"
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
        />
        <label>Respuesta</label>
        <textarea
          placeholder="Escribe la respuesta aquí"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
        ></textarea>
        <button type="submit" id='b'>Enviar</button>
        {mensaje && (
          <div className={`mensaje ${esExito ? 'mensaje-exito' : 'mensaje-error'}`}>
            {mensaje}
          </div>
        )}
      </form>
    </div>
  );
};

export default PreguntasFrecuentes;
