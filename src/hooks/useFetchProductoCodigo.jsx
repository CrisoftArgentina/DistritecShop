import { useEffect, useState } from "react";

const useFetchProductoCodigo = ( codigo ) => {    
    const [ data, setData ] = useState(null)
    const [ cargando, setCargando ] = useState(true)

    useEffect(() => {
        setCargando(true)
        fetch(`http://api.portal-distritec.com.ar/api/ProductoCodigo?codigo=${codigo}&page=0`)
        .then( response => response.json())
        .then( datos => {
            console.log(datos); 
            setData(datos)
            setCargando(false)
        })
        .catch( error => console.log(error))

    }, [codigo])

    return { data, cargando } 
}

export default useFetchProductoCodigo;
