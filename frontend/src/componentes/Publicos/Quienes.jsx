import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Estilos/style_quienes.css';

import imagenMision from '../../imagenes/Mision.jpeg';
import imagenVision from '../../imagenes/Vision.jpeg';
import imagenObjetivo from '../../imagenes/Objetivo.jpeg';
import imagenPoliticas from '../../imagenes/Politicas.jpeg';
import imagenAntecedentes from '../../imagenes/Antecedentes.jpeg';

const AboutSection = () => {
  const [infoQuienes, setInfoQuienes] = useState({
    misión: '',
    vision: '',
    objetivo: '',
    politicas: '',
    antecedentes: ''
  });

  useEffect(() => {
    const obtenerInfoQuienes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/quienes');
        const data = response.data.reduce((acc, item) => {
          acc[item.categorias.toLowerCase()] = item.informacion;
          return acc;
        }, {});
        setInfoQuienes(data);
      } catch (error) {
        console.error('Error al obtener la información:', error);
      }
    };
    obtenerInfoQuienes();
  }, []);

  return (
    <div className="about-section">
      <div className="section-container">
        <div className="about-content">
          <h3>Antecedentes</h3>
          <p>{infoQuienes.antecedentes}</p>
        </div>
        <img src={imagenAntecedentes} alt="Antecedentes" className="about-image" />
        
      </div>
      <div className="section-container">
        <img src={imagenMision} alt="Misión" className="about-image" />
        <div className="about-content">
          <h3> Misión</h3>
          <p>{infoQuienes.misión}</p>
        </div>
      </div>

      <div className="section-container">
        <div className="about-content">
          <h3> Visión</h3>
          <p>{infoQuienes.vision}</p>
        </div>
        <img src={imagenVision} alt="Visión" className="about-image" />
      </div>

      <div className="section-container">
        <img src={imagenObjetivo} alt="Objetivo" className="about-image" />
        <div className="about-content">
          <h3>Objetivo</h3>
          <p>{infoQuienes.objetivo}</p>
        </div>
      </div>

      <div className="section-container">
        <div className="about-content">
          <h3>Políticas</h3>
          <p>{infoQuienes.politicas}</p>
        </div>
        <img src={imagenPoliticas} alt="Políticas" className="about-image" />
      </div>


    </div>
  );
};

export default AboutSection;
