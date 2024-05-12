import Card from './Card'

const ItemListContainer = () => {
    return (
        <div>
            <div className='head-itemList'>
                <div className='container'>
                <p className='text-start mt-3 title-container'>Nuestros Productos</p>
                </div>

            </div>
            <div className="container mb-3 mt-6">
                <div className="row mt-4">
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3 col-xxl-3">
                        <Card
                            titulo={'Válvula'}
                            url={'https://portal-distritec.com.ar/imgProd/0259002722.jpg'}
                            precio={225406.71}
                            codigo={'0259002722201'}
                            descripcion={'Valvula VALV CH1 5/2 1/4 220V'}
                            stock={0}
                            destacado={1}
                        />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3 col-xxl-3">
                        <Card
                            titulo={'FR+L'}
                            url={'https://portal-distritec.com.ar/imgProd/0103003564.jpg'}
                            precio={215917.52}
                            codigo={'0103003564'}
                            descripcion={'FR+L QBM4 1/2 10BAR 40M'}
                            stock={15}
                            destacado={0}
                        />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3 col-xxl-3">
                        <Card
                            titulo={'Auxilares'}
                            url={'https://portal-distritec.com.ar/imgProd/0400001711.jpg'}
                            precio={44858.80}
                            codigo={'0400001711'}
                            descripcion={'REG CAUDAL UNI 1/8 VA'}
                            stock={0}
                            destacado={1}
                        />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3 col-xxl-3">
                        <Card
                            titulo={'Fluidos'}
                            url={'https://portal-distritec.com.ar/imgProd/1335.jpg'}
                            precio={320648.00}
                            codigo={'1335BA4'}
                            descripcion={'Valvula JEFFERSON "1/2 BSP'}
                            stock={2}
                            destacado={0}
                        />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3 col-xxl-3">
                        <Card
                            titulo={'Direccionales'}
                            url={'https://portal-distritec.com.ar/imgProd/doble3c3.jpg'}
                            precio={741950.20}
                            codigo={'DSG-03-3C3-A120'}
                            descripcion={'VALVULA 4/3 DOBLE CETOP 5 - 110V'}
                            stock={4}
                            destacado={0}
                        />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3 col-xxl-3">
                        <Card
                            titulo={'Tratamiento'}
                            url={'https://portal-distritec.com.ar/imgProd/KFCD.jpg'}
                            precio={89834.00}
                            codigo={'K-FCD-C-30'}
                            descripcion={'FILTRO P/FCD-C-30'}
                            stock={15}
                            destacado={0}
                        />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3 col-xxl-3">
                        <Card
                            titulo={'Tratamiento'}
                            url={'https://portal-distritec.com.ar/imgProd/0103000264.jpg'}
                            precio={91931.88}
                            codigo={'0103000264'}
                            descripcion={'FILTRO QBM4 1/2 10BAR 40M'}
                            stock={2}
                            destacado={1}
                        />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3 col-xxl-3">
                        <Card
                            titulo={'Fluidos'}
                            url={'https://portal-distritec.com.ar/imgProd/bobina%20din.jpg'}
                            precio={112553.00}
                            codigo={'BOBINA DIN 220/50'}
                            descripcion={'BOBINA DIN PARA VALVULA JEFFERSON'}
                            stock={-10}
                            destacado={1}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemListContainer;