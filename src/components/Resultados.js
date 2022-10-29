import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ListaPeliculas from "./ListaPeliculas";

function Resultados() {
    
    const token = sessionStorage.getItem('token');

    const { keyword } = useParams();

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const API_KEY = '892e5b21eccd8afb7c43b48a426ac1e1';
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-ES&query=${keyword}`;
        axios.get(endPoint)
            .then(res => {
                const apiData = res.data.results;
                setMovies(apiData);

                if (apiData.length === 0){
                    Swal.fire('Tu búsqueda no arrojo resultados.');
                }
            })
            .catch(err => {
                Swal.fire('Hubo errores. Intenta más tarde.');
                console.log(err);
            });
    }, [keyword])
    

    return (
        <div className="flex flex-col items-center">
            {!token && <Navigate replace to="/" />}

            <h1 className="text-4xl mb-5">Resultados relacionados con: <em>{keyword}</em></h1>
            {movies.length === 0 && <h1 className="text-4xl mb-5">Sin resultados.</h1> } 

            <ListaPeliculas movies={movies}/>
        </div>
    )
}

export default Resultados;