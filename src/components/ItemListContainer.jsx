/* eslint-disable react/prop-types */
import Card from './Card'

const ItemListContainer = ({ info, cargando }) => {
    return (
        <div>
            <div className='head-itemList'>
            </div>
            <div className="container mb-3 mt-6">
                <div className="row mt-4">
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
                                                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3 col-xxl-3 mb-4" key={item.id}>
                                                    <Card
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
                                            No hay productos disponibles.
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

export default ItemListContainer;