
import { TMDbMovie } from "./TMDbInterfaces"

export interface Movie {
    id: number;
    title: string;
    poster: URL;
    overview: string;
    releaseDate: Date;
}

export function movieFromTMDb(tmdbMovie: TMDbMovie, imagesEndpoint: string): Movie {
    return {
        id: tmdbMovie.id,
        title: tmdbMovie.original_title,
        overview: tmdbMovie.overview,
        releaseDate: new Date(tmdbMovie.release_date),
        poster: new URL(tmdbMovie.poster_path, imagesEndpoint)
    };
}
