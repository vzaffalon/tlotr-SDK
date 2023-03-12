import { APIResponse } from "../types/ApiResponse"
import { mapMovieApiResponse } from "./MovieMapper"

describe('example test', () => {
  // Test case 1
  test('should return null if no data in response', () => {
    const responseData = { docs: [] }
    const result = mapMovieApiResponse(responseData as APIResponse)
    expect(result).toBeNull()
  })

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
    }

    const expectedMovie = {
      id: '123',
      name: 'The Lord of the Rings: The Fellowship of the Ring',
      runtimeInMinutes: 178,
      budgetInMillions: 93,
      boxOfficeRevenueInMillions: 871.5,
      academyAwardNominations: 13,
      academyAwardWins: 4,
      rottenTomatoesScore: 91,
    }

    const result = mapMovieApiResponse(responseData as APIResponse)

    expect(result).toEqual(expectedMovie)
  })
})
