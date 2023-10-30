import React from 'react'
import { FormularioCliente } from '../../componets/Cliente/FormularioCliente'

const Crear = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Agregar Cliente</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite registrar un nuevo Cliente</p>
            <FormularioCliente />
        </div>
    )
}

export default Crear