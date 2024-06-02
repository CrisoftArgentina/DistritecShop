import Banner1 from '../assets/banner1.png'
import Banner2 from '../assets/banner2.png'
import Banner3 from '../assets/banner3.png'
import Truck from '../assets/truck.svg'
import Stock from '../assets/stock.svg'
import Shield from '../assets/shield.svg'


const Carousel = () => {
    return (
        <div className="container mt-3 d-flex gap-3">
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="3000">
                        <img src={Banner1} className="d-block w-100" alt="frl" />
                        <div className="carousel-caption d-md-block">
                            <div>
                                <h2 className='discount'>30% OFF</h2>
                            </div>
                            <h5>Descuento en FR+L</h5>
                            <p>En la compra de todos los componentes de tratamientos</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src={Banner2} className="d-block w-100" alt="vacio" />
                        <div className="carousel-caption  d-md-block">
                            <div>
                                <h2 className='discount'>Entrega en 24Hs</h2>
                            </div>
                            <h5>¿Maquina sin producir?</h5>
                            <p>Tenemos entrega en menos de 24Hs en la mayoría de los componentes</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src={Banner3} className="d-block w-100" alt="tratamiento" />
                        <div className="carousel-caption  d-md-block">
                            <div>
                                <h2 className='discount'>Stock amplio de Cilindros</h2>
                            </div>
                            <h5>¿No conseguis reemplazar tu cilindro?</h5>
                            <p>Consultanos por tu reemplazo, tenemos amplio stock de cilindros neumáticos</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='column-rigth-carousel'>
                <div>
                    <img src={Truck} width={50} alt="" />
                    <p className='mt-2'>Envios en 24Hs!</p>
                </div>
                <div>
                    <img src={Stock} width={50} alt="" />
                    <p className='mt-2'>Mas de 2.000 productos en stock!</p>
                </div>
                <div>
                    <img src={Shield} width={40} alt="" />
                    <p className='mt-2'>Compra segura</p>
                </div>
            </div>
        </div>
    );
};

export default Carousel;