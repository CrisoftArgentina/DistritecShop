import ItemListContainer from "./ItemListContainer";
import Carousel from './Carousel';
import useFetchProductos from '../hooks/useFetchProductos'


const Home = () => {
    const { info, cargando } = useFetchProductos()
    return (
        <>
            <Carousel />
            <ItemListContainer
            info = {info}
            cargando = {cargando}
            />
        </>
    )
}
export default Home;