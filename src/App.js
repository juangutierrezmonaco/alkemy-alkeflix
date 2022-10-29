import Login from './components/Login';
import Listado from './components/Listado';
import Detalle from './components/Detalle';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Resultados from './components/Resultados';
import Favoritos from './components/Favoritos';
import { FavsProvider } from './context/FavsContext';

function App() {    
    return (
        <FavsProvider >
            <Header/>
            <Routes>
                <Route path='/' element={<main className='mt-4 container flex justify-center'><Login /></main>} />
                <Route path='/listado' element={<main className='mt-4 container flex justify-center'><Listado /></main>} />
                <Route path='/movie/:movieID' element={<main className='mt-4 container flex justify-center'><Detalle /></main>} />
                <Route path='/resultados/:keyword' element={<main className='mt-4 container flex justify-center'><Resultados /></main>} />
                <Route path='/favoritos' element={<main className='mt-4 container flex justify-center'><Favoritos /></main>} />
            </Routes>
            <Footer/>
        </FavsProvider>
    );
}

export default App;
