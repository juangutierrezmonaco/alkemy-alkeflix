import { Link } from "react-router-dom";

function ListaPeliculas({ movies }) {

    let favMovies = localStorage.getItem('favs') ? JSON.parse(localStorage.getItem('favs')) : [];

    const movieIsInFavs = (movie) => {
        return favMovies.some(m => m.id === movie.id);
    }

    const favColor = ( movie ) => {
        return movieIsInFavs(movie) ? 'btn-success bg-green-600' : 'btn-error bg-red-600';
    }

    const switchFavs = ( e, movie ) => {
        const btn = e.target.tagName === 'I' ? e.target.parentElement : e.target;

        if (movieIsInFavs(movie)) {
            // Estilos en corazón
            btn.classList.remove('bg-green-600', 'btn-success');
            btn.classList.add('bg-red-600', 'btn-error');
            
            // Remuevo la película
            favMovies = favMovies.filter(m => m.id != movie.id);
            console.log(favMovies);
            localStorage.setItem('favs', JSON.stringify(favMovies));

        } else {
            // Estilos en corazón            
            btn.classList.remove('bg-red-600', 'btn-error');
            btn.classList.add('bg-green-600', 'btn-success');

            // Agrego la película
            favMovies.push(movie);
            localStorage.setItem('favs', JSON.stringify(favMovies));
        }
    }
    
    return (
        <ul className="grid grid-cols-3 gap-4 w-fit text-center">
            {movies.map( ( movie ) => (
                <li className="card card-compact w-52 bg-base-100 shadow-xl" key={movie.id}>
                    <figure><img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={'Poster de la película ' + movie.title} className='w-52'/></figure>
                    <div className="card-body">
                        <h2 className="card-title">{movie.title}</h2>
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