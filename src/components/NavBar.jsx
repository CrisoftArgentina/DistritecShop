
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import CartWidget from './CartWidget'
import SearchProduct from './SearchProduct';
import { CantidadCarritoContext } from '../contexts/CantidadCarritoContext';
import LoginPopover from './LoginPopover';


const NavBar = () => {
    const { cantidad } = useContext(CantidadCarritoContext);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid o1">
                <Link to={"/"}>
                    <img src="https://www.distritec.com.ar/wp-content/uploads/2020/05/logo-distritec.png" width={200} alt="Logo" />
                </Link>

                <div className='d-flex o3 align-items-center gap-2'>
                    <CartWidget
                        cantidad={isNaN(cantidad) ? 0 : cantidad}
                    />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div className="collapse navbar-collapse o2" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link active" aria-current="page" href="#">
                                Inicio
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Neumática
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link to={"/category/Actuadores"} className="dropdown-item">Actuadores</Link></li>
                                <li><Link to={"/category/Valvulas"} className="dropdown-item">Valvulas</Link></li>
                                <li><Link to={"/category/Unidades FRL"} className="dropdown-item">Unidades FRL</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Hidráulica
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Cilindros</a></li>
                                <li><a className="dropdown-item" href="#">Valvulas</a></li>
                                <li><a className="dropdown-item" href="#">Centrales H.D</a></li>
                            </ul>
                        </li>
                    </ul>
                    <SearchProduct />
                    <LoginPopover />
                </div>
            </div>
        </nav>
    )
}
export default NavBar;