
import { TMDbMovie } from "./TMDbInterfaces"

export default interface Movie {
    id: number;
    title: string;
    poster?: URL;
    overview: string;
    releaseDate: Date;
}

export function movieFromTMDb(tmdbMovie: TMDbMovie, imagesEndpoint: string): Movie {
    const movie: Movie = {
        id: tmdbMovie.id,
        title: tmdbMovie.original_title,
        overview: tmdbMovie.overview,
        releaseDate: new Date(tmdbMovie.release_date)
    };

    if (tmdbMovie.poster_path) {
        movie.poster = new URL(imagesEndpoint + tmdbMovie.poster_path);
    }

    return movie;
}
