"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MoviesMapper_1 = require("../../mappers/MoviesMapper");
describe('mapMoviesApiResponse function', () => {
    it('correctly maps single movie response data to Movie type', () => {
        const responseData = {
            total: 1,
            limit: 10,
            offset: 0,
            page: 1,
            pages: 2,
            docs: [
                {
                    _id: '123',
                    name: 'The Fellowship of the Ring',
                    runtimeInMinutes: 178,
                    budgetInMillions: 93,
                    boxOfficeRevenueInMillions: 877.5,
                    academyAwardNominations: 13,
                    academyAwardWins: 4,
                    rottenTomatoesScore: 91,
                },
            ],
        };
        const expectedMovie = {
            id: '123',
            name: 'The Fellowship of the Ring',
            runtimeInMinutes: 178,
            budgetInMillions: 93,
            boxOfficeRevenueInMillions: 877.5,
            academyAwardNominations: 13,
            academyAwardWins: 4,
            rottenTomatoesScore: 91,
        };
        expect((0, MoviesMapper_1.mapMoviesApiResponse)(responseData)).toEqual([expectedMovie]);
    });
    it('correctly maps multiple movie response data to Movie type', () => {
        const responseData = {
            total: 2,
            limit: 10,
            offset: 0,
            page: 1,
            pages: 2,
            docs: [
                {
                    _id: '123',
                    name: 'The Fellowship of the Ring',
                    runtimeInMinutes: 178,
                    budgetInMillions: 93,
                    boxOfficeRevenueInMillions: 877.5,
                    academyAwardNominations: 13,
                    academyAwardWins: 4,
                    rottenTomatoesScore: 91,
                },
                {
                    _id: '456',
                    name: 'The Two Towers',
                    runtimeInMinutes: 179,
                    budgetInMillions: 94,
                    boxOfficeRevenueInMillions: 943.3,
                    academyAwardNominations: 6,
                    academyAwardWins: 2,
                    rottenTomatoesScore: 95,
                },
            ],
        };
        const expectedMovies = [
            {
                id: '123',
                name: 'The Fellowship of the Ring',
                runtimeInMinutes: 178,
                budgetInMillions: 93,
                boxOfficeRevenueInMillions: 877.5,
                academyAwardNominations: 13,
                academyAwardWins: 4,
                rottenTomatoesScore: 91,
            },
            {
                id: '456',
                name: 'The Two Towers',
                runtimeInMinutes: 179,
                budgetInMillions: 94,
                boxOfficeRevenueInMillions: 943.3,
                academyAwardNominations: 6,
                academyAwardWins: 2,
                rottenTomatoesScore: 95,
            },
        ];
        expect((0, MoviesMapper_1.mapMoviesApiResponse)(responseData)).toEqual(expectedMovies);
    });
    it('returns empty array when response data is empty', () => {
        const responseData = {
            total: 0,
            limit: 10,
            offset: 0,
            page: 1,
            pages: 2,
            docs: [],
        };
        expect((0, MoviesMapper_1.mapMoviesApiResponse)(responseData)).toEqual([]);
    });
});
//# sourceMappingURL=MoviesMapper.test.js.map