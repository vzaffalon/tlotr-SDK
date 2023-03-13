import { APIResponse } from "../types/ApiResponse";
import { Movie } from "../types/Movie";


export const mapMovieApiResponse = (responseData: APIResponse): Movie => {
  const data = responseData.docs
  const movie = data?.length > 0 ? data[0] : null
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
}
