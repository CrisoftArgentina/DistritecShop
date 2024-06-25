import React, { useState, useEffect } from 'react';
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import eye from '../assets/eye.svg'
import clock from '../assets/clock.svg'
import ship from '../assets/ship.svg'
import box from '../assets/box.svg'
import { Link } from "react-router-dom";

const MisPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getPedidosByEmail = async (email) => {
        try {
            const clientesRef = collection(db, "clientes");
            const qClientes = query(clientesRef, where("email", "==", email));
            const querySnapshotClientes = await getDocs(qClientes);

            if (querySnapshotClientes.empty) {
                return [];
            }

            const clienteIds = querySnapshotClientes.docs.map(doc => doc.id);
            const pedidosRef = collection(db, "pedidos");
            const qPedidos = query(pedidosRef, where("clienteRef", "in", clienteIds.map(id => doc(db, "clientes", id))));
            const querySnapshotPedidos = await getDocs(qPedidos);

            const pedidos = querySnapshotPedidos.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return pedidos;
        } catch (error) {
            throw new Error("No se pudo obtener los pedidos por email.");
        }
    };

    const fetchPedidos = async () => {
        const email = localStorage.getItem('correo');
        if (!email) {
            setLoading(false);
            return;
        }

        try {
            const pedidos = await getPedidosByEmail(email);
            const sortedPedidos = pedidos.sort((a, b) => b.numero - a.numero);
            setPedidos(sortedPedidos);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPedidos();
    }, []);

    if (loading) {
        return <div className="loader-container">
            <div className="loader">
                <div className="spinner"></div>
            </div>
        </div>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const formatFecha = (fecha) => {
        const fechaJS = fecha.toDate();
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return fechaJS.toLocaleDateString('es-AR', options);
    };

    const estadoEnvio = (idestado) => {
        let estado;
        if (idestado === 0) {
            estado = "Pendiente"
        } else if (idestado === 1) {
            estado = "En Progreso"
        } else if (idestado === 2) {
            estado = "Entregado"
        }
        return estado
    }
    const cssEnvio = (idestado) => {
        let estado;
        if (idestado === 0) {
            estado = "state-ship envio-pendiente"
        } else if (idestado === 1) {
            estado = "state-ship envio-progreso"
        } else if (idestado === 2) {
            estado = "state-ship envio-entregado"
        }
        return estado
    }
    const getEstadoImage = (estado) => {
        switch (estado) {
            case 0:
                return clock;
            case 1:
                return ship;
            case 2:
                return box;
            default:
                return clock;
        }
    };

    return (
        <div>
            <h2>Mis Pedidos</h2>
            {pedidos.length === 0 ? (
                <p>No se encontraron pedidos.</p>
            ) : (
                <>
                    <div className='container container-confirm'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Total</th>
                                    <th scope='col'>Estado Envio</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidos.map((pedido) => (
                                    <tr key={pedido.id}>
                                        <td>{pedido.numero}</td>
                                        <td>{formatFecha(pedido.fecha)}</td>
                                        <td>{pedido.total}</td>
                                        <td className='d-flex justify-content-center'>
                                            <div className={cssEnvio(pedido.estadoenvio)}>
                                                <p>{estadoEnvio(pedido.estadoenvio)}</p>
                                                <img src={getEstadoImage(pedido.estadoenvio)} alt={pedido.estadoenvio} width={20} />
                                            </div>
                                        </td>
                                        <td>
                                            <Link to={`/DetallePedido/${pedido.id}`}>
                                                <img className='pointer' src={eye} alt="eye" width={30} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>

            )}
        </div>
    );
};

export default MisPedidos;
