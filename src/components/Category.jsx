import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ItemListContainer from "./ItemListContainer";
import useFetchProductosCategoria from '../hooks/useFetchProductosCategoria';
import ImgPrev from '../assets/prev.svg';
import ImgNext from '../assets/next.svg';

const ItemsPage = 12;

const Category = () => {
    const [page, setPage] = useState(0);
    const { id } = useParams();
    const { info, cargando, cantidadDatos } = useFetchProductosCategoria(id);

    useEffect(() => {
        setPage(0);
    }, [id]);

    const handlerSiguiente = () => {
        scrollToTop()
        setPage(prevPage => prevPage + 1);
    };

    const handlerAnterior = () => {
        scrollToTop()
        setPage(prevPage => prevPage - 1);
    };

    const startIndex = page * ItemsPage;
    const endIndex = startIndex + ItemsPage;

    const canGoPrevious = page > 0;
    const canGoNext = endIndex < cantidadDatos;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <ItemListContainer
                info={(cargando == false) ? info.slice(startIndex, endIndex) : []}
                cargando={cargando}
            />
            <div className="d-flex gap-3 justify-content-center mb-3 align-items-center">
                <button className="btn-paginado" type="button" onClick={handlerAnterior} disabled={!canGoPrevious}>
                    <img src={ImgPrev} alt="Anterior" width={15} />
                    Anterior
                </button>
                <p className="number-paginado">{page + 1}</p>
                <button className="btn-paginado" type="button" onClick={handlerSiguiente} disabled={!canGoNext}>
                    Siguiente
                    <img src={ImgNext} alt="Siguiente" width={15} />
                </button>
            </div>
        </>
    );
};

export default Category;
