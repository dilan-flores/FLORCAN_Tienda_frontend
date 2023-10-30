import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
// ... (import statements)

const ListarNombres = () => {
  const [clientes, setClientes] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState('');
  const [selectedStock, setSelectedStock] = useState('');
  const [cantidadDeseada, setCantidadDeseada] = useState(1);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = `${import.meta.env.VITE_BACKEND_URL}/venta`;

        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };

        const respuesta = await axios.get(url, options);
        console.log("Clientes:", respuesta.data.clientes);
        console.log("Stocks:", respuesta.data.stocks);

        setClientes(respuesta.data.clientes);
        setStocks(respuesta.data.stocks);
      } catch (error) {
        console.error("Error al obtener nombres:", error);
      }
    };

    fetchData();
  }, []);

  const handleClienteChange = (event) => {
    setSelectedCliente(event.target.value);
  };

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
  };

  const Producto = () => {
    if (selectedCliente && selectedStock) {
      const stock = stocks.find((s) => s.Nombre_producto === selectedStock);
  
      if (stock && stock.Cantidad > 0 && cantidadDeseada > 0) {
        // Busca si el producto ya está en la lista
        const existingProductIndex = productosSeleccionados.findIndex(
          (producto) => producto.Nombre_producto === stock.Nombre_producto
        );
  
        // Calcula la cantidad total que se agregaría
        const totalCantidad = existingProductIndex !== -1
          ? productosSeleccionados[existingProductIndex].Cantidad + parseInt(cantidadDeseada, 10)
          : parseInt(cantidadDeseada, 10);
  
        // Valida que la cantidad total no supere la cantidad existente en el stock
        if (totalCantidad <= stock.Cantidad) {
          if (existingProductIndex !== -1) {
            // Si ya está en la lista, actualiza la cantidad sumando la nueva cantidad deseada
            const updatedProductos = [...productosSeleccionados];
            updatedProductos[existingProductIndex].Cantidad = totalCantidad;
            setProductosSeleccionados(updatedProductos);
          } else {
            // Si no está en la lista, agrégalo
            setProductosSeleccionados([
              ...productosSeleccionados,
              {
                Nombre_producto: stock.Nombre_producto,
                Precio_venta_unitario: stock.Precio_venta_unitario,
                Cantidad: totalCantidad,
              },
            ]);
          }
        } else {
          alert("La cantidad deseada supera la cantidad disponible en el stock");
        }
      } else {
        alert("Producto no encontrado, sin stock disponible o cantidad deseada no válida");
      }
    } else {
      alert("Selecciona un cliente y un stock antes de agregarlo");
    }
  };
  
  const handleGuardarVenta = async () => {
    if (selectedCliente && productosSeleccionados.length > 0 && selectedStock) {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}/factura/registro`;

            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            // Busca el ID del cliente seleccionado
            const clienteSeleccionado = clientes.find(cliente => cliente === selectedCliente);
            const clienteId = clienteSeleccionado ? clienteSeleccionado.id : null;

            const body = {
                cliente: clienteId, // Enviar el ID del cliente en lugar del nombre
                productos: productosSeleccionados.map((producto) => ({
                    Nombre_producto: producto.Nombre_producto,
                    Cantidad: producto.Cantidad
                }))
            };

            await axios.post(url, body, options);

            // Reinicia las selecciones después de guardar la venta
            setSelectedCliente('');
            setProductosSeleccionados([]);
            setSelectedStock('');
        } catch (error) {
            console.error("Error al guardar la venta:", error);
        }
    } else {
        console.log("No todos los valores están presentes");
        // Muestra un mensaje de error
        alert("Selecciona un stock antes de guardar la venta");
    }
};

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
      <FormControl style={{ minWidth: 200, marginBottom: 10 }}>
        <InputLabel id="cliente-label">Selecciona el Cliente</InputLabel>
        <Select
          labelId="cliente-label"
          id="cliente-select"
          value={selectedCliente}
          onChange={handleClienteChange}
        >
          {clientes.map((cliente, index) => (
            <MenuItem key={index} value={cliente}>
              {cliente}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider variant="middle" style={{ marginBottom: 10 }} />
      <FormControl style={{ minWidth: 200, marginTop: 10 }}>
        <InputLabel id="stock-label">Selecciona el Stock</InputLabel>
        <Select
          labelId="stock-label"
          id="stock-select"
          value={selectedStock}
          onChange={handleStockChange}
        >
          {stocks.map((stock, index) => (
            <MenuItem key={index} value={stock.Nombre_producto}>
              {stock.Nombre_producto}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <input
        type="number"
        value={cantidadDeseada}
        onChange={(e) => setCantidadDeseada(e.target.value)}
        placeholder="Cantidad deseada"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={Producto}
        style={{ marginTop: 10 }}
        disabled={!selectedStock}
      >
        Agregar
      </Button>

      <div style={{ marginTop: 20 }}>
        {productosSeleccionados.length > 0 && (
          <table className='w-full mt-5 border border-collapse border-gray-300'>
            <thead className='bg-gray-800 text-slate-400'>
              <tr>
                <th className='p-3 border-b'>Producto</th>
                <th className='p-3 border-b'>Precio</th>
                <th className='p-3 border-b'>Cantidad</th>
                {/* Agrega más encabezados según tus datos */}
              </tr>
            </thead>
            <tbody>
              {productosSeleccionados.map((producto, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className='p-3 border-b'>{producto.Nombre_producto}</td>
                  <td className='p-3 border-b'>{producto.Precio_venta_unitario}</td>
                  <td className='p-3 border-b'>{producto.Cantidad}</td>
                  {/* Agrega más celdas según tus datos */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleGuardarVenta}
        style={{ marginTop: 20 }}
      >
        Guardar Venta
      </Button>
    </Box>
  );
};

export default ListarNombres;
