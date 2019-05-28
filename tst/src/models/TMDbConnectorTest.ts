/// <reference types="jest" />

import {GlobalWithFetchMock} from "jest-fetch-mock";
import {TMDbConnector} from "../../../src/models/TMDbConnector";
import * as data from "../../data/TMDbConnectorExampleData";

import * as queryString from "query-string";

const globalWithFetchMock: GlobalWithFetchMock = global as GlobalWithFetchMock;
globalWithFetchMock.fetch = require('jest-fetch-mock');
globalWithFetchMock.fetchMock = globalWithFetchMock.fetch;

declare const global: any;
global.fetch = fetchMock;

function expectUrlsToBeEqual(url1: URL, url2: URL): void {
    expect(url1.hostname).toEqual(url2.hostname);
    expect(url1.protocol).toEqual(url2.protocol);
    expect(url1.pathname).toEqual(url2.pathname);
    expect(queryString.parse(url1.search)).toEqual(queryString.parse(url2.search));
}

function fetchMockResponseOnce(responseCode: data.HttpCode, jsonBody: Object) {
    globalWithFetchMock.fetchMock.mockResponseOnce(
        () => new Promise(resolve => {
            setImmediate(() => resolve({ 
                body: JSON.stringify(jsonBody),
                status: responseCode
            }));
        })
    );
}


describe("Connector construction", () => {

    it("should throw when api key is empty", () => {
        expect(() => new TMDbConnector(data.validUrl, "", data.validImagesEndpoint)).toThrowError();
    });

    it("should throw when an endpoint is empty", () => {
        expect(() => new TMDbConnector("", data.apiKey, data.validImagesEndpoint)).toThrowError();
        expect(() => new TMDbConnector(data.validUrl, data.apiKey, "")).toThrowError();
    });

    it("should build a valid TMDbConstructor if constructor params are valid", () => {
        const tmdbConnector = new TMDbConnector(data.validUrl, data.apiKey, data.validImagesEndpoint);
        
        expect(tmdbConnector.endpoint).toEqual(data.validUrl);
        expect(tmdbConnector.apiKey).toEqual(data.apiKey);
        expect(tmdbConnector.imagesEndpoint).toEqual(data.validImagesEndpoint);
    })
});

describe("TMDb API calls", () => {

    let tmdbConnector: TMDbConnector;

    beforeEach(() => {
        tmdbConnector = new TMDbConnector(data.validUrl, data.apiKey, data.validImagesEndpoint);
    });

    afterEach(() => {
        globalWithFetchMock.fetchMock.mockClear();
    });

    describe("TMDb Movie Search", () => {
        
        it("should throw on authentication error", () => {
            fetchMockResponseOnce(data.HttpCode.AuthError, data.authErrorResponse);

            return expect(tmdbConnector.search(data.searchKeywords)).rejects.toThrowError();
        });

        it("should not throw on empty results", () => {
            fetchMockResponseOnce(data.HttpCode.Ok, data.emptyTMDbSearchResult);

            return expect(tmdbConnector.search(data.searchKeywords)).resolves.toEqual(data.emptySearchResult);
        });

        it("should send a valid query to TMDb", async () => {
            fetchMockResponseOnce(data.HttpCode.Ok, data.exampleTMDbSearchResult);

            await tmdbConnector.search(data.searchKeywords, data.validPage);
            return expectUrlsToBeEqual(new URL(globalWithFetchMock.fetch.mock.calls[0][0]), data.exampleSearchUrl);
        });

        it("should return the results given by the API", () => {
            fetchMockResponseOnce(data.HttpCode.Ok, data.exampleTMDbSearchResult);

            return expect(tmdbConnector.search(data.searchKeywords)).resolves.toEqual(data.exampleSearchResult);
        });

    });

    describe("TMDb Casting Information", () => {
       
        it("should throw on authentication error", () => {
            fetchMockResponseOnce(data.HttpCode.AuthError, data.authErrorResponse);

            return expect(tmdbConnector.getMovieCasting(data.exampleMovie)).rejects.toThrowError();
        });

        it("should throw when movie not found", () => {
            fetchMockResponseOnce(data.HttpCode.ResourceNotFound, data.resourceNotFoundResponse);

            return expect(tmdbConnector.getMovieCasting(data.exampleMovie)).rejects.toThrowError();
        });

        it("should send a valid query to TMDb", async () => {
            fetchMockResponseOnce(data.HttpCode.Ok, data.exampleTMDbCreditsResult);

            await tmdbConnector.getMovieCasting(data.exampleMovie);
            expectUrlsToBeEqual(new URL(globalWithFetchMock.fetch.mock.calls[0][0]), data.exampleCreditsUrl);
        });

        it("should return the results given by the API", () => {
            fetchMockResponseOnce(data.HttpCode.Ok, data.exampleTMDbCreditsResult);

            return expect(tmdbConnector.getMovieCasting(data.exampleMovie)).resolves.toEqual(data.exampleCastingResult);
        });

    });
});

