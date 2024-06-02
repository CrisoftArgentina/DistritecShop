/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState } from "react";
import Swal from 'sweetalert2'
import Medal from '../assets/medal.svg'
import { Link } from "react-router-dom";
import CantidadContainer from './CantidadContainer';

const formatPrecio = (precio) => {
  return precio.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  });
}

const notify = (icon, title) => {
  return (
    Swal.fire({
      position: "top-end",
      icon: icon,
      title: title,
      showConfirmButton: false,
      customClass: 'swal-wide',
      timer: 1000
    })
  )
}

const Card = ({ titulo, url, codigo, descripcion, stock, precio, destacado }) => {
  const [cantidad, setCantidad] = useState(0);

  const handleCantidadChange = (nuevaCantidad) => {
    setCantidad(nuevaCantidad);
  };

  const handleAgregarClick = () => {
    if (stock > 0) {
      notify('success', `Se agregaron ${cantidad} unidades al carrito`);
      setCantidad(0);
    } else {
      notify('error', 'No Hay Stock');
    }
  };

  return (
    <div className='card' >
      <img src={Medal} alt="Medalla" className={(destacado == 0) ? "oculto" : "medal"} />
      <div className={(stock > 0) ? "stock-card back-Cst" : "stock-card back-Sst"}>
        <p>{(stock > 0) ? "Stock" : "Sin Stock"}</p>
      </div>
      <h3 className="title-card">{titulo}</h3>
      <img src={url} alt="imagen-producto" className='img-product' />
      <h3 className='precio mt-2'>{formatPrecio(precio)} + IVA</h3>
      <div className="d-flex justify-content-start flex-column">
        <p className="text-start"><strong>Código:</strong> {codigo}</p>
        <p className="text-start"><strong>Descripción:</strong> {descripcion}</p>
      </div>
      {stock > 0 &&
        <CantidadContainer
          cantidad={cantidad}
          onCantidadChange={handleCantidadChange}
          setCantidad={setCantidad}
        />
      }
      {cantidad > 0 && stock > 0 && (
        <button type="button" onClick={handleAgregarClick} className="btn-addCart mt-3">
          Agregar
        </button>
      )}
      <Link to={`/item/${codigo}`}><button type="button" className="btn-addCart-negative mt-3 w-100">Detalle</button></Link>
    </div>
  );
}

export default Card;
