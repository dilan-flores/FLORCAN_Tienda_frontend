import { useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Mensaje from "../Alertas/Mensaje";
import DataTable from 'react-data-table-component';

const TablaCliente = () => {

    const handleDelete = async (id) => {
        try {
            const confirmar = window.confirm("Vas a eliminar el registro de un cliente, ¿Estás seguro de realizar esta acción?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/eliminar/${id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                };
                const data = {
                    salida: new Date().toString()
                };
                await axios.delete(url, { headers, data });
                listarClientes();
                toast.success("Cliente eliminado exitosamente"); // Muestra una notificación de éxito
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Hubo un error al eliminar el cliente"); // Muestra una notificación de error
        }
    }

    // Definir las columnas para DataTable
    const columns = [
        {
            name: 'N°',
            selector: (row, index) => index + 1,
            //sortable: true,
        },
        {
            name: 'CI_cliente',
            selector: 'CI_cliente',
            sortable: true,
        },
        {
            name: 'Nombre',
            selector: 'Nombre_cliente',
            sortable: true,
        },
        {
            name: 'Cuenta',
            selector: 'Cuenta_cliente',
            sortable: true,
        },
        // {
        //     name: 'Celular',
        //     selector: 'celular',
        //     sortable: true,
        // },
        // {
        //     name: 'Estado',
        //     cell: row => (
        //         <span className={`bg-${row.estado ? 'blue-100 text-green-500' : 'gray-100 text-gray-500'} text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300`}>
        //             {row.estado ? 'activo' : 'inactivo'}
        //         </span>
        //     ),
        // },

        {
            name: 'Acciones',
            cell: row => (
                <>
                    <MdInfo
                        className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                        onClick={() => navigate(`/dashboard/cliente/visualizar/${row._id}`)}
                    />
                    <MdNoteAdd
                        className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                        onClick={() => navigate(`/dashboard/cliente/actualizar/${row._id}`)}
                    />
                    <MdDeleteForever
                        className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                        onClick={() => { handleDelete(row._id) }}
                    />
                </>
            ),
        },
    ];

    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate()
    const [clientes, setClientes] = useState([])

    const listarClientes = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/cliente`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setClientes(respuesta.data, ...clientes)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        listarClientes()
    }, [])

    const filteredClientes = clientes.filter((cliente) =>
        (cliente.CI_cliente ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cliente.Nombre_cliente ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cliente.Cuenta_cliente ?? "").toString().includes(searchQuery) // sin convertir a minúsculas
    );


    return (
        <>
            <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
                    outline: 'none',
                    width: '100%',
                    maxWidth: '400px',
                    margin: '0 auto 20px',
                }}
            />
            {filteredClientes.length === 0 ? (
                <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
            ) : (
                <DataTable
                    title="Lista de Clientes"
                    columns={columns}
                    data={filteredClientes}
                    highlightOnHover
                    striped
                    responsive
                    pagination

                />
            )}
        </>

    )
}

export default TablaCliente