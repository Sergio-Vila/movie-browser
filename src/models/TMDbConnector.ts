
import Actor, { actorFromTMDbCast } from "./Actor"
import Movie, { movieFromTMDb } from "./Movie";
import { TMDbSearchResult, TMDbCreditsResult } from "./TMDbInterfaces"

import * as queryString from "query-string"

function buildUrl(base: string, resource: string, query: {[key: string]: string}) {
    if (base.charAt(base.length - 1) === "/") {
        return base.substring(0, base.length - 1) + resource + "?" + queryString.stringify(query, { sort: false });
    }
    return base + resource + "?" + queryString.stringify(query);
}

export interface SearchResult {
    results: Movie[];
    totalResults: number;
    totalPages: number;
    page: number;
};

export interface CastingResult {
    results: Actor[];
}

export default class TMDbConnector {

    readonly apiKey: string;
    readonly endpoint: string;
    readonly imagesEndpoint: string;

    constructor(endpoint: string, apiKey: string, imagesEndpoint: string) {
        if (endpoint === "" || imagesEndpoint == "" || apiKey == "") {
            throw new Error("The arguments cannot be empty");
        }

        this.apiKey = apiKey;
        this.endpoint = endpoint;
        this.imagesEndpoint = imagesEndpoint;
    };

    private async apiCall(resource: string, query: {[key: string]: unknown} = {}): Promise<{[key: string]: unknown}> {
        const queryWithAuth = Object.assign({
            api_key: this.apiKey
        }, query);

        return fetch(buildUrl(this.endpoint, resource, queryWithAuth))
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    return Promise.reject(new Error(`Received HTTP code ${response.status}: ${response.statusText}`));
                }

                return response.json();
            });
    }

    async search(text: string, page: number = 1): Promise<SearchResult> {
        return this.apiCall("/search/movie", {
            query: text,
            page: page
        }).then((apiCallResult: unknown) => {
            const searchResult = apiCallResult as TMDbSearchResult;
            
            return {
                results: searchResult.results.map(movie => movieFromTMDb(movie, this.imagesEndpoint)),
                totalResults: searchResult.total_results,
                totalPages: searchResult.total_pages,
                page: searchResult.page
            };
        });
    };

    async getMovieCasting(movie: Movie): Promise<CastingResult> {
        return this.apiCall(`/movie/${movie.id}/credits`)
            .then((apiCallResult: unknown) => {
                const creditsResult = apiCallResult as TMDbCreditsResult;

                return {
                    results: creditsResult.cast.map(actor => actorFromTMDbCast(actor, this.imagesEndpoint))
                };
            });
    };
}