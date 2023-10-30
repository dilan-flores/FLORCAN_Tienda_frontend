import React from 'react'
import TablaCliente from '../../componets/Cliente/TablaCliente'

const ListarCliente = () => {

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Listar Cliente</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite listar los cliente registrados</p>
            <TablaCliente/>
        </div>
    )
}

export default ListarCliente