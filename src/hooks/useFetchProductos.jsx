import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { getDocs, collection } from "firebase/firestore"

const useFetchProductos = () => {
    const [info, setInfo] = useState(null)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "productos"))
                const obtenerDocumentos = querySnapshot.docs.map(element => ({ id: element.id, ...element.data()}))
                setInfo(obtenerDocumentos)
                setCargando(false)
            } catch(error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return { info, cargando }
}

export default useFetchProductos;
