import { MovieApiResponse } from "../types/ApiResponse"
import { APIResponse } from "../types/ApiResponse"
import { Movie } from "../types/Movie"

export const mapMoviesApiResponse = (responseData: APIResponse): Movie[] => {
  return responseData.docs.map((movie: MovieApiResponse) => ({
    id: movie._id,
    name: movie.name,
    runtimeInMinutes: movie.runtimeInMinutes,
    budgetInMillions: movie.budgetInMillions,
    boxOfficeRevenueInMillions: movie.boxOfficeRevenueInMillions,
    academyAwardNominations: movie.academyAwardNominations,
    academyAwardWins: movie.academyAwardWins,
    rottenTomatoesScore: movie.rottenTomatoesScore,
  }))
}
