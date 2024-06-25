// eslint-disable-next-line no-unused-vars
import React, { useState, useContext, useEffect } from 'react';
import { getFirestore, collection, addDoc, updateDoc, doc, query, where, getDocs, increment, getDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import CardCarrito from "./CardCarrito";
import Login from './Login';
import { CantidadCarritoContext } from '../contexts/CantidadCarritoContext';
import { DataPedidoContext } from '../contexts/DataPedidoContext';
import ItemsAgregados from './ItemsAgregados';

const ConfirmarPedido = () => {
    const { addToCart } = useContext(CantidadCarritoContext);
    const { addToData } = useContext(DataPedidoContext);
    const [correo, setCorreo] = useState("");

    useEffect(() => {
        const cuenta = localStorage.getItem('correo') || "";
        setCorreo(cuenta);
    }, []);

    const handleAnular = () => {
        addToData([])
        localStorage.removeItem('cartItems');

    };

    const db = getFirestore();
    const handleConfirm = async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const clienteData = {
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            direccion: formData.get('direccion'),
            localidad: formData.get('localidad'),
            comentarios: formData.get('comentarios')
        };

        try {
            const result = await Swal.fire({
                title: "¿Estás seguro que deseas confirmar el pedido?",
                icon: "info",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                denyButtonText: `No Confirmar`
            });

            if (result.isConfirmed) {
                const clienteRef = await addDoc(collection(db, "clientes"), clienteData);
                const clienteId = clienteRef.id;


                const itemsFromLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
                if (!itemsFromLocalStorage) {
                    throw new Error("No hay ítems en el carrito.");
                }

                const pedidoData = {
                    numero: await generateOrderNumber(),
                    fecha: new Date(),
                    clienteRef: doc(db, "clientes", clienteId)
                };
                const pedidoRef = await addDoc(collection(db, "pedidos"), pedidoData);
                const pedidoId = pedidoRef.id;

                for (let item of itemsFromLocalStorage) {
                    const detalleData = {
                        pedidoRef: doc(db, "pedidos", pedidoId),
                        productoCodigo: item.codigo,
                        cantidad: item.cantidad,
                        precio: item.precio
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

                await Swal.fire({
                    position: 'top-start',
                    icon: "success",
                    title: "Pedido Confirmado",
                    showConfirmButton: false,
                    customClass: 'swal-wide',
                    timer: 1000
                });

                // Limpiar carrito y actualizar estado
                const cantidad = itemsFromLocalStorage.reduce((acc, item) => acc + item.cantidad, 0);
                addToCart(-cantidad);
                addToData([]);
                localStorage.removeItem('cartItems');
                localStorage.removeItem('cartCantidad');
                window.dispatchEvent(new Event('storage'));

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

    return (
        <>
            <h2 className="mt-4">Confirmar Pedido</h2>
            <div className="row p-4 m-0">
                <section className="col-6">
                    <div className="container-confirm">
                        <ItemsAgregados ButtonsVisibles={false} />
                    </div>
                </section>
                <section className="container-confirm col-6">
                    <Login />
                </section>
            </div>
        </>
    );
};

export default ConfirmarPedido;
