
import {Movie} from "../../src/models/Movie"
import {TMDbSearchResult, TMDbCreditsResult} from "../../src/models/TMDbInterfaces"
import {SearchResult, CastingResult} from "../../src/models/TMDbConnector"

export const validUrl = "https://www.example.com";
export const validImagesEndpoint = "https://www.example.com/images";
export const apiKey = "apiKey";
export const searchKeywords = "keyword1 keyword2";
export const validMovieId = 10;
export const validPage = 2;

export const exampleSearchUrl = new URL(`${validUrl}/search/movie?query=${searchKeywords}&api_key=${apiKey}&page=${validPage}`);

export const exampleCreditsUrl = new URL(`${validUrl}/movie/${validMovieId}/credits?api_key=${apiKey}`);

export const authErrorResponse = JSON.stringify({
    status_code: 7,
    status_message: "Invalid API key: You must be granted a valid key."
});

export const enum HttpCode {
    AuthError = 401,
    ResourceNotFound = 404,
    Ok = 200
};

export const resourceNotFoundResponse = JSON.stringify({
    status_code: 34,
    status_message: "The resource you requested could not be found."
});

export const exampleMovie: Movie = {
    id: validMovieId,
    title: "Movie Title",
    poster: new URL(validUrl),
    overview: "Movie overview",
    releaseDate: new Date("2001-12-18")
};

export const exampleTMDbSearchResult: TMDbSearchResult = {
    page: 2,
    total_results: 12,
    total_pages: 2,
    results: [{
        vote_count: 14387,
        id: 120,
        video: false,
        vote_average: 8.3,
        title: "The Lord of the Rings: The Fellowship of the Ring",
        popularity: 50.456,
        poster_path: "/56zTpe2xvaA4alU51sRWPoKPYZy.jpg",
        original_language: "en",
        original_title: "The Lord of the Rings: The Fellowship of the Ring",
        genre_ids: [12, 14, 28],
        backdrop_path: "/pIUvQ9Ed35wlWhY2oU6OmwEsmzG.jpg",
        adult: false,
        overview: "Young hobbit Frodo Bag...",
        release_date: "2001-12-18"
    }, {
        vote_count: 13103,
        id: 122,
        video: false,
        vote_average: 8.4,
        title: "The Lord of the Rings: The Return of the King",
        popularity: 40.635,
        poster_path: "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
        original_language: "en",
        original_title: "The Lord of the Rings: The Return of the King",
        genre_ids: [12, 14, 28],
        backdrop_path: "/8BPZO0Bf8TeAy8znF43z8soK3ys.jpg",
        adult: false,
        overview: "Aragorn is reveale...",
        release_date: "2003-12-01"
    }]
};

export const exampleSearchResult: SearchResult = {
    totalResults: 12,
    totalPages: 2,
    page: 2,
    results: [{
        id: 120,
        title: "The Lord of the Rings: The Fellowship of the Ring",
        poster: new URL("/56zTpe2xvaA4alU51sRWPoKPYZy.jpg", validImagesEndpoint),
        overview: "Young hobbit Frodo Bag...",
        releaseDate: new Date("2001-12-18")
    }, {
        id: 122,
        title: "The Lord of the Rings: The Return of the King",
        poster: new URL("/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg", validImagesEndpoint),
        overview: "Aragorn is reveale...",
        releaseDate: new Date("2003-12-01")
    }]
}

export const emptyTMDbSearchResult: TMDbSearchResult = {
    page: 1,
    total_results: 0,
    total_pages: 1,
    results: []
};

export const emptySearchResult: SearchResult = {
    totalResults: 0,
    totalPages: 1,
    page: 1,
    results: []
}

export const exampleTMDbCreditsResult: TMDbCreditsResult = {
    id: 324234,
    cast: [{
        cast_id: 4,
        character: "Bishop",
        credit_id: "58481d9792514119ad008832",
        gender: 2,
        id: 1719324,
        name: "Jason Byrne",
        order: 1,
        profile_path: "/img1.png"
      }, {
        cast_id: 5,
        character: "Santa Claus",
        credit_id: "58481dadc3a3681428007f9a",
        gender: 2,
        id: 1719325,
        name: "Michael Welch",
        order: 2,
        profile_path: null
      }],
    crew: [{
        credit_id: "58481d0dc3a3681428007f52",
        department: "Directing",
        gender: 2,
        id: 1719324,
        job: "Director",
        name: "Jason Byrne",
        profile_path: "img2.png"
      }, {
        credit_id: "58481d2ac3a368140e008fab",
        department: "Directing",
        gender: 2,
        id: 1719325,
        job: "Director",
        name: "Michael Welch",
        profile_path: null
      }]
};

export const exampleCastingResult: CastingResult = {
    results: [{
        id: 1719324,
        name: "Jason Byrne",
        picture: new URL("/img1.png", validImagesEndpoint)
    }, {
        id: 1719325,
        name: "Michael Welch"
    }]
};
