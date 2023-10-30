import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from '../../componets/Alertas/Mensaje';

const VisualizarStock = () => {
    const { id } = useParams()
    const [stock, setStock] = useState({})
    const [mensaje, setMensaje] = useState({})

    // const formatearFecha = (fecha) => {
    //     const nuevaFecha = new Date(fecha)
    //     nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
    //     return new Intl.DateTimeFormat('ec-EC',{dateStyle:'long'}).format(nuevaFecha)
    // }

    useEffect(() => {
        const consultarStock = async () => {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/stock/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)
                setStock(respuesta.data)
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultarStock()
    }, [])

return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Visualizar Stock</h1>
                <hr className='my-4' />
                <p className='mb-8'>Este módulo te permite visualizar los datos del Stock</p>
            </div>
            <div>
                {
                    Object.keys(stock).length != 0 ?
                        (
                            <div className='m-5 flex justify-between'>
                                <div>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Producto: </span>
                                        {stock.Nombre_producto}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Inversion: </span>
                                        {stock.Inversion}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Ganancia: </span>
                                        {stock.Ganancia}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Precio de venta: </span>
                                        {stock.Precio_venta_unitario}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Fecha de factura: </span>
                                        {stock.Fecha_de_factura}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Cantidad: </span>
                                        {stock.Cantidad}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Precio total: </span>
                                        {stock.Precio_total}
                                    </p>
                                </div>
                                <div>
                                    <img src="https://cdn-icons-png.flaticon.com/512/2681/2681628.png" alt="dogandcat" className='h-80 w-80' />
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

export default VisualizarStock