/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import Medal from '../assets/medal.svg';
import { Link } from 'react-router-dom';
import CantidadContainer from './CantidadContainer';
import { CantidadCarritoContext } from '../contexts/CantidadCarritoContext';

const formatPrecio = (precio) => {
  return precio.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  });
};

const notify = (icon, title) => {
  return Swal.fire({
    position: 'top-end',
    icon: icon,
    title: title,
    showConfirmButton: false,
    customClass: 'swal-wide',
    timer: 1000
  });
};

const saveToLocalStorage = (codigo, precio, cantidad, url, descripcion, id) => {
  let items = JSON.parse(localStorage.getItem('cartItems')) || [];
  let cartCantidad = JSON.parse(localStorage.getItem('cartCantidad')) || 0;

  const newItem = {
    codigo,
    precio,
    cantidad,
    url,
    descripcion,
    id
  };

  const existingItemIndex = items.findIndex(item => item.codigo === codigo);

  if (existingItemIndex !== -1) {
    items[existingItemIndex].cantidad += cantidad;
  } else {
    items.push(newItem);
  }

  let suma = parseFloat(cartCantidad) + parseFloat(cantidad);

  localStorage.setItem('cartItems', JSON.stringify(items));
  localStorage.setItem('cartCantidad', JSON.stringify(suma));

  const event = new CustomEvent('localStorageChange');
  window.dispatchEvent(event);
};

const Card = ({ titulo, url, codigo, descripcion, stock, precio, destacado, id }) => {
  const [cantidad, setCantidad] = useState(0);
  const { addToCart } = useContext(CantidadCarritoContext);

  const handleCantidadChange = (nuevaCantidad) => {
    setCantidad(nuevaCantidad);
  };

  const handleAgregarClick = () => {
    if (cantidad > 0 && stock > 0) {
      addToCart(cantidad);
      saveToLocalStorage(codigo, precio, cantidad, url, descripcion, id);
      notify('success', `Se agregaron ${cantidad} unidades al carrito`);
      setCantidad(0);
    } else if (stock <= 0) {
      notify('error', 'No Hay Stock');
    }
  };

  return (
    <div className='card'>
      <img src={Medal} alt="Medalla" className={destacado === 0 ? 'oculto' : 'medal'} />
      <div className={stock > 0 ? 'stock-card back-Cst' : 'stock-card back-Sst'}>
        <p>{stock > 0 ? 'Stock' : 'Sin Stock'}</p>
      </div>
      <h3 className="title-card">{titulo}</h3>
      <img src={url} alt="imagen-producto" className='img-product' />
      <h3 className='precio mt-2'>{formatPrecio(precio)} + IVA</h3>
      <div className="d-flex justify-content-start flex-column">
        <p className="text-start"><strong>Código:</strong> {codigo}</p>
        <p className="text-start"><strong>Descripción:</strong> {descripcion}</p>
      </div>
      {stock > 0 && (
        <CantidadContainer
          cantidad={cantidad}
          onCantidadChange={handleCantidadChange}
          setCantidad={setCantidad}
        />
      )}
      {cantidad > 0 && stock > 0 && (
        <button type="button" onClick={handleAgregarClick} className="btn-addCart mt-3">
          Agregar
        </button>
      )}
      <Link to={`/item/${codigo}`}><button type="button" className="btn-addCart-negative mt-3 w-100">Detalle</button></Link>
    </div>
  );
};

export default Card;

