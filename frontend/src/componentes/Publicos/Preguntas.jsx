  import React, { useState, useEffect } from 'react';
  import '../../Estilos/style_preguntas.css';

  const Preguntas = () => {
    const [faqs, setFaqs] = useState([]);
    const [activa, setActiva] = useState(null);

    useEffect(() => {
      const fetchFaqs = async () => {
        try {
          const respuesta = await fetch('http://localhost:3001/api/preguntasfrecuentes');
          const faqs = await respuesta.json();
          setFaqs(faqs);
        } catch (error) {
          console.error('Error al cargar las preguntas frecuentes:', error);
        }
      };

      fetchFaqs();
    }, []);

    const toggleActivacion = (index) => {
      setActiva(activa === index ? null : index);
    };

    return (
      <div className="faq-container">
        <h2>Preguntas Frecuentes</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${activa === index ? 'activa' : ''}`} onClick={() => toggleActivacion(index)}>
              <div className="faq-pregunta">
                {faq.pregunta}
                <span className="faq-toggle">{activa === index ? '-' : '+'}</span>
              </div>
              <div className="faq-respuesta" style={{ display: activa === index ? 'block' : 'none' }}>
                {faq.respuesta}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default Preguntas;
