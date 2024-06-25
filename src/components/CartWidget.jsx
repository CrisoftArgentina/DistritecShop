/* eslint-disable react/prop-types */
import { useContext } from 'react';
import cartWhite from '../assets/cart.svg';
import { DataPedidoContext } from '../contexts/DataPedidoContext';


const CartWidget = ({ cantidad }) => {
    let cartCantidad = Math.max(0, JSON.parse(localStorage.getItem('cartCantidad')) || cantidad);
    const { handleShow } = useContext(DataPedidoContext);
    
    return (
        <>
            <div className='container-cart'>
                <button className="carrito" onClick={handleShow}><img src={cartWhite} width={30} alt="Carrito" />
                    <div className='circle-notification'>
                        <p>{cartCantidad}</p>
                    </div>
                </button>
            </div>
        </>
    );
};

export default CartWidget;
