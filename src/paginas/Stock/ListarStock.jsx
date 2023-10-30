import React from 'react'
import TablaStock from '../../componets/Stock/TablaStock'

const ListarStock = () => {

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Listar Productos</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite registrar listar los Productos registrados</p>
            <TablaStock/>
        </div>
    )
}

export default ListarStock