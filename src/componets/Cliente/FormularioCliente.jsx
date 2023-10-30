import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider";
import axios from 'axios';
import Mensaje from "../Alertas/Mensaje";
import { useForm, Controller } from "react-hook-form";

export const FormularioCliente = ({ cliente }) => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState({});

    // Configuración de React Hook Form
    const { control, handleSubmit, formState: { errors } } = useForm();

    // Obtiene la fecha actual en el formato requerido por el campo de fecha
    // const obtenerFechaActual = () => {
    //     const today = new Date();
    //     const yyyy = today.getFullYear();
    //     let mm = today.getMonth() + 1; // Los meses comienzan desde 0
    //     let dd = today.getDate();

    //     if (mm < 10) {
    //         mm = `0${mm}`;
    //     }

    //     if (dd < 10) {
    //         dd = `0${dd}`;
    //     }

    //     return `${yyyy}-${mm}-${dd}`;
    // };

    const onSubmit = async (data) => {
        try {
            if (cliente?._id) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/actualizar/${cliente?._id}`;
                const options = {
                    headers: {
                        method: 'PUT',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                await axios.put(url, data, options);
                navigate('/dashboard/cliente/listar');
            } else {
                const token = localStorage.getItem('token');
                data.id = auth._id;
                const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/registro`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                await axios.post(url, data, options);
                navigate('/dashboard/cliente/listar');
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
                    htmlFor='CI_cliente'
                    className='text-gray-700 uppercase font-bold text-sm'>Cédula: </label>
                <Controller
                    name='CI_cliente'
                    control={control}
                    defaultValue={cliente?.CI_cliente ?? ""}
                    rules={{
                        required: 'Este campo es requerido',
                        pattern: {
                            value: /^\d{10}$/,
                            message: 'Ingrese exactamente 10 dígitos numéricos'
                        }
                    }}
                    render={({ field }) => (
                        <input
                            id='CI_cliente'
                            type="text"
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.CI_cliente ? 'border-red-500' : ''}`}
                            placeholder='Cédula del cliente'
                            {...field}
                        />
                    )}
                />
                {errors.CI_cliente && <p className='text-red-500 text-sm'>{errors.CI_cliente.message}</p>}
            </div>

            <div>
                <label
                    htmlFor='Nombre_cliente:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre: </label>
                <Controller
                    name='Nombre_cliente'
                    control={control}
                    defaultValue={cliente?.Nombre_cliente ?? ""}
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
                            id='Nombre_cliente'
                            type="text"
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.Nombre_cliente ? 'border-red-500' : ''}`}
                            placeholder='Nombre del cliente'
                            {...field}
                        />
                    )}
                />
                {errors.Nombre_cliente && <p className='text-red-500 text-sm'>{errors.Nombre_cliente.message}</p>}
            </div>

            {/* <div>
                <label
                    htmlFor='propietario'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del propietario: </label>
                <Controller
                    name='propietario'
                    control={control}
                    defaultValue={paciente?.propietario ?? ""}
                    rules={{
                        required: 'Este campo es requerido',
                        minLength: {
                            value: 3, // Mínimo 3 caracteres
                            message: 'Mínimo 3 caracteres son requeridos'
                        },
                        maxLength: {
                            value: 30, // Máximo 30 caracteres
                            message: 'Máximo 30 caracteres son permitidos'
                        },
                        pattern: {
                            value: /^[A-Za-z\s]+$/, // Acepta letras y espacios
                            message: 'Ingrese solo letras sin caracteres especiales'
                        }
                    }}
                    render={({ field }) => (
                        <input
                            id='propietario'
                            type="text"
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.propietario ? 'border-red-500' : ''}`}
                            placeholder='nombre del propietario'
                            {...field}
                        />
                    )}
                />
                {errors.nombre && <p className='text-red-500 text-sm'>{errors.nombre.message}</p>}
            </div>

            <div>
                <label
                    htmlFor='email:'
                    className='text-gray-700 uppercase font-bold text-sm'>Correo electrónico: </label>
                <Controller
                    name='email'
                    control={control}
                    defaultValue={paciente?.email ?? ""}
                    rules={{
                        required: 'Este campo es requerido',
                        pattern: {
                            value: /^[A-Za-z0-9+_.-]+@(.+)$/,
                            message: 'Ingrese un correo electrónico válido'
                        }
                    }}
                    render={({ field }) => (
                        <input
                            id='email'
                            type="email"
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.email ? 'border-red-500' : ''}`}
                            placeholder='correo electrónico del propietario'
                            {...field}
                        />
                    )}
                />
                {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
            </div> */}

            <div>
                <label
                    htmlFor='Cuenta_cliente:'
                    className='text-gray-700 uppercase font-bold text-sm'>Cuenta: </label>
                <Controller
                    name='Cuenta_cliente'
                    control={control}
                    defaultValue={cliente?.Cuenta_cliente ?? ""}
                    rules={{
                        pattern: {
                            value: /^\d+(\.\d{2})?$/,
                            message: 'Ingrese un valor numérico válido con exactamente dos decimales'
                        }
                    }}
                    render={({ field }) => (
                        <input
                            id='Cuenta_cliente'
                            type="Number"
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.Cuenta_cliente ? 'border-red-500' : ''}`}
                            placeholder='Valor de cuenta del cliente'
                            {...field}
                        />
                    )}
                />
                {errors.Cuenta_cliente && <p className='text-red-500 text-sm'>{errors.Cuenta_cliente.message}</p>}
            </div>

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
                value={cliente?._id ? 'Actualizar cliente' : 'Registrar cliente'} />

        </form>
    )
}