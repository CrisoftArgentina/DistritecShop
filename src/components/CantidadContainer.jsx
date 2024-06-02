/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';

const CantidadContainer = ({ cantidad, onCantidadChange, setCantidad }) => {

    const handlerIncrement = () => {
        const nuevaCantidad = cantidad + 1;
        setCantidad(nuevaCantidad);
        onCantidadChange(nuevaCantidad);
    };

    const handlerDecrement = () => {
        const nuevaCantidad = cantidad > 0 ? cantidad - 1 : 0;
        setCantidad(nuevaCantidad);
        onCantidadChange(nuevaCantidad);
    };

    return (
        <div className="contenedor-cantidad mt-2">
            <button className="btn-cant btn-cant-left" onClick={handlerDecrement}>-</button>
            <input type="text" value={cantidad} readOnly />
            <button className="btn-cant btn-cant-right" onClick={handlerIncrement}>+</button>
        </div>
    );
}

export default CantidadContainer;

