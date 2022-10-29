import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function Detalle() {
    const token = sessionStorage.getItem('token');
    const { movieID } = useParams();

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const API_KEY = '892e5b21eccd8afb7c43b48a426ac1e1';
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=es-ES`;
        axios.get(endPoint)
            .then(res => {
                const apiData = res.data;
                setMovie(apiData);
            })
            .catch(err => {
                Swal.fire('Hubo errores. Intenta más tarde.');
                console.log(err);
            });
    }, [])

    return (
        <>
            {!token && <Navigate replace to="/" />}
            
            {!movie && <h2>Cargando...</h2>}

            {movie &&
                <div className="flex gap-10 max-w-3xl">
                    <div className="w-1/3">
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={'Poster de la película ' + movie.title} />
                    </div>

                    <div className="flex flex-col w-2/3">
                        <p className="text-3xl">
                            <span className="underline">Título: </span>
                            <span>{movie.title}</span>
                            
                        </p>

                        <ul className="text-3xl">
                            <span className="underline">Géneros</span>

                            {movie?.genres && movie.genres.map(genre => <li key={genre.id}>{genre.name}</li>)}

                        </ul>

                        <p className="text-3xl">
                            <span className="underline">Sinopsis:</span> 
                            <span>{movie.overview}</span>
                        </p>
                    </div>
                </div>

            }
        </>
    )
}

export default Detalle;