import cartWhite from '../assets/cart.svg';
import CardCarrito from './CardCarrito';
const SideBar = () => {
    return (
        <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Mi Carrito <img src={cartWhite} width={20} alt="Carrito" /></h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" id="closeOffCanvas"></button>
            </div>
            <div className="offcanvas-body">
                <div className="card-carrito-container">
                    <CardCarrito />
                </div>
            </div>
        </div>
    );
};

export default SideBar;