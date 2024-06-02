import { useEffect, useState } from "react";

const useFetchProductosCategoria = ( categoria , page ) => {    
    const [ info, setInfo ] = useState(null)
    const [ cargando, setCargando ] = useState(true)

    useEffect(() => {
        setCargando(true)
        fetch(`http://api.portal-distritec.com.ar/api/ProductosCategoria?categoria=${categoria}&page=${page}`)
        .then( response => response.json())
        .then( datos => {
            setInfo(datos)
            setCargando(false)
        })
        .catch( error => console.log(error))

    }, [categoria, page])

    return { info, cargando } 
}

export default useFetchProductosCategoria;
