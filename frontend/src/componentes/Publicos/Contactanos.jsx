import React, { useEffect, useRef } from 'react';
import '../../Estilos/syle_contactanos.css';
import ubicacionImage from '../../imagenes/iconos/img_ubicacion.jpg';

const Contactanos = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const loadMapTilerScript = () => {
      if (window.maptilersdk && window.maptilersdk.Map) {
        iniciarMapa();
      } else {
        const script = document.createElement('script');
        script.src = 'https://cdn.maptiler.com/maptiler-sdk-js/v1.2.0/maptiler-sdk.umd.min.js';
        script.async = true;
        script.onload = iniciarMapa;
        document.head.appendChild(script);
      }
    };

    loadMapTilerScript();
    return () => {
      delete window.iniciarMapa;
    };
  }, []);

  const iniciarMapa = () => {
    window.maptilersdk.config.apiKey = 'MViS0oJvROOLB1yOho0l';

    const map = new window.maptilersdk.Map({
      container: mapContainerRef.current,
      style: window.maptilersdk.MapStyle.STREETS,
      center: [-98.400565, 21.147154],
      zoom: 16,
    });
    mapRef.current = map;

    const marker = new window.maptilersdk.Marker()
    .setLngLat([-98.400565, 21.147154])
    .addTo(map);
  };




  const estiloContenedor = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    padding: '3.8rem',
  };

  const estiloCajaMapa = {
    flexGrow: 2,
    marginRight: '1rem',
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    height: '600px', 
    width: '80%', 
  };

  const estiloCajaSucursales = {
    flexGrow: 1,
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };
  const estiloUbicacion = {
    position: 'relative', 
    zIndex: 0, 
    padding: '1rem',
    borderRadius: '8px',

  };


  const estiloMapa = {
    width: '93%',
    height: 'calc(80% - 2rem)',
    position: 'absolute',
    top: '7rem', 
    left: '3%', 
    right: '6%', 
    zIndex: 1,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',


  };

  return (
    <div style={estiloContenedor}>
      <div style={estiloCajaMapa}>
        <div ref={mapContainerRef} style={estiloMapa}></div>
        <div style={estiloUbicacion}> 
          <h2 className="subtitulo">Ubicación</h2>
        </div>
      </div>
      <div style={estiloCajaSucursales}>
        <h2 className="subtitulo">Sucursales</h2>
        <div className="menu-items">
          <div className="d2" style={{ margin: '10px' }}>
            <p className="Psistema">
              <strong>Dirección:</strong>  
              <p>Calle Principal, Los Prados, 43000 Huejutla de Reyes, Hidalgo.</p>
              <p>A un lado de la capilla cerca del CBTa5 entre calle Gardenias</p>
              <p>4HWX+VQ4 Huejutla de Reyes, Hidalgo</p>
              <p>Coordenadas GPS: 21°08'49.7"N 98°24'02.0"W</p><br />
              <strong>CENTRO: <br /> <img src={ubicacionImage} alt="Ubicación" style={{ width: '50%', height: 'auto' }} /> </strong><br />

              <strong>TELÉFONO:</strong> +52 1 771 356 5486<br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactanos;