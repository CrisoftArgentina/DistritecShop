import { useEffect, useState } from "react";

const useFetchProductos = () => {
    const [info, setInfo] = useState(null)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        fetch('http://api.portal-distritec.com.ar/api/productos')
            .then(response => response.json())
            .then(datos => {
                setInfo(datos)
                setCargando(false)
            })
            .catch(error => console.log(error))

    }, [])

    return { info, cargando }
}

export default useFetchProductos;
