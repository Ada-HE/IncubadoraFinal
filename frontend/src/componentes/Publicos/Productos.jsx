import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Estilos/style_catalogo.css';

const Producto = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/productos');
        setProductos(response.data); 
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);

  const openModal = (producto) => {
    setSelectedProductDetails(producto);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const productosPorPagina = 20;
  const [paginaActual, setPaginaActual] = useState(1);
  const numeroTotalPaginas = Math.ceil(productos.length / productosPorPagina);

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  // Calcular el rango de productos para la página actual
  const indiceDelUltimoProducto = paginaActual * productosPorPagina;
  const indiceDelPrimerProducto = indiceDelUltimoProducto - productosPorPagina;
  const productosActuales = productos.slice(indiceDelPrimerProducto, indiceDelUltimoProducto);

  return (
    <>
      <div className="catalogo-container">
        {productosActuales.map((producto, index) => (
          <div className="producto" key={index}>
            <div className="producto-header">
              <h3>{producto.nombre}</h3>
            </div>
            <div className="imagen-principal">
              <img src={producto.imagenUrl} alt={`Producto ${index}`} />
            </div>
            <div className="producto-precio">
              <p>Precio: ${producto.precio} pesos</p>
            </div>

            <button className="ver-mas-button" id='ba' onClick={() => openModal(producto)}>Ver más...</button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={closeModal}>&times;</span>
            <div className="modal-header" ><h3>{selectedProductDetails.nombre}</h3></div>
            <div className="modal-body">
              <div className="modal-imagen">
                <img src={selectedProductDetails.imagenUrl} alt={selectedProductDetails.nombre} className='img'/>
              </div>
              <div className="modal-descripcion">
                <div>
                  <div className="modal-detalle-titulo">◈ Descripción</div>
                  <p>{selectedProductDetails.descripcion}</p>
                </div>
                <div>
                  <div className="modal-detalle-titulo">◈ Precio</div>
                  <p>${selectedProductDetails.precio} pesos</p>
                
                </div>
                <div>
                  <div className="modal-detalle-titulo">◈ Color</div>
                  <p>{selectedProductDetails.color}</p>
                </div>
                <div>
                  <div className="modal-detalle-titulo">◈ Tamaño</div>
                  <p>{selectedProductDetails.tamano}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="paginacion-container">
        {Array.from({ length: numeroTotalPaginas }, (_, index) => (
          <button key={index} onClick={() => cambiarPagina(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Producto;
