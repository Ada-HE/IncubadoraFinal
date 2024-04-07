import React, { useState, useEffect } from 'react';
import { FacebookOutlined, InstagramOutlined, WhatsAppOutlined, TikTokOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../../Estilos/style_PieDePagina.css';
import axios from 'axios';


const PieDePagina = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quienesSomos, setQuienesSomos] = useState([]);

  useEffect(() => {
    // Obtener datos de la colección "quienes" de la base de datos
    const fetchQuienesSomos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/quienes');
        setQuienesSomos(response.data);
      } catch (error) {
        console.error('Error al obtener la información de Quiénes Somos:', error);
      }
    };

    fetchQuienesSomos();
  }, []);

  const abrirModalQuienesSomos = () => setIsModalOpen(true);
  const cerrarModalQuienesSomos = () => setIsModalOpen(false);

  return (
    <>
      <footer className="footer">
        <div className="footer-column">
          <h3>HORARIOS</h3>
          <p>Lunes a Viernes: 9:00 AM - 8:00 PM</p>
          <p>Sábados: 10:00 AM - 6:00 PM</p>
          <p>Domingos y Festivos: 10:00 AM - 4:00 PM</p>
        </div>
        <div className="footer-column">
          <h3>Acerca de Huellitas Felices</h3>
          <p>Brindamos el mejor cuidado y servicios para tu mascota, ofreciendo una experiencia inigualable y personalizada para cada uno de nuestros amigos peludos.</p>
        </div>
        <div className="footer-column footer-links">
          <Link to="#" onClick={abrirModalQuienesSomos} style={{color:'white'}}>¿Quiénes Somos?</Link>
          <br />
          <h3>SÍGUENOS</h3>
          <div>
            <FacebookOutlined className="footer-icon" />
            <InstagramOutlined className="footer-icon" />
            <WhatsAppOutlined className="footer-icon" />
            <TikTokOutlined className="footer-icon" />
          </div>
        </div>
      </footer>

      {isModalOpen && (
        <div className="modal-overlay" onClick={cerrarModalQuienesSomos}>
          <div className="modal-contente" onClick={e => e.stopPropagation()}>
            <h2>Quiénes Somos</h2>
            {quienesSomos.map((item, index) => (
              <div key={index}>
                <h3>◈    {item.categorias}</h3>
                <p>{item.informacion}</p>
              </div>
            ))}
            <button onClick={cerrarModalQuienesSomos} id='b' >Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default PieDePagina;
