import { useParams } from "react-router-dom";
import { useState , useEffect  } from "react";
import ItemListContainer from "./ItemListContainer";
import useFetchProductosCategoria from '../hooks/useFetchProductosCategoria';
import ImgPrev from '../assets/prev.svg'
import ImgNext from '../assets/next.svg'

const Category = () => {
    const [page, setPage] = useState(0)
    const { id } = useParams()
    const { info, cargando } = useFetchProductosCategoria(id, page)
    
    useEffect(() => {
        setPage(0);
    }, [id]);

    const handlerSiguiente = () => {
        setPage(prevPage => prevPage + 1);
    };
    const handlerAnterior = () => {
        setPage(prevPage => prevPage - 1);
    };

    return (
        <>
            <ItemListContainer
                info={info}
                cargando={cargando}
            />
            <div className="d-flex gap-3 justify-content-center mb-3 align-items-center"> 
                <button className="btn-paginado" type="button" onClick={handlerAnterior}>
                    <img src={ImgPrev} alt="Anterior" width={15} />
                    Anterior
                </button>
                <p className="number-paginado">{page+1}</p>
                <button className="btn-paginado" type="button" onClick={handlerSiguiente}>
                    Siguiente
                    <img src={ImgNext} alt="Siguiente"  width={15} />
                </button>
            </div>

        </>
    )
}

export default Category;