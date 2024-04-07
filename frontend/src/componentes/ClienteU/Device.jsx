import React, { useState, useEffect } from 'react';
import axios from 'axios'; import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación
import '../../Estilos/style_Iot_cliente.css';
import ledLightOnImage from '../../imagenes/led_1.png'; // Asegúrate de tener esta imagen
import ledLightOffImage from '../../imagenes/led_2.png'; // Asegúrate de tener esta imagen
import { useParams } from 'react-router-dom';

const LedWidget = ({ claveDispositivo, ledId }) => {
  const [isOn, setIsOn] = useState(false);

  // Fetch LED state from the backend
  const fetchLedState = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/dispositivos/estado/${claveDispositivo}`);
      if (response.data && response.data.estados && ledId in response.data.estados) {
        setIsOn(response.data.estados[ledId]);
      }
    } catch (error) {
      console.error('Error al obtener el estado del LED:', error);
    }
  };

  useEffect(() => {
    fetchLedState();
    // Intervalo para actualizar el estado del LED
    const intervalId = setInterval(fetchLedState, 1000); // Ajusta según necesidad
    return () => clearInterval(intervalId);
  }, [claveDispositivo, ledId]);

  const toggleLed = async () => {
    const newState = !isOn;
    setIsOn(newState); // Cambia el estado optimistamente

    try {
      await axios.post('http://localhost:3001/api/dispositivos/comando', {
        claveDispositivo,
        comando: `${ledId.toUpperCase()}:${newState ? 'ON' : 'OFF'}`,
      });
    } catch (error) {
      console.error('Error al cambiar el estado del LED:', error);
      // Opcionalmente, revertir el cambio si el comando falló
      setIsOn(!newState);
    }
  };
  return (
    <div className="card">
      <h2>Foco {ledId.toUpperCase()}</h2>
      <img
        style={{ width: '150px' }}
        src={isOn ? ledLightOnImage : ledLightOffImage}
        alt={`Foco ${ledId.toUpperCase()} ${isOn ? 'encendido' : 'apagado'}`}
        onClick={toggleLed}
      />
      <button className={`led-button ${isOn ? 'on' : 'off'}`} onClick={toggleLed}>
        {isOn ? 'Apagar' : 'Encender'}
      </button>
    </div>
  );
};



const TemperatureWidget = ({ temperatura }) => {
  // Redondea la temperatura a un decimal
  const roundedTemp = Math.round(temperatura * 10) / 10;
  const [temperature, setTemperature] = useState(temperatura); // Puedes cambiar esto para probar diferentes temperaturas
  const fillHeight = ((roundedTemp - 18) / (45 - 18)) * 130;

  // Determinar el color en función del rango de temperatura
  let fillColor;
  if (temperature < 30) {
    fillColor = '#007bff'; // Azul para temperaturas bajas
  } else if (temperature >= 30 && temperature <= 37) {
    fillColor = '#4CAF50'; // Verde para temperaturas medias
  } else {
    fillColor = '#dc3545'; // Rojo para temperaturas altas
  }

  return (
    <div className="card temperature-card">
      <h2>Temperatura</h2>
      <svg width="50" height="160" viewBox="0 0 50 160" className="temperature-svg">
        <rect x="15" y="10" width="20" height="130" rx="10" ry="10" fill="none" stroke="#ccc" strokeWidth="2" />
        <rect x="15" y={140 - fillHeight} width="20" height={fillHeight} rx="10" ry="10" fill={fillColor} />
        <circle cx="25" cy="140" r="15" fill={fillColor} />
      </svg>
      <p>{roundedTemp} °C</p>
    </div>
  );
};


const HumidityWidget = ({ humedad }) => {

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = ((100 - humedad) / 100) * circumference;
  return (
    <div className="card">
      <h2>Humedad</h2>
      <div className="humidity-indicator">
        <div className="humidity-widget">
          <svg width="120" height="120" className="humidity-circle">
            <circle
              stroke="#e6e6e6"
              fill="transparent"
              strokeWidth="10"
              r={radius}
              cx="60"
              cy="60"
            />
            <circle
              stroke="#00f"
              fill="transparent"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              r={radius}
              cx="60"
              cy="60"
            />
          </svg>
          <div className="humidity-percentage">{humedad}%</div>
        </div>
        <div style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <center>          <p>{humedad} %</p>
          </center>
        </div>
      </div>
    </div>
  );
};

const TankStatusWidget = ({ nivel }) => {
  let tankLevelPercentage;
  let tankColor;

  switch (nivel) {
    case "Muy lleno":
      tankLevelPercentage = 90;
      tankColor = "#0033cc";
      break;
    case "Lleno":
      tankLevelPercentage = 70;
      tankColor = "#3366ff";  
      break;
    case "Medio":
      tankLevelPercentage = 40;
      tankColor = "#339933";
      break;
    case "Bajo":
      tankLevelPercentage = 20;
      tankColor = "#ff9933";
      break;
    case "Vacío":
      tankLevelPercentage = 2;
      tankColor = "#cc3300";
      break;
    default:
      tankLevelPercentage = 0;
      tankColor = "#808080";
  }
  const tankWaterStyle = {
    backgroundImage: `
      linear-gradient(rgba(255, 255, 255, 0.3) 50%, transparent 50%),
      linear-gradient(90deg, rgba(255, 255, 255, 0.3) 50%, transparent 50%),
      linear-gradient(${tankColor}, ${tankColor})`,
    backgroundSize: '40px 40px, 40px 40px, 100% 100%',
    animation: 'moveWaves 3s linear infinite',
    height: `${tankLevelPercentage}%`,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    transition: 'height 0.3s ease-in-out, background-color 0.3s ease-in-out',
    borderRadius: '0 0 8px 8px',
  };

  const containerStyle = {
    border: '3px solid #ccc',
    height: '300px',
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
    width: '180px',
    backgroundColor: '#e6f7ff',
    boxShadow: 'inset 0 -3px 3px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column-reverse',
    margin: '10px',
  };

  const tankWaterAnimation = `
    @keyframes moveWaves {
      0% {
        background-position: 0 0, 0 0, 0 0;
      }
      100% {
        background-position: 400px 0, 200px 0, 0 0;
      }
    }
  `;
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(tankWaterAnimation, styleSheet.cssRules.length);
  }, []);

  return (
    <div className="card">
      <h2>Estado del Tanque</h2>
      <div className="tank-status-container" style={containerStyle}>
        <div className="tank-water" style={tankWaterStyle}></div>
      </div>
      <p>Nivel del Tanque: {nivel}</p>
    </div>
  );
};



const Decive = () => {
  const { claveDispositivo } = useParams();
  const [dispositivo, setDispositivo] = useState();
  const navigate = useNavigate();

  // Función para obtener los datos del dispositivo desde el backend
  const fetchDeviceData = () => {
    axios.get(`http://localhost:3001/api/incubadora/${claveDispositivo}`)
      .then(response => {
        console.log('Datos del dispositivo obtenidos:', response.data);
        setDispositivo(response.data); // Actualiza el estado con los nuevos datos
      })
      .catch(error => {
        console.error('Error al obtener la información del dispositivo', error);
      });
  };

  useEffect(() => {
    fetchDeviceData();
    const intervalId = setInterval(fetchDeviceData, 500); // Establecer el intervalo para actualizar cada segundo
    return () => clearInterval(intervalId);
  }, [claveDispositivo]);

  if (!dispositivo) {
    return <p>Cargando información del dispositivo...</p>;
  }
  const { estados, sensores } = dispositivo;
  const tankLevel = estados.tanque;


  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="control-page">
        <button onClick={goBack} className="back-button">Atrás</button>
        <div className='name'><h1>{dispositivo.nombre}</h1></div>
        <div className="device">
          <div className="device-info">
            <img className="product-image" src={dispositivo.imagenUrl} alt="Incubadora" />
          </div>
          <div className="device-controls">
            <div className='p1'>
              <div className='device-focos'>
                {dispositivo && dispositivo.estados && (
                  <>
                    <LedWidget
                      claveDispositivo={claveDispositivo}
                      ledId="led1"
                      estadoInicial={dispositivo.estados.led1}
                    />
                    <LedWidget
                      claveDispositivo={claveDispositivo}
                      ledId="led2"
                      estadoInicial={dispositivo.estados.led2}
                    />
                  </>
                )}

            </div>
            <div className='device-tem'>
              <TemperatureWidget temperatura={sensores.temperatura} />
              <HumidityWidget humedad={sensores.humedad} />
            </div>
          </div>
          <div className='p2'>
            <div className='device-tnq'>
              <TankStatusWidget nivel={tankLevel} />
            </div></div>

        </div>
      </div>
    </div>
    </div >
  );
};
export default Decive;

