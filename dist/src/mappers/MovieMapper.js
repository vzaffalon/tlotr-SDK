"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapMovieApiResponse = void 0;
const mapMovieApiResponse = (responseData) => {
    const data = responseData.docs;
    const movie = data.length > 0 ? data[0] : null;
    return movie ? {
        id: movie._id,
        name: movie.name,
        runtimeInMinutes: movie.runtimeInMinutes,
        budgetInMillions: movie.budgetInMillions,
        boxOfficeRevenueInMillions: movie.boxOfficeRevenueInMillions,
        academyAwardNominations: movie.academyAwardNominations,
        academyAwardWins: movie.academyAwardWins,
        rottenTomatoesScore: movie.rottenTomatoesScore,
    } : null;
};
exports.mapMovieApiResponse = mapMovieApiResponse;
//# sourceMappingURL=MovieMapper.js.map