import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig";

const DetallePedido = () => {
    const { id } = useParams();
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetallePedido = async () => {
            try {
                const detallePedidosRef = collection(db, "detallepedido");
                const q = query(detallePedidosRef, where("pedidoRef", "==", doc(db, `pedidos/${id}`)));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setPedidos([]);
                } else {
                    const detalles = [];
                    querySnapshot.forEach((doc) => {
                        detalles.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });
                    setPedidos(detalles);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener detalles del pedido:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchDetallePedido();
    }, [id]);

    if (loading) {
        return <div className="loader-container">
            <div className="loader">
                <div className="spinner"></div>
            </div>
        </div>;
    }

    if (error) {
        return <p>Error al obtener detalles del pedido: {error}</p>;
    }

    return (
        <div>
            <h2>DETALLE DEL PEDIDO</h2>
            <div className='container'>
                {pedidos.map((detalle, index) => (
                    <div key={index} className="card-carrito mb-4">
                        <p className="text-center card-carrito-codigo"><strong>Código: {detalle.productoCodigo}</strong></p>
                        <div className="d-flex align-items-center">
                            <div className="ms-2">
                                <img src={detalle.url} width={100} alt="foto-producto" />
                            </div>
                            <div className="ms-2 text-start">
                                <p><strong>Detalle:</strong> {detalle.descripcion}</p>
                                <p><strong>Precio:</strong> {detalle.precio}</p>
                                <p><strong>Cantidad:</strong>{detalle.cantidad}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DetallePedido;
