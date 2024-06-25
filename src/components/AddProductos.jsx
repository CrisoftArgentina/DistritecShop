import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import dataJson from "../products.json";
import Swal from 'sweetalert2';

const AddProducts = () => {
    const handleClickDatos = async () => {
        try {
            dataJson.forEach((element) => {
                addDoc(collection(db, "pedidos"), element)
            })
            Swal.fire({
                position: 'top-start',
                icon: "success",
                title: "Pedido Confirmar",
                showConfirmButton: false,
                customClass: 'swal-wide',
                timer: 1000
            });
        } catch (error) {
            Swal.fire({
                position: 'top-start',
                icon: "error",
                title: error,
                showConfirmButton: false,
                customClass: 'swal-wide',
                timer: 1000
            });
        }
    }

    return (
        <>
            <button onClick={handleClickDatos}>
                Cargar todos los datos
            </button>
        </>
    )
}

export default AddProducts;