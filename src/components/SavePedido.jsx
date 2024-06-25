import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, updateDoc, doc, query, where, getDocs, increment, getDoc } from 'firebase/firestore';
import { CantidadCarritoContext } from '../contexts/CantidadCarritoContext';
import { DataPedidoContext } from '../contexts/DataPedidoContext';
import Swal from 'sweetalert2';

const SavePedido = () => {
    const [loading, setLoading] = useState(false);
    const { addToCart } = useContext(CantidadCarritoContext);
    const { addToData } = useContext(DataPedidoContext);
    const navigate = useNavigate();

    const db = getFirestore();
    const handleConfirm = async (event) => {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "¿Estás seguro que deseas confirmar el pedido?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                customClass: {
                    confirmButton: 'swal2-confirm-custom',
                },
            });

            if (result.isConfirmed) {
                setLoading(true)
                const clienteId = localStorage.getItem('clienteID')
                const itemsFromLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
                if (!itemsFromLocalStorage) {
                    throw new Error("No hay ítems en el carrito.");
                }

                const total = itemsFromLocalStorage.reduce((acc, element) => acc + element.cantidad * element.precio, 0);

                const pedidoData = {
                    numero: await generateOrderNumber(),
                    fecha: new Date(),
                    clienteRef: doc(db, "clientes", clienteId),
                    total: formatPrecio(total),
                    estadoenvio: 0
                };

                const pedidoRef = await addDoc(collection(db, "pedidos"), pedidoData);
                const pedidoId = pedidoRef.id;

                for (let item of itemsFromLocalStorage) {
                    const detalleData = {
                        pedidoRef: doc(db, "pedidos", pedidoId),
                        productoCodigo: item.codigo,
                        cantidad: item.cantidad,
                        precio: item.precio,
                        url: item.url,
                        descripcion: item.descripcion
                    };
                    await addDoc(collection(db, "detallepedido"), detalleData);

                    const q = query(collection(db, "productos"), where("codigo", "==", item.codigo));
                    const querySnapshot = await getDocs(q);

                    if (querySnapshot.empty) {
                        console.error("El ítem no existe:", item.codigo);
                        continue;
                    }

                    querySnapshot.forEach(async (docSnapshot) => {
                        const itemDoc = docSnapshot.data();
                        const currentStock = itemDoc.Stock;
                        const newStock = currentStock - item.cantidad;

                        if (newStock < 0) {
                            throw new Error(`Stock insuficiente para el ítem ${item.codigo}`);
                        }
                        await updateDoc(doc(db, "productos", docSnapshot.id), { Stock: newStock });
                    });
                }
                setLoading(false)
                await Swal.fire({
                    position: 'top-start',
                    icon: "success",
                    title: "Pedido Confirmado",
                    showConfirmButton: false,
                    customClass: 'swal-wide',
                    timer: 1000
                });

                const cantidad = itemsFromLocalStorage.reduce((acc, item) => acc + item.cantidad, 0);
                addToCart(-cantidad);
                addToData([]);
                localStorage.removeItem('cartItems');
                localStorage.removeItem('cartCantidad');
                window.dispatchEvent(new Event('storage'));

                navigate('/MisPedidos');

            } else if (result.isDenied) {
                Swal.fire("Pedido sin confirmar", "", "info");
            }
        } catch (error) {

            Swal.fire({
                position: 'top-start',
                icon: "error",
                title: error.message,
                showConfirmButton: false,
                customClass: 'swal-wide',
                timer: 1000
            });

            console.error("Error al procesar el pedido: ", error);
        }
    };
    const generateOrderNumber = async () => {
        const counterRef = doc(db, 'counters', 'orderCounter');

        try {
            await updateDoc(counterRef, { current: increment(1) });

            const counterSnapshot = await getDoc(counterRef);
            if (counterSnapshot.exists()) {
                const counterData = counterSnapshot.data();
                return counterData.current;
            } else {
                throw new Error('El documento del contador no existe.');
            }
        } catch (error) {
            console.error('Error al generar el número de pedido:', error);
            throw new Error('No se pudo generar el número de pedido');
        }
    };
    const formatPrecio = (precio) => {
        return precio.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS'
        });
    };

    if (loading) {
        return <div className="loader-container">
            <div className="loader">
                <div className="spinner"></div>
            </div>
        </div>;
    }

    return (
        <div>
            <p className="mb-3"> Estas por confirmar el pedido, ¿desea continuar?</p>
            <button type="button" className="btn-addCart p-2" onClick={handleConfirm} >Confirmar Compra</button>
        </div>
    )
}
export default SavePedido