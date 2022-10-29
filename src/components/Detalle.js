import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import PeliculaCard from "./PeliculaCard";
import './PeliculaCard.css'

function Detalle() {
    const token = sessionStorage.getItem('token');
    const { movieID } = useParams();

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const API_KEY = '892e5b21eccd8afb7c43b48a426ac1e1';
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=es-ES&append_to_response=release_dates,credits,videos`;
        axios.get(endPoint)
            .then(res => {
                const apiData = res.data;
                setMovie(apiData);
            })
            .catch(err => {
                Swal.fire('Hubo errores. Intenta más tarde.');
                console.log(err);
            });
    }, [movieID])

    return (
        <>
            {!token && <Navigate replace to="/" />}
            
            {!movie && <h2>Cargando...</h2>}

            {movie &&
                <PeliculaCard {...movie} />
            }
        </>
    )
}

export default Detalle;