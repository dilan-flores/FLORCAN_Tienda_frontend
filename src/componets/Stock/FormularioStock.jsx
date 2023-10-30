import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider";
import axios from 'axios';
import Mensaje from "../Alertas/Mensaje";
import { useForm, Controller } from "react-hook-form";

export const FormularioStock = ({ stock }) => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState({});

    // Configuración de React Hook Form
    const { control, handleSubmit, formState: { errors } } = useForm();

    // Obtiene la fecha actual en el formato requerido por el campo de fecha
    const obtenerFechaActual = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Los meses comienzan desde 0
        let dd = today.getDate();

        if (mm < 10) {
            mm = `0${mm}`;
        }

        if (dd < 10) {
            dd = `0${dd}`;
        }

        return `${yyyy}-${mm}-${dd}`;
    };

    const onSubmit = async (data) => {
        try {
            if (stock?._id) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/stock/actualizar/${stock?._id}`;
                const options = {
                    headers: {
                        method: 'PUT',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                await axios.put(url, data, options);
                navigate('/dashboard/stock/listar');
            } else {
                const token = localStorage.getItem('token');
                data.id = auth._id;
                const url = `${import.meta.env.VITE_BACKEND_URL}/stock/registro`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                await axios.post(url, data, options);
                navigate('/dashboard/stock/listar');
            }
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
            setTimeout(() => {
                setMensaje({});
            }, 3000);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label
                    htmlFor='Nombre_producto:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre: </label>
                <Controller
                    name='Nombre_producto'
                    control={control}
                    defaultValue={stock?.Nombre_producto ?? ""}
                    rules={{
                        required: 'Este campo es requerido',
                        minLength: {
                            value: 3, // Valor mínimo de letras
                            message: 'Mínimo 3 letras son requeridas'
                        },
                        maxLength: {
                            value: 30, // Valor máximo de letras
                            message: 'Máximo 30 letras son permitidas'
                        },
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: 'Ingrese solo letras sin espacios ni caracteres especiales'
                        }
                    }}
                    render={({ field }) => (
                        <input
                            id='Nombre_producto'
                            type="text"
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.Nombre_producto ? 'border-red-500' : ''}`}
                            placeholder='Nombre del Producto'
                            {...field}
                        />
                    )}
                />
                {errors.Nombre_producto && <p className='text-red-500 text-sm'>{errors.Nombre_producto.message}</p>}
            </div>

            <div>
                <label
                    htmlFor='Inversion:'
                    className='text-gray-700 uppercase font-bold text-sm'>Inversion: </label>
                <Controller
                    name='Inversion'
                    control={control}
                    defaultValue={stock?.Inversion ?? ""}

                    rules={{
                        pattern: {
                            value: /^\d+(\.\d{2})?$/,
                            message: 'Ingrese un valor numérico válido con exactamente dos decimales'
                        }
                    }}
                    render={({ field }) => (
                        <input
                            id='Inversion'
                            type="Number"
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.Inversion ? 'border-red-500' : ''}`}
                            placeholder='Inversión del producto'
                            {...field}
                        />
                    )}
                />
                {errors.Inversion && <p className='text-red-500 text-sm'>{errors.Inversion.message}</p>}
            </div>

            <div>
                <label
                    htmlFor='Ganancia:'
                    className='text-gray-700 uppercase font-bold text-sm'>Ganancia: </label>
                <Controller
                    name='Ganancia'
                    control={control}
                    defaultValue={stock?.Ganancia ?? ""}
                    rules={{
                        pattern: {
                            value: /^\d+(\.\d{2})?$/,
                            message: 'Ingrese un valor numérico válido con exactamente dos decimales'
                        }
                    }}
                    render={({ field }) => (
                        <input
                            id='Ganancia'
                            type="Number"
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.Ganancia ? 'border-red-500' : ''}`}
                            placeholder='Ganacia del producto'
                            {...field}
                        />
                    )}
                />
                {errors.Ganancia && <p className='text-red-500 text-sm'>{errors.Ganancia.message}</p>}
            </div>

            {/* <div>
                <label
                    htmlFor='Precio_venta_unitario:'
                    className='text-gray-700 uppercase font-bold text-sm'>Precio de venta: </label>
                <Controller
                    name='Precio_venta_unitario'
                    control={control}
                    defaultValue={stock?.Precio_venta_unitario ?? ""}
                    rules={{
                        pattern: {
                            value: /^\d+(\.\d{2})?$/,
                            message: 'Ingrese un valor numérico válido con exactamente dos decimales'
                        }
                    }}
                    render={({ field }) => (
                        <input
                            id='Precio_venta_unitario'
                            type="Number"
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.Precio_venta_unitario ? 'border-red-500' : ''}`}
                            placeholder='Precio de venta por producto'
                            {...field}
                        />
                    )}
                />
                {errors.Precio_venta_unitario && <p className='text-red-500 text-sm'>{errors.Precio_venta_unitario.message}</p>}
            </div> */}

            <div>
                <label
                    htmlFor='Fecha_de_factura:'
                    className='text-gray-700 uppercase font-bold text-sm'>Fecha de factura: </label>
                <Controller
                    name='Fecha_de_factura'
                    control={control}
                    defaultValue={stock?.Fecha_de_factura ?? ""}
                    render={({ field }) => (
                        <input
                            id='Fecha_de_factura'
                            type="date"
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.Fecha_de_factura ? 'border-red-500' : ''}`}
                            placeholder='Fecha_de_factura'
                            max={obtenerFechaActual()} // Configura la fecha mínima como la fecha actual
                            {...field}
                        />
                    )}
                />
                {errors.Fecha_de_factura && <p className='text-red-500 text-sm'>{errors.Fecha_de_factura.message}</p>}
            </div>

            <div>
                <label
                    htmlFor='Cantidad'
                    className='text-gray-700 uppercase font-bold text-sm'>Cantidad: </label>
                <Controller
                    name='Cantidad'
                    control={control}
                    defaultValue={stock?.Cantidad ?? ""}
                    rules={{
                        required: 'Este campo es requerido',
                        pattern: {
                            value: /^[1-9][0-9]?$|^100$/,
                            message: 'Ingrese un número válido (de 1 a 100) sin decimales'
                        }
                    }}
                    render={({ field }) => (
                        <input
                            id='Cantidad'
                            type="text"
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.Cantidad ? 'border-red-500' : ''}`}
                            placeholder='Cantidad de producto'
                            {...field}
                        />
                    )}
                />
                {errors.Cantidad && <p className='text-red-500 text-sm'>{errors.Cantidad.message}</p>}
            </div>

            {/* <div>
                <label
                    htmlFor='Precio_total:'
                    className='text-gray-700 uppercase font-bold text-sm'>Precio total productos: </label>
                <Controller
                    name='Precio_total'
                    control={control}
                    defaultValue={stock?.Precio_total ?? ""}
                    rules={{
                        pattern: {
                            value: /^\d+(\.\d{2})?$/,
                            message: 'Ingrese un valor numérico válido con exactamente dos decimales'
                        }
                    }}
                    render={({ field }) => (
                        <input
                            id='Precio_total'
                            type="Number"
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.Precio_total ? 'border-red-500' : ''}`}
                            placeholder='Precio total productos'
                            {...field}
                        />
                    )}
                />
                {errors.Precio_total && <p className='text-red-500 text-sm'>{errors.Precio_total.message}</p>}
            </div> */}

            {/* <div>
                <label
                    htmlFor='salida:'
                    className='text-gray-700 uppercase font-bold text-sm'>Fecha de salida: </label>
                <Controller
                    name='salida'
                    control={control}
                    defaultValue={paciente?.salida ?? ""}
                    rules={{ required: 'Este campo es requerido' }}
                    render={({ field }) => (
                        <input
                            id='salida'
                            type="date"
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.salida ? 'border-red-500' : ''}`}
                            placeholder='salida'
                            min={obtenerFechaActual()} // Configura la fecha mínima como la fecha actual
                            {...field}
                        />
                    )}
                />
                {errors.salida && <p className='text-red-500 text-sm'>{errors.salida.message}</p>}
            </div>

            <div>
                <label
                    htmlFor='sintomas:'
                    className='text-gray-700 uppercase font-bold text-sm'>Síntomas: </label>
                <Controller
                    name='sintomas'
                    control={control}
                    defaultValue={paciente?.sintomas ?? ""}
                    rules={{
                        required: 'Este campo es requerido',
                        maxLength: {
                            value: 500, // Máximo 500 caracteres
                            message: 'Máximo 500 caracteres son permitidos'
                        }
                    }}
                    render={({ field }) => (
                        <textarea
                            id='sintomas'
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.sintomas ? 'border-red-500' : ''}`}
                            placeholder='Ingrese los síntomas de la mascota'
                            {...field}
                        />
                    )}
                />
                {errors.sintomas && <p className='text-red-500 text-sm'>{errors.sintomas.message}</p>}
            </div> */}

            <input
                type="submit"
                className='bg-gray-600 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'
                value={stock?._id ? 'Actualizar Producto' : 'Registrar Producto'} />
        </form>
    )
}