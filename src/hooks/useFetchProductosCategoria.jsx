import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { getDocs, collection, query, where } from "firebase/firestore";

const useFetchProductos = (tipoproducto) => {
    const [info, setInfo] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [cantidadDatos, setcantidadDatos] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let q;
                if (tipoproducto) {
                    q = query(collection(db, "productos"), where("nombre", "==", tipoproducto.toUpperCase()));
                } else {
                    q = collection(db, "productos");
                }

                const querySnapshot = await getDocs(q);
                const obtenerDocumentos = querySnapshot.docs.map(element => ({ id: element.id, ...element.data() }));
                setInfo(obtenerDocumentos);
                setcantidadDatos(obtenerDocumentos.length)
                setCargando(false);
            } catch (error) {
                console.log(error);
                setCargando(false); 
            }
        };
        fetchData();
    }, [tipoproducto]);

    return { info, cargando, cantidadDatos };
};

export default useFetchProductos;

