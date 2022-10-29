import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import ListaPeliculas from "./ListaPeliculas";

function Listado() {
    const token = sessionStorage.getItem('token');

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const API_KEY = '892e5b21eccd8afb7c43b48a426ac1e1';
        const endPoint = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=es-ES&page=1`;
        axios.get(endPoint)
            .then(res => {
                const apiData = res.data;
                setMovies(apiData.results);
            })
            .catch(err => {
                Swal.fire('Hubo errores. Intenta más tarde.');
                console.log(err);
            });
    }, [])

    return (
        <div className="flex justify-center">
            {!token && <Navigate replace to="/" />}

            <ListaPeliculas movies={movies}/>
        </div>
    )
}

export default Listado;