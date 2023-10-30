import { Link } from 'react-router-dom';
import { useState } from 'react';
import Mensaje from '../componets/Alertas/Mensaje';
import axios from 'axios';

export const Register = () => {
    const [mensaje, setMensaje] = useState({});
    const [form, setForm] = useState({
      Nombre_usuario: "",
      Email_usuario: "",
      Password_usuario: "",
    });
    // Estados para la longitud de los campos
    const [Nombre_usuarioLength, setNombre_usuarioLength] = useState(0);
    const [Email_usuarioLength, setEmail_usuarioLength] = useState(0);
    const [Password_usuarioLength, setPassword_usuarioLength] = useState(0);
  
    const handleChange = (e) => {
      const newValue = e.target.value;
      const maxLengths = {
        Nombre_usuario: 30,
        Email_usuario: 50,
        Password_usuario: 20,
      };
  
      if (newValue.length <= maxLengths[e.target.name]) {
        setForm({
          ...form,
          [e.target.name]: newValue,
        });
  
        // Actualizar la longitud según el campo correspondiente
        switch (e.target.name) {
          case "Nombre_usuario":
            setNombre_usuarioLength(newValue.length);
            break;
          case "Email_usuario":
            setEmail_usuarioLength(newValue.length);
            break;
          case "Password_usuario":
            setPassword_usuarioLength(newValue.length);
            break;
          default:
            break;
        }
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/registro`;
        const respuesta = await axios.post(url, form);
        setMensaje({ respuesta: respuesta.data.msg, tipo: true });
        setForm({});
      } catch (error) {
        setMensaje({ respuesta: error.response.data.msg, tipo: false });
      }
    };

    return (
        <>
          <div className="bg-white min-h-screen"></div>
          <div className="bg-white flex justify-center items-center w-1/2 h-screen">
            <div className="md:w-4/5 sm:w-full">
              <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">Bienvenido</h1>
              <small className="text-gray-400 block my-4 text-sm">Ingresa tus datos para poder registrarte</small>
              {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="mb-2 block text-sm font-semibold" htmlFor="Nombre_usuario">
                    Nombre ({Nombre_usuarioLength}/30):
                  </label>
                  <input
                    type="text"
                    id="Nombre_usuario"
                    name="Nombre_usuario"
                    value={form.Nombre_usuario || ""}
                    onChange={handleChange}
                    placeholder="Ingresa tu nombre"
                    className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500"
                    required
                  />
                </div>
      
                <div className="mb-3">
                  <label className="mb-2 block text-sm font-semibold" htmlFor="Email_usuario">
                    Correo electrónico ({Email_usuarioLength}/50):
                  </label>
                  <input
                    type="email"
                    id="Email_usuario"
                    name="Email_usuario"
                    value={form.Email_usuario || ""}
                    onChange={handleChange}
                    placeholder="Ingresa tu correo electrónico"
                    className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500"
                    required
                  />
                </div>
      
                <div className="mb-3">
                  <label className="mb-2 block text-sm font-semibold" htmlFor="Password_usuario">
                    Contraseña ({Password_usuarioLength}/20):
                  </label>
                  <input
                    type="password"
                    id="Password_usuario"
                    name="Password_usuario"
                    value={form.Password_usuario || ""}
                    onChange={handleChange}
                    placeholder="********************"
                    className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500"
                    required
                  />
                </div>
      
                <div className="mb-3">
                  <button className="bg-gray-500 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">Registrar</button>
                </div>
              </form>
      
              <div className="mt-5 text-xs border-b-2 py-4 "></div>
      
              <div className="mt-3 text-sm flex justify-between items-center">
                <p>¿Ya tienes una cuenta? Dirígete al login para poder iniciar sesión.</p>
                <Link to="/login" className="py-2 px-5 bg-gray-500 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 ">Iniciar sesión</Link>
              </div>
            </div>
          </div>
      
          <div className="w-1/2 h-screen bg-[url('/public/images/dogregister.jpg')]
          bg-no-repeat bg-cover bg-center sm:block hidden
          "></div>
        </>
      );      
}