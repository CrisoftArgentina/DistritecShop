/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { createContext, useState, useContext } from 'react';

const CantidadCarritoContext = createContext();

const CantidadCarritoProvider = ({ children }) => {
    const [cantidad, setCantidad] = useState(0);

    const addToCart = (cantidadAgregar) => {
        setCantidad((prevCantidad) => prevCantidad + cantidadAgregar);
    };


    return (
        <CantidadCarritoContext.Provider value={{ cantidad, addToCart }}>
            {children}
        </CantidadCarritoContext.Provider>
    );
};

export { CantidadCarritoContext, CantidadCarritoProvider };