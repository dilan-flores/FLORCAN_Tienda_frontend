import React from 'react'
import { FormularioStock } from '../../componets/Stock/FormularioStock'

const CrearStock = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Agregar Producto</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite registrar un nuevo Producto</p>
            <FormularioStock />
        </div>
    )
}

export default CrearStock