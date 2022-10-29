import movieNotFound from '../assets/img/movie-not-found.svg';
import { useState, useEffect } from 'react';

function PeliculaCard({ title, tagline, poster_path, backdrop_path, overview, runtime, genres, release_dates, production_countries, credits }) {

    // Imagenes
    const posterPath = poster_path ? `https://image.tmdb.org/t/p/original/${poster_path}` : movieNotFound;
    const backdropPath = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
    const backgroundStyle = {
        backgroundImage: `url(${backdropPath})`
    }

    // Si no lo hago con hooks para usar el useEffect surgen errores.
    // NOTA: No uso el release_date que viene de la api porque viene por defecto la fecha de estados unidos, así tengo más control sobre qué fecha
    //       muestro.
    const [rate, setRate] = useState('SIN DATOS');
    const [releaseDate, setReleaseDate] = useState('SIN DATOS');
    const [director, setDirector] = useState('SIN DATOS');
    const [nacionality, setNacionality] = useState('SIN DATOS');

    useEffect(() => {
        /* Busco la fecha de estreno en Argentina, si no la consigo agarro la que viene por default */
        const r_date = new Date(release_dates && (release_dates.results.find(rD => rD.iso_3166_1 == 'AR') || release_dates.results[0]).release_dates[0].release_date);
        r_date.setDate(r_date.getDate() + 1);
        r_date != 'Invalid Date' && setReleaseDate(r_date.toLocaleDateString());

        /* Uso la certificación de Estados Unidos porque para Argetina no hay mucha información (La API no funciona bien con Argentina) */
        const rate = release_dates && (release_dates.results.find(rD => rD.iso_3166_1 == 'US') || release_dates.results[0]).release_dates[0].certification;
        rate && setRate(rate)

        const director = credits && credits.crew.filter(c => c.job == 'Director')[0];
        director && director.name && setDirector(director.name);

        const nacionality = production_countries && production_countries.length > 0 && production_countries[0].name;
        nacionality && setNacionality(nacionality);
    }, []);

    return (
        <div >
            <article className="movieDetailCard">
                <div className='movieDetailCard-header'>
                    <div className='movieDetailCard-header_background' style={backgroundStyle}></div>
                </div>

                <div className='movieDetailCard-body'>
                    <div className='movieDetailCard-body_left'>

                        <button className='movieDetailCard-body_left_poster pointer-events-none'>
                            <img src={posterPath} alt={`Póster de la película ${title}`} className={!poster_path ? 'movieDetailCard-body_left_poster_notFound' : ''} />
                        </button>

                        <ul className='movieDetailCard-body_left_details rounded-xl tracking-wider font-quicksand text-xs sm:text-sm md:text-base'>
                            <li>
                                <span className='underline  font-semibold'>Fecha de estreno</span>
                                <span className='font-[500]'> {releaseDate}</span>
                            </li>
                            <li>
                                <span className='underline  font-semibold'>Director</span>
                                <span className='font-[500]'> {director}</span>
                            </li>
                            <li>
                                <span className='underline  font-semibold'>Nacionalidad</span>
                                <span className='font-[500]'> {nacionality}</span>
                            </li>
                            <li>
                                <span className='underline  font-semibold'>Calificación</span>
                                <span className='font-[500]'> {rate}</span>
                            </li>
                            <li>
                                <span className='underline font-semibold'>Duración</span>
                                <span className='font-[500]'>{runtime ? `${runtime} Minutos` : 'SIN DATOS'}</span>
                            </li>
                        </ul>
                    </div>

                    <div className='movieDetailCard-body_right'>
                        <div className="movieDetailCard-body_right_top">
                            <div className='movieDetailCard-body_right_top_titles rounded-lg'>
                                <h1 className='text-lg xs:text-base sm:text-xl md:text-2xl lg:text-4xl font-[400]'>{title}</h1>
                                <h2 className='text-sm xs:text-sm sm:text-base md:text-lg lg:text-xl font-[300] italic'>{tagline}</h2>
                            </div>

                            <ul className='movieDetailCard-body_right_top_genres'>
                                {genres && genres.map((g) => (
                                    <li className='badge badge-lg badge-primary text-[0.7rem] sm:text-xs md:text-sm lg:text-lg' key={g.id}>{g.name}</li>
                                ))}
                            </ul>
                        </div>


                        <p className='tracking-wider flex flex-col gap-2 min-h-[200px]'>
                            <span className='text-2xl xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl'>Sinopsis</span>
                            <span className='text-base xs:text-xs sm:text-sm md:text-base lg:text-lg'>{overview || 'Sin datos sobre la sinopsis de esta película'}</span>
                        </p>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default PeliculaCard;