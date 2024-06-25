import { useParams } from "react-router-dom";
import useFetchProductoCodigo from "../hooks/useFetchProductoCodigo";
import CardDetail from './CardDetail'
const ItemDetailContainer = () => {
    const { id } = useParams()
    const { info, cargando } = useFetchProductoCodigo(id);
    return (
        <div>
            <div className="ps-5 pe-5 mb-3 mt-2 ">
                <div className="row mt-4 d-flex justify-content-center">
                    {
                        cargando ?
                            <div className="loader-container">
                                <div className="loader">
                                    <div className="spinner"></div>
                                </div>
                            </div>
                            :
                            <>
                                {
                                    info && info.length > 0 ? (
                                        <>
                                            {info.map((item) => (
                                                <div key={item.id}>
                                                    <CardDetail
                                                        titulo={item.tipoproducto}
                                                        url={`https://portal-distritec.com.ar/imgProd/${item.img}.jpg`}
                                                        precio={item.precio}
                                                        codigo={item.codigo}
                                                        descripcion={item.descripcion}
                                                        stock={item.Stock}
                                                        destacado={item.destacado}
                                                        id={item.id}
                                                    />
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <div>
                                            Producto no disponible.
                                        </div>
                                    )
                                }
                            </>
                    }
                </div>
            </div>
        </div>
    )
}
export default ItemDetailContainer