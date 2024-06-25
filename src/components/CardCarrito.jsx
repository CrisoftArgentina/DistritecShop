import React, { useContext, useEffect } from 'react';


import { DataPedidoContext } from '../contexts/DataPedidoContext';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ItemsAgregados from './ItemsAgregados';

const CardCarrito = ({ ButtonsVisibles = true }) => {
    // const { addToCart } = useContext(CantidadCarritoContext);
    const { addToData, dataPedido, showOffcanvas, handleHide } = useContext(DataPedidoContext);

    // useEffect(() => {
    //     const loadItems = () => {
    //         const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    //         if (storedItems.length > 0 && JSON.stringify(storedItems) !== JSON.stringify(dataPedido)) {
    //             addToData(storedItems);
    //         }
    //     };

    //     loadItems();

    //     const handleStorageChange = (e) => {
    //         if (e.key === 'cartItems') {
    //             loadItems();
    //         }
    //     };

    //     window.addEventListener('storage', handleStorageChange);

    //     return () => {
    //         window.removeEventListener('storage', handleStorageChange);
    //     };
    // }, [addToData, dataPedido]);

    // const formatPrecio = (precio) => {
    //     return precio.toLocaleString('es-AR', {
    //         style: 'currency',
    //         currency: 'ARS'
    //     });
    // };

    // const handleClearClick = () => {
    //     const cantidad = dataPedido.reduce((acc, item) => acc + item.cantidad, 0);
    //     addToData([]);
    //     addToCart(-cantidad);
    //     localStorage.removeItem('cartItems');
    //     localStorage.removeItem('cartCantidad');
    //     Swal.fire({
    //         position: 'top-start',
    //         icon: "success",
    //         title: "Se borraron todos los items",
    //         showConfirmButton: false,
    //         customClass: 'swal-wide',
    //         timer: 1000
    //     });
    // };

    // const handleDeleteClick = (codigo) => {
    //     const newItems = dataPedido.filter(item => item.codigo !== codigo);
    //     const itemEliminado = dataPedido.find(item => item.codigo === codigo);
    //     const cantidadEliminada = itemEliminado ? itemEliminado.cantidad : 0;

    //     addToData(newItems);
    //     addToCart(-cantidadEliminada);

    //     localStorage.setItem('cartItems', JSON.stringify(newItems));
    //     const storedCantidad = JSON.parse(localStorage.getItem('cartCantidad')) || 0;
    //     localStorage.setItem('cartCantidad', JSON.stringify(storedCantidad - cantidadEliminada));

    //     Swal.fire({
    //         position: 'top-start',
    //         icon: "success",
    //         title: `Se eliminó el ítem ${codigo}`,
    //         showConfirmButton: false,
    //         customClass: 'swal-wide',
    //         timer: 1000
    //     });
    // };

    // const totalImporte = dataPedido.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    // const IVA = totalImporte * 0.21;
    // const total = totalImporte + IVA;

    return (
        <Offcanvas show={showOffcanvas} onHide={handleHide}  placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrito</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ItemsAgregados 
                ButtonsVisibles= {true}/>
                {/* {dataPedido.length !== 0 ? (
                    <>
                        {dataPedido.map((item, index) => (
                            <div key={index} className="card-carrito mb-4">
                                <div className="container-carrito-delete">
                                    <img className="carrito-delete" onClick={() => handleDeleteClick(item.codigo)} src={deleteW} width={15} alt="delete" />
                                </div>

                                <p className="text-center card-carrito-codigo"><strong>Código: {item.codigo}</strong></p>
                                <div className="d-flex align-items-center">
                                    <div className="ms-2">
                                        <img src={item.url} width={100} alt="foto-producto" />
                                    </div>
                                    <div className="ms-2 text-start">
                                        <p><strong>Detalle:</strong> {item.descripcion}</p>
                                        <p><strong>Precio:</strong> {formatPrecio(item.precio)}</p>
                                        <p><strong>Cantidad:</strong> {item.cantidad}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="card-carrito-footer">
                            <div className="d-flex gap-2">
                                <strong>Importe:</strong>
                                <p>{formatPrecio(totalImporte)}</p>
                            </div>
                            <div className="d-flex gap-2">
                                <strong>IVA:</strong>
                                <p>{formatPrecio(IVA)}</p>
                            </div>
                            <div className="d-flex gap-2">
                                <strong>Total:</strong>
                                <p>{formatPrecio(total)}</p>
                            </div>
                        </div>
                        <div className={`d-flex justify-content-between mt-3 ${ButtonsVisibles === false ? "oculto" : ""}`}>
                            <button className="btn-carrito btn-carrito-clear" onClick={handleClearClick}>
                                Limpiar Carrito <img src={deleteW} width={15} alt="delete" />
                            </button>
                            <Link to={"/ConfirmarPedido"}>
                                <button className="btn-carrito btn-carrito-buy" onClick={handleHide}>
                                    Confirmar <img src={buy} width={15} alt="buy" />
                                </button>
                            </Link>
                        </div>
                    </>
                ) : (
                    <p>Todavía no agregaste ningún producto 😞</p>
                )} */}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CardCarrito;


