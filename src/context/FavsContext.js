import React, { useContext, useEffect, useState } from 'react';

const FavsContext = React.createContext([]);

const useFavs = () => {
    return useContext(FavsContext);
}

const FavsProvider = ({ children }) => {
    const [favMovies, setFavMovies] = useState([]);

    useEffect(() => {
        const favMovies = localStorage.getItem('favs') ? JSON.parse(localStorage.getItem('favs')) : [];
        setFavMovies(favMovies);
    }, [])

    const movieIsInFavs = (movie) => {
        return favMovies.some(m => m.id === movie.id);
    }

    const switchFavs = ( e, movie ) => {
        const btn = e.target.tagName === 'I' ? e.target.parentElement : e.target;

        if (movieIsInFavs(movie)) {
            // Estilos en corazón
            btn.classList.remove('bg-green-600', 'btn-success');
            btn.classList.add('bg-red-600', 'btn-error');
            
            // Remuevo la película
            setFavMovies(prevState => {
                const newState = prevState.filter(m => m.id !== movie.id);
                localStorage.setItem('favs', JSON.stringify(newState));
                return newState;
            });

        } else {
            // Estilos en corazón            
            btn.classList.remove('bg-red-600', 'btn-error');
            btn.classList.add('bg-green-600', 'btn-success');

            // Agrego la película
            setFavMovies(prevState => {
                const newState = prevState.concat(movie);
                localStorage.setItem('favs', JSON.stringify(newState));
                return newState;
            });
        }
    }

    const context = {
        favMovies,
        setFavMovies,
        movieIsInFavs,
        switchFavs
    }

    return (
        <FavsContext.Provider value={context}>
            {children}
        </FavsContext.Provider>
    );
}

export { useFavs, FavsProvider };