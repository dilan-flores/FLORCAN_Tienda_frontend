// ActualizarCliente.jsx
import { FormularioCliente } from '../../componets/Cliente/FormularioCliente'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Mensaje from '../../componets/Alertas/Mensaje';
import axios from 'axios';

const ActualizarCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({});
  const [mensaje, setMensaje] = useState({});

  useEffect(() => {
    const consultarCliente = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/${id}`;
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        const respuesta = await axios.get(url, options);
        setCliente(respuesta.data);
      } catch (error) {
        setMensaje({ respuesta: error.response.data.msg, tipo: false });
      }
    };
    consultarCliente();
  }, [id]); // Agregué [id] como dependencia para que se ejecute cuando cambie el ID

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/actualizar/${id}`;
      const options = {
        headers: {
          method: 'PUT',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      await axios.put(url, data, options);
      navigate('/dashboard/cliente/listar');
    } catch (error) {
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  };

  return (
    <div>
      <h1 className='font-black text-4xl text-gray-500'>Actualizar Cliente</h1>
      <hr className='my-4' />
      <p className='mb-8'>Este módulo te permite actualizar los datos de un Cliente registrado</p>
      {Object.keys(cliente).length !== 0 ? (
        <FormularioCliente cliente={cliente} onSubmit={onSubmit} />
      ) : (
        Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
      )}
    </div>
  );
};

export default ActualizarCliente;
