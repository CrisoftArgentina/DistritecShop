// src/hooks/useLogin.js
import { useState, useEffect, useContext } from 'react';
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { CorreoContext } from '../contexts/CorreoContext';

const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [clientExists, setClientExists] = useState(false);
    const [nuevoUsuario, setNuevoUsuario] = useState(false);
    const [pedidoAceptado, setPedidoAceptado] = useState(false);
    const { addCorreo } = useContext(CorreoContext);

    useEffect(() => {
        const storedEmail = localStorage.getItem('correo');
        if (storedEmail) {
            setEmail(storedEmail);
            setPedidoAceptado(true);
        }
    }, []);

    const verificarUsuario = async (email, password) => {
        try {
            const q = query(collection(db, "clientes"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                setClientExists(true);
                setPasswordVisible(true);
    
                if (passwordVisible) {
                    const clienteDoc = querySnapshot.docs[0]; // Obtener el primer documento
                    const clienteId = clienteDoc.id; // Obtener el ID del cliente
    
                    const passwordQuery = query(collection(db, "clientes"), where("email", "==", email), where("contrasena", "==", password));
                    const passwordSnapshot = await getDocs(passwordQuery);
    
                    if (!passwordSnapshot.empty) {
                        setPedidoAceptado(true);
                        localStorage.setItem('correo', email);
                        localStorage.setItem('clienteID', clienteId); // Guardar clienteId en localStorage
                        addCorreo(email);
                    } else {
                        Swal.fire({
                            position: 'top-end',
                            icon: "error",
                            title: "Contraseña Incorrecta",
                            showConfirmButton: false,
                            customClass: 'swal-wide',
                            timer: 1000
                        });
                    }
                }
            } else {
                setClientExists(false);
                setPasswordVisible(false);
                setNuevoUsuario(true);
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            // Aquí puedes manejar el error de inicio de sesión, por ejemplo, mostrando un mensaje al usuario
        }
    };

    const confirmarPedido = (email) => {
        setPedidoAceptado(true);
        localStorage.setItem('correo', email);
        addCorreo(email);
    };

    return {
        email,
        password,
        passwordVisible,
        nuevoUsuario,
        pedidoAceptado,
        setEmail,
        setPassword,
        verificarUsuario,
        confirmarPedido,
    };
};

export default useLogin;
