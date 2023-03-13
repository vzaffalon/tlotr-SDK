"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovieById = exports.getMovies = exports.getMovieByName = exports.getMovieQuotesByName = exports.getMovieQuotes = void 0;
const MovieMapper_1 = require("../mappers/MovieMapper");
const MoviesMapper_1 = require("../mappers/MoviesMapper");
const QuotesMapper_1 = require("../mappers/QuotesMapper");
const fetchWithRetry_1 = require("../utils/fetchWithRetry");
const getMovieQuotes = (movieId, apiUrl, sdkKey, retries, retryDelay) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${apiUrl}movie/${movieId}/quote`;
    const responseData = yield (0, fetchWithRetry_1.fetchWithRetry)(url, sdkKey, retries, retryDelay);
    if (responseData.ok) {
        const responseJson = yield responseData.json();
        console.log('LotrSdk: Sucessfully retrieved movie quotes');
        return {
            success: true,
            data: {
                quotes: (0, QuotesMapper_1.mapMovieQuotesApiResponse)(responseJson),
            },
            message: 'Sucessfully retrieved quote data',
        };
    }
    else {
        console.error(`LotrSdk: API request failed`);
        throw new Error("API_REQUEST_FAILED" /* SDK_ERRORS.API_REQUEST_FAILED */);
    }
});
exports.getMovieQuotes = getMovieQuotes;
const getMovieQuotesByName = (movieName, apiUrl, sdkKey, retries, retryDelay) => __awaiter(void 0, void 0, void 0, function* () {
    const getMovieByNameResponse = yield (0, exports.getMovieByName)(movieName, apiUrl, sdkKey, retries, retryDelay);
    const url = `${apiUrl}movie/${getMovieByNameResponse.data.movie.id}/quote`;
    const responseData = yield (0, fetchWithRetry_1.fetchWithRetry)(url, sdkKey, retries, retryDelay);
    if (responseData.ok) {
        const responseJson = yield responseData.json();
        console.log('LotrSdk: Sucessfully retrieved movie quotes');
        return {
            success: true,
            data: {
                quotes: (0, QuotesMapper_1.mapMovieQuotesApiResponse)(responseJson),
            },
            message: 'Sucessfully retrieved quote data',
        };
    }
    else {
        console.error(`LotrSdk: API request failed`);
        throw new Error("API_REQUEST_FAILED" /* SDK_ERRORS.API_REQUEST_FAILED */);
    }
});
exports.getMovieQuotesByName = getMovieQuotesByName;
const getMovieByName = (movieName, apiUrl, sdkKey, retries, retryDelay) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${apiUrl}movie?name=${movieName}`;
    const responseData = yield (0, fetchWithRetry_1.fetchWithRetry)(url, sdkKey, retries, retryDelay);
    if (responseData.ok) {
        const responseJson = yield responseData.json();
        const SDKResponse = {
            success: true,
            data: {
                movie: (0, MovieMapper_1.mapMovieApiResponse)(responseJson),
            },
            message: 'Sucessfully retrieved movies data',
        };
        if (SDKResponse.data.movie) {
            console.log('LotrSdk: Sucessfully retrieved movie data');
            return SDKResponse;
        }
        return {
            success: false,
            message: 'Not able to find movie',
        };
    }
    else {
        console.error(`LotrSdk: API request failed`);
        throw new Error("API_REQUEST_FAILED" /* SDK_ERRORS.API_REQUEST_FAILED */);
    }
});
exports.getMovieByName = getMovieByName;
const getMovies = (apiUrl, sdkKey, retries, retryDelay) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${apiUrl}movie`;
    const responseData = yield (0, fetchWithRetry_1.fetchWithRetry)(url, sdkKey, retries, retryDelay);
    const responseDataJson = yield responseData.json();
    return {
        success: true,
        data: {
            movies: (0, MoviesMapper_1.mapMoviesApiResponse)(responseDataJson),
        },
        message: 'Sucessfully retrieved movies data',
    };
});
exports.getMovies = getMovies;
const getMovieById = (movieId, apiUrl, sdkKey, retries, retryDelay) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${apiUrl}movie/${movieId}`;
    const responseData = yield (0, fetchWithRetry_1.fetchWithRetry)(url, sdkKey, retries, retryDelay);
    if (responseData.ok) {
        const responseDataJson = yield responseData.json();
        const SDKResponse = {
            success: true,
            data: {
                movie: (0, MovieMapper_1.mapMovieApiResponse)(responseDataJson),
            },
            message: 'Sucessfully retrieved movies data',
        };
        if (SDKResponse.data.movie) {
            console.log('LotrSdk: Sucessfully retrieved movie data');
            return SDKResponse;
        }
        console.log('LotrSdk: Not able to find movie');
        return {
            success: false,
            message: 'Not able to find movie',
        };
    }
});
exports.getMovieById = getMovieById;
//# sourceMappingURL=lotrApi.js.map