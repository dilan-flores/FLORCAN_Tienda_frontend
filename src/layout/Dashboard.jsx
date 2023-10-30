import React, { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const Dashboard = () => {
  const location = useLocation();
  const { auth } = useContext(AuthContext);
  const autenticado = localStorage.getItem('token');

  // Crear estados para controlar la visibilidad de los menús desplegables
  const [menuClientes, setMenuClientes] = useState(false);
  const [menuStock, setMenuStock] = useState(false);
  const [menuVentas, setMenuVentas] = useState(false);

  // Crear referencias para los menús desplegables
  const menuClientesRef = useRef(null);
  const menuStockRef = useRef(null);
  const menuVentasRef = useRef(null);

  const handleDesplegarSubMenu = (categoria) => {
    if (categoria === 'clientes') {
      setMenuClientes(true); // Cambiar aquí
      setMenuStock(false);
      setMenuVentas(false);
    } else if (categoria === 'stock') {
      setMenuClientes(false);
      setMenuStock(true); // Cambiar aquí
      setMenuVentas(false);
    } else if (categoria === 'ventas') {
      setMenuClientes(false);
      setMenuStock(false);
      setMenuVentas(true); // Cambiar aquí
    }
  };

  const handleCerrarSubMenu = () => {
    setMenuClientes(false);
    setMenuStock(false);
    setMenuVentas(false);
  };

  return (
    <div className='md:flex md:min-h-screen'>

      <div className='md:w-1/5 bg-teal-800 px-5 py-4' >

        <h2 className='text-4xl font-black text-left text-slate-200'>FLORCAN</h2>

        <img src="https://cdn-icons-png.flaticon.com/512/1496/1496967.png" alt="img-client" className="m-auto mt-8 p-1 border-2 border-slate-500 rounded-full" width={120} height={120} />
        <p className='text-slate-400 text-left my-4 text-sm'> <span className='bg-green-600 mx-2 w-3 h-3 inline-block rounded-full'></span>Bienvenido - {auth?.Nombre_usuario}</p>
        <hr className="mt-5 border-slate-500" />
        <ul className="mt-5">
          {/* Elemento para Clientes */}
          <li
            className="relative text-left mb-2"
            onMouseEnter={() => handleDesplegarSubMenu('clientes')}
            onMouseLeave={handleCerrarSubMenu}
          >
            <button
              className={`${menuClientes ? 'text-slate-200 bg-gray-800 px-3 py-2 rounded-md' : 'text-slate-800'
                } text-xl block w-full mt-2 hover:text-slate-600 focus:outline-none text-left`}
            >
              Clientes
            </button>
            {menuClientes && (
              <div
                ref={menuClientesRef}
                className="mt-2 bg-gray-800 text-slate-200 p-2 rounded-md w-full"
              >
                <Link to='/dashboard/cliente/listar' className="block px-2 py-1 hover:bg-gray-600 rounded-md">
                  Listar Cliente
                </Link>
                <Link to='/dashboard/cliente/crear' className="block px-2 py-1 hover:bg-gray-600 rounded-md">
                  Crear Cliente
                </Link>
              </div>
            )}
          </li>

          {/* Elemento para Stock */}
          <li
            className="relative text-left mb-2"
            onMouseEnter={() => handleDesplegarSubMenu('stock')}
            onMouseLeave={handleCerrarSubMenu}
          >
            <button
              className={`${menuStock ? 'text-slate-200 bg-gray-800 px-3 py-2 rounded-md' : 'text-slate-800'
                } text-xl block w-full mt-2 hover:text-slate-600 focus:outline-none text-left`}
            >
              Stock
            </button>
            {menuStock && (
              <div
                ref={menuStockRef}
                className="mt-2 bg-gray-800 text-slate-200 p-2 rounded-md w-full"
              >
                <Link to='/dashboard/stock/listar' className="block px-2 py-1 hover:bg-gray-600 rounded-md">
                  Listar Productos
                </Link>
                <Link to='/dashboard/stock/crear' className="block px-2 py-1 hover:bg-gray-600 rounded-md">
                  Crear Productos
                </Link>
              </div>
            )}
          </li>

          {/* Elemento para Ventas */}
          <li
            className="relative text-left mb-2"
            onMouseEnter={() => handleDesplegarSubMenu('ventas')}
            onMouseLeave={handleCerrarSubMenu}
          >
            <button
              className={`${menuVentas ? 'text-slate-200 bg-gray-800 px-3 py-2 rounded-md' : 'text-slate-800'
                } text-xl block w-full mt-2 hover:text-slate-600 focus:outline-none text-left`}
            >
              Ventas
            </button>
            {menuVentas && (
              <div
                ref={menuVentasRef}
                className="mt-2 bg-gray-800 text-slate-200 p-2 rounded-md w-full"
              >
                <Link to='/dashboard/venta' className="block px-2 py-1 hover:bg-gray-600 rounded-md">
                  Ventas
                </Link>
                {/* <Link to='/dashboard/ventas/crear' className="block px-2 py-1 hover:bg-gray-600 rounded-md">
                  Generar Ventas
                </Link> */}
              </div>
            )}
          </li>
        </ul>
      </div>

      <div className='flex-1 flex flex-col justify-between h-screen bg-gray-100'>
        <div className='bg-slate-800 py-2 flex md:justify-end items-center gap-5 justify-center'>
          <div className='text-md font-semibold text-slate-100'>
            Bienvenido - {auth?.Nombre_usuario}
          </div>
          <div>
            <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="img-client" className="border-2 border-green-600 rounded-full" width={50} height={50} />
          </div>
          <div>
            <Link to='/' className=" text-white mr-3 text-md block hover:bg-red-900 text-center
                        bg-red-800 px-4 py-1 rounded-lg" onClick={() => { localStorage.removeItem('token') }}>Salir</Link>
          </div>
        </div>
        <div className='overflow-y-scroll p-8'>
          {autenticado ? <Outlet /> : <Navigate to="/login" />}
        </div>
        <div className='bg-teal-800 h-8'>
          <p className='text-center  text-slate-100 leading-[2rem] underline'>Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
