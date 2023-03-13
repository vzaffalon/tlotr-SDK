"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MovieMapper_1 = require("../../mappers/MovieMapper");
describe('example test', () => {
    // Test case 1
    test('should return null if no data in response', () => {
        const responseData = { docs: [] };
        const result = (0, MovieMapper_1.mapMovieApiResponse)(responseData);
        expect(result).toBeNull();
    });
    // Test case 2
    test('should return a mapped movie object with correct properties', () => {
        const responseData = {
            docs: [
                {
                    _id: '123',
                    name: 'The Lord of the Rings: The Fellowship of the Ring',
                    runtimeInMinutes: 178,
                    budgetInMillions: 93,
                    boxOfficeRevenueInMillions: 871.5,
                    academyAwardNominations: 13,
                    academyAwardWins: 4,
                    rottenTomatoesScore: 91,
                },
            ],
        };
        const expectedMovie = {
            id: '123',
            name: 'The Lord of the Rings: The Fellowship of the Ring',
            runtimeInMinutes: 178,
            budgetInMillions: 93,
            boxOfficeRevenueInMillions: 871.5,
            academyAwardNominations: 13,
            academyAwardWins: 4,
            rottenTomatoesScore: 91,
        };
        const result = (0, MovieMapper_1.mapMovieApiResponse)(responseData);
        expect(result).toEqual(expectedMovie);
    });
});
//# sourceMappingURL=MovieMapper.test.js.map