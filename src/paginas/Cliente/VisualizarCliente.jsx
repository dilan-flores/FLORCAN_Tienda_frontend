import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from '../../componets/Alertas/Mensaje';

const VisualizarCliente = () => {
    const { id } = useParams()
    const [cliente, setCliente] = useState({})
    const [mensaje, setMensaje] = useState({})

    // const formatearFecha = (fecha) => {
    //     const nuevaFecha = new Date(fecha)
    //     nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
    //     return new Intl.DateTimeFormat('ec-EC',{dateStyle:'long'}).format(nuevaFecha)
    // }

    useEffect(() => {
        const consultarCliente = async () => {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)
                setCliente(respuesta.data)
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultarCliente()
    }, [])

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Visualizar Cliente</h1>
                <hr className='my-4' />
                <p className='mb-8'>Este módulo te permite visualizar los datos del cliente</p>
            </div>
            <div>
                {
                    Object.keys(cliente).length != 0 ?
                        (
                            <div className='m-5 flex justify-between'>
                                <div>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Cédula: </span>
                                        {cliente.CI_cliente}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Nombre : </span>
                                        {cliente.Nombre_cliente}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Cuenta: </span>
                                        {cliente.Cuenta_cliente}
                                    </p>
                                    {/* <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Fecha de atención: </span>
                                        {formatearFecha(cliente.ingreso)}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Fecha de salida: </span>
                                        {formatearFecha(cliente.salida)}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Estado: </span>
                                        <span class="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{paciente.estado && "activo"}</span>
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Síntomas: </span>
                                        {cliente.sintomas}
                                    </p> */}
                                </div>
                                <div>
                                    <img src="https://cdn-icons-png.flaticon.com/512/2654/2654572.png" alt="dogandcat" className='h-80 w-80' />
                                </div>
                            </div>
                        )
                        :
                        (
                            Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                        )
                }
            </div>
        </>

    )
}

export default VisualizarCliente