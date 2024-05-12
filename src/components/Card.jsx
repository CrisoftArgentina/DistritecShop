// eslint-disable-next-line no-unused-vars
import React from 'react';
import Swal from 'sweetalert2'
import Medal from '../assets/medal.svg'

const formatPrecio = (precio) => {
  return precio.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  });
}



const notify = (icon, title) => {
  return(
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

// eslint-disable-next-line react/prop-types
const Card = ({ titulo, url, codigo, descripcion, stock, precio, destacado }) => {
  
  return (
    <div className='card' >
      <img src={Medal} alt="Medalla" className={(destacado == 0) ? "oculto" : "medal"}/>
      <div className={(stock > 0) ? "stock-card back-Cst" : "stock-card back-Sst"}>
        <p>{(stock > 0) ? "Stock" : "Sin Stock"}</p>
      </div>
      <h3 className="title-card">{titulo}</h3>
      <img src={url} alt="Valvula" className='img-product' />
      <h3 className='precio'>{formatPrecio(precio)}</h3>
      <div className="d-flex justify-content-start flex-column">
        <p className="text-start"><strong>Código:</strong> {codigo}</p>
        <p className="text-start"><strong>Descripción:</strong> {descripcion}</p>
      </div>
      <button type="button" onClick={() => (stock > 0 ? notify('success', 'Agregado Correctamente') : notify('error', 'No Hay Stock'))}  className="btn-addCart mt-3">Agregar</button>
    </div>
  );
}

export default Card;  