import { Link } from "react-router-dom";
import { useFavs } from "../context/FavsContext";

function ListaPeliculas({ movies }) { 
    
    const { movieIsInFavs, switchFavs } = useFavs();
    

    const favColor = ( movie ) => {
        return movieIsInFavs(movie) ? 'btn-success bg-green-600' : 'btn-error bg-red-600';
    }
    
    return (
        <ul className="grid grid-cols-4 gap-4 w-fit text-center">
            {movies.map( ( movie ) => (
                <li className="card card-compact w-64 bg-base-100 shadow-xl" key={movie.id}>
                    <figure><img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={'Poster de la película ' + movie.title} className='w-fit'/></figure>
                    <div className="card-body">
                        <h2 className="card-title text-start">{movie.title}</h2>
                        <p className=" text-start">{movie.overview.slice(0, 70)+ ' ...'}</p>
                        <div className="card-actions justify-end">
                            <Link to={`/movie/${movie.id}`} className="btn btn-primary">Ir a detalle</Link>
                        </div>
                    </div>
                    <div className="absolute top-2 right-2" onClick={(e) => switchFavs(e, movie)}>
                        <button className={`btn btn-circle btn-sm text-white border-none ${favColor(movie)}`}><i className="fa-solid fa-heart"></i></button>
                    </div>
                </li>
            ))}

        </ul>
    )
}

export default ListaPeliculas;