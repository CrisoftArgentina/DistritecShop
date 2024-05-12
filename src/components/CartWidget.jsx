import Cart from '../assets/cart.svg'

// eslint-disable-next-line react/prop-types
const CartWidget = ({cantidad}) => {
    return (
        <div className='container-cart'>
            <img src={Cart} width={30} alt="Carrito" />
            <div className='circle-notification'>
                <p>{cantidad}</p>
            </div>
        </div>
    )
}

export default CartWidget; 