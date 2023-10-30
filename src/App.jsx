import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './layout/Auth'
import Login from './paginas/Login'
import { LandingPage } from './paginas/LandingPage'
import { Register } from './paginas/Register'
import { Forgot } from './paginas/Forgot'
import { NotFound } from './paginas/NotFound'
import Dashboard from './layout/Dashboard'
import Listar from './paginas/Listar'
import Visualizar from './paginas/Visualizar'
import Crear from './paginas/Crear'
import Actualizar from './paginas/Actualizar'
import Perfil from './paginas/Perfil'
import { Confirmar } from './paginas/Confirmar'
import { AuthProvider } from './context/AuthProvider'
import { PrivateRoute } from './routes/PrivateRoute'
import Restablecer from './paginas/Restablecer'

import ListarCliente from './paginas/Cliente/ListarCliente'
import VisualizarCliente from './paginas/Cliente/VisualizarCliente'
import CrearCliente from './paginas/Cliente/CrearCliente'
import ActualizarCliente from './paginas/Cliente/ActualizarCliente'

import ListarStock from './paginas/Stock/ListarStock'
import VisualizarStock from './paginas/Stock/VisualizarStock'
import CrearStock from './paginas/Stock/CrearStock'
import ActualizarStock from './paginas/Stock/ActualizarStock'

import ListarNombres from './paginas/Factura/ListarNombres'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>

            <Route index element={<LandingPage />} />

            <Route path='/' element={<Auth />}>
              <Route path='login' element={<Login />} />
              <Route path='registro' element={<Register />} />
              <Route path='forgot/:id' element={<Forgot />} />
              <Route path='confirmar/:token' element={<Confirmar />} />
              <Route path='recuperar-password/:token' element={<Restablecer />} />
              <Route path='*' element={<NotFound />} />
            </Route>

            <Route path='dashboard/*' element={
              <PrivateRoute>
                <Routes>
                  <Route element={<Dashboard />}>
                    <Route index element={<Perfil />} />
                    <Route path='listar' element={<Listar />} />
                    <Route path='visualizar/:id' element={<Visualizar />} />
                    <Route path='crear' element={<Crear />} />
                    <Route path='actualizar/:id' element={<Actualizar />} />

                    <Route path='cliente/listar' element={<ListarCliente />} />
                    <Route path='cliente/visualizar/:id' element={<VisualizarCliente />} />
                    <Route path='cliente/crear' element={<CrearCliente />} />
                    <Route path='cliente/actualizar/:id' element={<ActualizarCliente />} />

                    <Route path='stock/listar' element={<ListarStock />} />
                    <Route path='stock/visualizar/:id' element={<VisualizarStock />} />
                    <Route path='stock/crear' element={<CrearStock />} />
                    <Route path='stock/actualizar/:id' element={<ActualizarStock />} />

                    <Route path='venta' element={<ListarNombres />} />
                    {/* <Route path='/factura/registro' element={<ListarNombres />} />                    */}
                  </Route>
                </Routes>
              </PrivateRoute>
            } />

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
