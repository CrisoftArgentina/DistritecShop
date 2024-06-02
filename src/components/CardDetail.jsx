/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Swal from 'sweetalert2'
import Medal from '../assets/medal.svg'
import StarFull from '../assets/starfull.svg'
import Star from '../assets/star.svg'
import Shared from '../assets/shared.svg'
import Heart from '../assets/heart.svg'
import CartWhite from '../assets/cartWhite.svg'


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

const CardDetail = ({ titulo, url, codigo, descripcion, stock, precio, destacado }) => {
    return (
        <div className="card-detail row">
            <div className={(stock > 0) ? "stock-card-detail back-Cst" : "stock-card-detail back-Sst"}>
                <p>{(stock > 0) ? "Stock" : "Sin Stock"}</p>
            </div>
            <div className="col-6">
                <img src={url} alt="imagen-producto" className='img-product' />
            </div>

            <div className="col-6 card-detail-rigth d-flex flex-column gap-3">
                <img src={Medal} alt="Medalla" className={(destacado == 0) ? "oculto" : "medal-detail"} />
                <h3 className="title-card">{titulo}</h3>
                <div className='d-flex flex-column align-items-start gap-2'>
                    <h2>{descripcion}</h2>
                    <p>Codigo: {codigo}</p>
                    <div className='d-flex gap-1'>
                        <img src={StarFull} alt="star" className='star' />
                        <img src={StarFull} alt="star" className='star' />
                        <img src={StarFull} alt="star" className='star' />
                        <img src={StarFull} alt="star" className='star' />
                        <img src={Star} alt="star" className='star' />
                        <div>
                            <p>4.4 (517)</p>
                        </div>
                        <div className='d-flex ms-4 gap-2'>
                            <img src={Heart} alt="heart" />
                            <img src={Shared} alt="shared" />
                        </div>

                    </div>

                </div>
                <h3 className='precio-detail'>{formatPrecio(precio)} + IVA</h3>
                <div className='d-flex align-item-center'>
                    <button type="button" onClick={() => (stock > 0 ? notify('success', 'Agregado Correctamente') : notify('error', 'No Hay Stock'))} className="btn-addCart-detail">
                        Agregar
                        <img src={CartWhite} alt="cart"/>
                    </button>
                </div>
            </div>

        </div>
    )
}
export default CardDetail;