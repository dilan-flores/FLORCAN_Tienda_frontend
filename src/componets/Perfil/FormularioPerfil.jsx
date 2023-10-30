const FormularioPerfil = () => {
    return (
        <form >

            <div>
                <label
                    htmlFor='Nombre_usuario'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre: </label>
                <input
                    id='Nombre_usuario'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Nombre_usuario'
                    name='Nombre_usuario'
                />
            </div>
            <div>
                <label
                    htmlFor='Email_usuario'
                    className='text-gray-700 uppercase font-bold text-sm'>Correo electrónico: </label>
                <input
                    id='Email_usuario'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Email_usuario'
                    name='Email_usuario'
                />
            </div>
            <div>
                <label
                    htmlFor='Password_usuario'
                    className='text-gray-700 uppercase font-bold text-sm'>Contraseña: </label>
                <input
                    id='Password_usuario'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Password_usuario'
                    name='Password_usuario'
                />
            </div>

            <input
                type="submit"
                className='bg-gray-800 w-full p-3 
        text-slate-300 uppercase font-bold rounded-lg 
        hover:bg-gray-600 cursor-pointer transition-all'
                value='Actualizar' />

        </form>
    )
}

export default FormularioPerfil