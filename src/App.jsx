import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import PiePagina from './components/PiePagina';
import ScrollTop from './components/ScrollTop';
import ItemDetailContainer from './components/ItemDetailContainer';
import Category from './components/Category';
import ConfirmarPedido from './components/ConfirmarPedido';
import MisPedidos from './components/MisPedidos';
import DetallePedido from './components/DetallePedido';
import { CantidadCarritoProvider } from './contexts/CantidadCarritoContext';
import { DataPedidoProvider } from './contexts/DataPedidoContext';
import { CorreoContextProvider } from './contexts/CorreoContext';
import SideBar from './components/SideBar';

function App() {
  return (
    <BrowserRouter>
      <CorreoContextProvider>
        <DataPedidoProvider>
          <CantidadCarritoProvider>
            <header>
              <NavBar />
            </header>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/item/:id" element={<ItemDetailContainer />} />
              <Route path="/category/:id" element={<Category />} />
              <Route path="/ConfirmarPedido/" element={<ConfirmarPedido />} />
              <Route path="/MisPedidos/" element={<MisPedidos />} />
              <Route path="/DetallePedido/:id" element={<DetallePedido />} />
            </Routes>
            <footer>
              <ScrollTop />
              <PiePagina />
            </footer>
            <SideBar />
          </CantidadCarritoProvider>
        </DataPedidoProvider>
      </CorreoContextProvider>
    </BrowserRouter>
  );
}

export default App;