import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer'
import PiePagina from './components/PiePagina'
import ScrollTop from './components/ScrollTop';

function App() {

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <ItemListContainer />
        <ScrollTop />
      </main>
      <footer>
        <PiePagina />
      </footer>
    </>
  )
}

export default App
