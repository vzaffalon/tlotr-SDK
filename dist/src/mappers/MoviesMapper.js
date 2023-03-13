"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapMoviesApiResponse = void 0;
const mapMoviesApiResponse = (responseData) => {
    return responseData.docs.map((movie) => ({
        id: movie._id,
        name: movie.name,
        runtimeInMinutes: movie.runtimeInMinutes,
        budgetInMillions: movie.budgetInMillions,
        boxOfficeRevenueInMillions: movie.boxOfficeRevenueInMillions,
        academyAwardNominations: movie.academyAwardNominations,
        academyAwardWins: movie.academyAwardWins,
        rottenTomatoesScore: movie.rottenTomatoesScore,
    }));
};
exports.mapMoviesApiResponse = mapMoviesApiResponse;
//# sourceMappingURL=MoviesMapper.js.map