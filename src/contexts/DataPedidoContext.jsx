/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

const DataPedidoContext = createContext();

const DataPedidoProvider = ({ children }) => {
    const [dataPedido, setDataPedido] = useState([]);
    const [showOffcanvas, setShowOffcanvas] = useState(false); // Nuevo estado para el Offcanvas

    const addToData = (data) => {
        setDataPedido(data);
    };

    const handleShow = () => {
        setShowOffcanvas(true);
    };

    const handleHide = () => {
        setShowOffcanvas(false);
    };

    return (
        <DataPedidoContext.Provider value={{ dataPedido, addToData, showOffcanvas, handleShow, handleHide }}>
            {children}
        </DataPedidoContext.Provider>
    );
};

export { DataPedidoContext, DataPedidoProvider };
