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


function App() {

  return (
    <BrowserRouter>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/category/:id" element={<Category />} />
      </Routes>
      <footer>
        <ScrollTop />
        <PiePagina />
      </footer>
    </BrowserRouter>
  );
}

export default App;