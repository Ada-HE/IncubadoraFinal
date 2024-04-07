import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import LayoutConEncabezado from './componentes/Layouts/LayoutConEncabezado';
import LayoutConEncabezado2 from './componentes/Layouts/LayoutConEncabezado2';
import PaginaPrincipal from './paginas/PaginaPrincipal';
import PaginaAdministrativa from './paginas/PaginaAdministrativa';
import PaginaCliente from './paginas/PaginaCliente';
import FormularioInicioSesion from './componentes/Autenticacion/FormularioInicioSesion';
import { CrudUsuarios, CrudInsertarUsuario } from './componentes/Administrativo/CRUDUsuarios';
//administrativa
import CrudAgregarProductos from './componentes/Administrativo/CRUDAgregarProductos';
import CrudListaProductos from './componentes/Administrativo/CRUDListaProductos'
import CRUDAgregarClientes from './componentes/Administrativo/CRUDAgregarClientes';
import CRUDListaClientes from './componentes/Administrativo/CRUDListaClientes';
import CrudReportes from './componentes/Administrativo/CRUDReportes';
import CRUDDispositivoIoT from './componentes/Administrativo/CRUDDispositivoIoT';
import PreguntasFrecuentes from './componentes/Administrativo/CRUDFAQ';
import ListaPreguntasFrecuentes from './componentes/Administrativo/CRUDListaPreguntas';
import InformacionComponent from './componentes/Administrativo/CRUDSomos';
import TablaQuienes from './componentes/Administrativo/tablaQuienes'

//publica
import Quienes from './componentes/Publicos/Quienes';
import Productos from './componentes/Publicos/Productos';
import Contactanos from './componentes/Publicos/Contactanos';
import FormularioContacto from './componentes/Publicos/Informacion';
import Preguntas from './componentes/Publicos/Preguntas';
import Incabador from './componentes/Publicos/incabadores';
//cliente
import Product from './componentes/ClienteU/Product';
import UserProfile from './componentes/ClienteU/UserProfile';
import ControlPage from './componentes/ClienteU/dispositivos';
import Device from './componentes/ClienteU/Device';

//registro
import FormularioRegistro from './componentes/Publicos/Registro';

//recuperacion
import Recuperación from './componentes/Publicos/Recuperacion';
import PreguntaSecreta from './componentes/Recuperacion/Pregunta';
import CambiarContra from './componentes/Recuperacion/CambiarContrasena';
import CorreoElectronico from './componentes/Recuperacion/CorreoElectronico'
import ConfirmarToken from './componentes/Recuperacion/ConfirmarToken';
import CambiarContraT from './componentes/Recuperacion/CambiarContra_token';
//protegete
import RutaPrivada from './componentes/Administrativo/Privada';

const App = () => {
  return (
    <>
      <Routes>
        {/* Rutas Publicas */}
        <Route path="/" element={<LayoutConEncabezado><PaginaPrincipal /></LayoutConEncabezado>} />
        <Route path="/login" element={<LayoutConEncabezado><FormularioInicioSesion /></LayoutConEncabezado>} />
        <Route path="/quienessomos" element={<LayoutConEncabezado><Quienes /></LayoutConEncabezado>} />
        <Route path="/productos" element={<LayoutConEncabezado><Productos /></LayoutConEncabezado>} />
        <Route path="/contactanos" element={<LayoutConEncabezado><Contactanos /></LayoutConEncabezado>} />
        <Route path="/informacion" element={<LayoutConEncabezado><FormularioContacto /></LayoutConEncabezado>} />
        <Route path="/preguntas" element={<LayoutConEncabezado><Preguntas /></LayoutConEncabezado>} />
        <Route path="/incubes" element={<LayoutConEncabezado><Incabador /></LayoutConEncabezado>} />

        {/* Rutas cliente */}
        <Route path="/cliente" element={<RutaPrivada rolesPermitidos={['Cliente']}><LayoutConEncabezado2><PaginaCliente /></LayoutConEncabezado2></RutaPrivada>} />
        <Route path="/admin/usuarios" element={<RutaPrivada rolesPermitidos={['Cliente']}><LayoutConEncabezado2><CrudUsuarios /></LayoutConEncabezado2></RutaPrivada>} />
        <Route path="/cliente/informacion/dispositivoiot" element={<RutaPrivada rolesPermitidos={['Cliente']}><LayoutConEncabezado2><Product /></LayoutConEncabezado2></RutaPrivada>} />
        <Route path="/cliente/informacion/dispositivos" element={<RutaPrivada rolesPermitidos={['Cliente']}><LayoutConEncabezado2><ControlPage /></LayoutConEncabezado2></RutaPrivada>} />
        <Route path="/cliente/informacion/Decive/:claveDispositivo" element={<RutaPrivada rolesPermitidos={['Cliente']}><LayoutConEncabezado2><Device /></LayoutConEncabezado2></RutaPrivada>} />
        <Route path="/cliente/informacion/perfil" element={<RutaPrivada rolesPermitidos={['Cliente']}><LayoutConEncabezado2><UserProfile /></LayoutConEncabezado2></RutaPrivada>} />

        {/* Rutas Administrativas */}
        <Route path="/admin" element={
          <RutaPrivada rolesPermitidos={['Empleado', 'Admin']}>
            <LayoutConEncabezado><PaginaAdministrativa /></LayoutConEncabezado>
          </RutaPrivada>
        } />
        <Route path="/admin/informacion/productos/agregar" element={<RutaPrivada rolesPermitidos={['Empleado', 'admin']}><LayoutConEncabezado><CrudAgregarProductos /></LayoutConEncabezado></RutaPrivada>} />
        <Route path="/admin/informacion/productos/lista" element={<RutaPrivada rolesPermitidos={['Empleado', 'admin']}><LayoutConEncabezado><CrudListaProductos /></LayoutConEncabezado></RutaPrivada>} />
        <Route path="/admin/informacion/clientes/agregar" element={<RutaPrivada rolesPermitidos={['Empleado', 'admin']}><LayoutConEncabezado><CRUDAgregarClientes /></LayoutConEncabezado></RutaPrivada>} />
        <Route path="/admin/informacion/clientes/lista" element={<RutaPrivada rolesPermitidos={['Empleado', 'admin']}><LayoutConEncabezado><CRUDListaClientes /></LayoutConEncabezado></RutaPrivada>} />
        <Route path="/admin/informacion/reportes" element={<RutaPrivada rolesPermitidos={['Empleado', 'admin']}><LayoutConEncabezado><CrudReportes /></LayoutConEncabezado></RutaPrivada>} />
        <Route path="/admin/informacion/dispositivoiot" element={<RutaPrivada rolesPermitidos={['Empleado', 'admin']}><LayoutConEncabezado><CRUDDispositivoIoT /></LayoutConEncabezado></RutaPrivada>} />
        <Route path="/admin/informacion/preguntas/lista" element={<RutaPrivada rolesPermitidos={['Empleado', 'admin']}><LayoutConEncabezado><ListaPreguntasFrecuentes /></LayoutConEncabezado></RutaPrivada>} />
        <Route path="/admin/informacion/preguntas/agregar" element={<RutaPrivada rolesPermitidos={['Empleado', 'admin']}><LayoutConEncabezado><PreguntasFrecuentes /></LayoutConEncabezado></RutaPrivada>} />

        <Route path="/admin/informacion/quienes/agregar" element={<RutaPrivada rolesPermitidos={['Empleado', 'admin']}><LayoutConEncabezado><InformacionComponent /></LayoutConEncabezado></RutaPrivada>} />
        <Route path="/admin/informacion/quienes/lista" element={<RutaPrivada rolesPermitidos={['Empleado', 'admin']}><LayoutConEncabezado><TablaQuienes /></LayoutConEncabezado></RutaPrivada>} />

        {/* Ruta para el formulario de registro */}
        <Route path="/registro" element={<LayoutConEncabezado><FormularioRegistro /></LayoutConEncabezado>} />

        {/*Ruta para la recuperacion*/}
        <Route path="/recuperacion" element={<LayoutConEncabezado><Recuperación /></LayoutConEncabezado>} />
        <Route path="/RecuperacionPreguntaSecreta" element={<LayoutConEncabezado><PreguntaSecreta /></LayoutConEncabezado>} />
        <Route path='/CambiarContra' element={<LayoutConEncabezado><CambiarContra /></LayoutConEncabezado>}></Route>
        <Route path='/RecuperacionCorreo' element={<LayoutConEncabezado><CorreoElectronico /></LayoutConEncabezado>}></Route>
        <Route path='/ConfirmarToken' element={<LayoutConEncabezado><ConfirmarToken /></LayoutConEncabezado>}></Route>
        <Route path='/CambiarContra_token' element={<LayoutConEncabezado><CambiarContraT /></LayoutConEncabezado>}></Route>
      </Routes>
    </>
  );
};

export default App;
