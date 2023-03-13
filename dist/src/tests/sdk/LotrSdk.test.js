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
const LotrSdk_1 = require("../../sdk/LotrSdk");
// sample API key for testing purposes
const apiKey = 'sampleapikey';
describe('LotrSDK', () => {
    // test getMovieQuotes() function
    test('getMovieQuotes returns quotes for a given movie ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const sdk = new LotrSdk_1.LotrSdk(apiKey);
        const response = yield sdk.getMovieQuotes('movieId');
        expect(response).toBeDefined();
        expect(response.data.quotes.length).toBeGreaterThan(0);
        expect(response.data.quotes[0]).toHaveProperty('dialog');
    }));
    // test getMovieByName() function
    test('getMovieByName returns details for a given movie name', () => __awaiter(void 0, void 0, void 0, function* () {
        const sdk = new LotrSdk_1.LotrSdk(apiKey);
        const response = yield sdk.getMovieByName('The Fellowship of the Ring');
        expect(response).toBeDefined();
        expect(response.data.movie).toHaveProperty('name');
        expect(response.data.movie.name).toEqual('The Fellowship of the Ring');
    }));
    // test getMovies() function
    test('getMovies returns a list of movies from the API', () => __awaiter(void 0, void 0, void 0, function* () {
        const sdk = new LotrSdk_1.LotrSdk(apiKey);
        const response = yield sdk.getMovies();
        expect(response).toBeDefined();
        expect(response.data.movies.length).toBeGreaterThan(0);
        expect(response.data.movies[0]).toHaveProperty('_id');
    }));
});
//# sourceMappingURL=LotrSdk.test.js.map