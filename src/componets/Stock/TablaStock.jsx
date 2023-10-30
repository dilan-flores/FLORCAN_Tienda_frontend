import { useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Mensaje from "../Alertas/Mensaje";
import DataTable from 'react-data-table-component';

const TablaStock = () => {

    const handleDelete = async (id) => {
        try {
            const confirmar = window.confirm("Vas a eliminar el registro de un stock, ¿Estás seguro de realizar esta acción?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/stock/eliminar/${id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                };
                const data = {
                    salida: new Date().toString()
                };
                await axios.delete(url, { headers, data });
                listarStocks();
                toast.success("Stock eliminado exitosamente"); // Muestra una notificación de éxito
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Hubo un error al eliminar el stock"); // Muestra una notificación de error
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
            name: 'Nombre ',
            selector: 'Nombre_producto',
            sortable: false,
        },
        {
            name: 'Inversion',
            selector: 'Inversion',
            sortable: true,
        },
        {
            name: 'Ganancia',
            selector: 'Ganancia',
            sortable: true,
        },
        {
            name: 'Precio venta',
            selector: 'Precio_venta_unitario',
            sortable: true,
        },
        {
            name: 'Factura',
            selector: 'Precio_venta_unitario',
            sortable: true,
        },
        {
            name: 'Cantidad',
            selector: 'Cantidad',
            sortable: true,
        },
        {
            name: 'Precio total',
            selector: 'Precio_total',
            sortable: true,
        },

        {
            name: 'Acciones',
            cell: row => (
                <>
                    <MdInfo
                        className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                        onClick={() => navigate(`/dashboard/stock/visualizar/${row._id}`)}
                    />
                    <MdNoteAdd
                        className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                        onClick={() => navigate(`/dashboard/stock/actualizar/${row._id}`)}
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
    const [stocks, setStocks] = useState([])

    const listarStocks = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/stock`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setStocks(respuesta.data, ...stocks)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        listarStocks()
    }, [])

    const filteredStocks = stocks.filter((stock) =>
        (stock.Nombre_producto ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.Inversion.toString().includes(searchQuery) ||
        stock.Ganancia.toString().includes(searchQuery) ||
        stock.Precio_venta_unitario.toString().includes(searchQuery) ||
        (stock.Fecha_de_factura ? stock.Fecha_de_factura.toString().includes(searchQuery) : false) ||
        stock.Cantidad.toString().includes(searchQuery) ||
        stock.Precio_total.toString().includes(searchQuery)
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
            {filteredStocks.length === 0 ? (
                <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
            ) : (
                <DataTable
                    title="Lista de Stock"
                    columns={columns}
                    data={filteredStocks}
                    highlightOnHover
                    striped
                    responsive
                    pagination

                />
            )}
        </>

    )
}

export default TablaStock