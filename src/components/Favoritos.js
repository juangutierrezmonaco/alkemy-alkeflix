import { Navigate } from "react-router-dom";
import { useFavs } from "../context/FavsContext";
import ListaPeliculas from "./ListaPeliculas";

function Favoritos() {

    const token = sessionStorage.getItem('token');

    const { favMovies } = useFavs();

    return (
        <div>
            {!token && <Navigate replace to="/" />}     

            <h1 className="text-4xl mb-5">Sección de Favoritos</h1>
            {favMovies.length == 0 && <h2 className="text-xl mb-5">Aún no tiene favoritos agregados.</h2>}
            <ListaPeliculas movies={favMovies}/>
        </div>
    )
}

export default Favoritos;