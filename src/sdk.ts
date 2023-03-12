import fetch from 'node-fetch'

interface Movie {
  id: string
  name: string
  runtimeInMinutes: number
  budgetInMillions: number
  boxOfficeRevenueInMillions: number
  academyAwardNominations: number
  academyAwardWins: number
  rottenTomatoesScore: number
}

interface MoviesSdkResponse {
  movies: Movie[]
}

interface MovieSdkResponse {
  movie: Movie
}

interface QuotesSdkResponse {
  quotes: string[]
}

interface APIResponse {
  docs: any[]
  total: number
  limit: number
  offset: number
  page: number
  pages: number
}

interface MovieApiResponse {
  _id: string
  name: string
  runtimeInMinutes: number
  budgetInMillions: number
  boxOfficeRevenueInMillions: number
  academyAwardNominations: number
  academyAwardWins: number
  rottenTomatoesScore: number
}

interface QuoteApiResponse {
  _id: string
  dialog: string
  movie: string
  character: string
}

interface SDKResponse {
  data?: MovieSdkResponse | MoviesSdkResponse | QuotesSdkResponse
  success: boolean
  message?: string
}

const enum MOVIE_ERRORS {
  API_REQUEST_FAILED = 'API_REQUEST_FAILED',
  API_REQUEST_FAILED_AFTER_RETRIES = 'API_REQUEST_FAILED_AFTER_RETRIES',
}

export class LotrSdk {
  private sdkKey: string
  private readonly apiUrl: string = 'https://the-one-api.dev/v2/'
  private readonly retries: number = 3
  private readonly retryDelay: number = 500

  constructor(sdkKey: string) {
    this.sdkKey = sdkKey
  }

  private mapMoviesApiResponse(responseData: APIResponse): Movie[] {
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

  private async makeApiRequest(url: string): Promise<Response> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.sdkKey}`,
    }

    for (let i = 0; i < this.retries; i++) {
      try {
        const response: Response = await fetch(url, { headers })
        if (response.ok) {
          return response
        } else {
          throw new Error(MOVIE_ERRORS.API_REQUEST_FAILED)
        }
      } catch (e) {
        console.error(`LotrSdk: API request failed: ${e.message}`)
        if (i === this.retries - 1) {
          throw new Error(MOVIE_ERRORS.API_REQUEST_FAILED_AFTER_RETRIES)
        } else {
          console.warn(`LotrSdk: Retrying in ${this.retryDelay}ms...`)
          await new Promise((resolve) => setTimeout(resolve, this.retryDelay))
        }
      }
    }
  }

  async getMovies(): Promise<SDKResponse> {
    const url = `${this.apiUrl}movie`
    const responseData = await this.makeApiRequest(url)
    const responseDataJson: APIResponse = await responseData.json()

    return {
      success: true,
      data: {
        movies: this.mapMoviesApiResponse(responseDataJson),
      },
      message: 'Sucessfully retrieved movies data',
    }
  }

  private mapMovieApiResponse(responseData: APIResponse): Movie {
    const data = responseData.docs
    const movie = data.length > 0 ? data[0] : null
    return {
      id: movie._id,
      name: movie.name,
      runtimeInMinutes: movie.runtimeInMinutes,
      budgetInMillions: movie.budgetInMillions,
      boxOfficeRevenueInMillions: movie.boxOfficeRevenueInMillions,
      academyAwardNominations: movie.academyAwardNominations,
      academyAwardWins: movie.academyAwardWins,
      rottenTomatoesScore: movie.rottenTomatoesScore,
    }
  }

  async getMovieById(movieId: string): Promise<SDKResponse> {
    const url = `${this.apiUrl}movie/${movieId}`
    const responseData = await this.makeApiRequest(url)

    if (responseData.ok) {
      const responseDataJson: APIResponse = await responseData.json()

      const SDKResponse = {
        success: true,
        data: {
          movie: this.mapMovieApiResponse(responseDataJson),
        },
        message: 'Sucessfully retrieved movies data',
      }

      if (SDKResponse.data.movie) {
        console.log('LotrSdk: Sucessfully retrieved movie data')
        return SDKResponse
      }

      console.log('LotrSdk: Not able to find movie')

      return {
        success: false,
        message: 'Not able to find movie',
      }
    }
  }

  async getMovieByName(movieName: string): Promise<SDKResponse> {
    const url = `${this.apiUrl}movie?name=${movieName}`
    const responseData = await this.makeApiRequest(url)

    if (responseData.ok) {
      const responseJson: APIResponse = await responseData.json()
      const SDKResponse = {
        success: true,
        data: {
          movie: this.mapMovieApiResponse(responseJson),
        },
        message: 'Sucessfully retrieved movies data',
      }

      if (SDKResponse.data.movie) {
        console.log('LotrSdk: Sucessfully retrieved movie data')
        return SDKResponse
      }

      return {
        success: false,
        message: 'Not able to find movie',
      }
    } else {
      console.error(`LotrSdk: API request failed`)

      throw new Error(MOVIE_ERRORS.API_REQUEST_FAILED)
    }
  }

  private mapMovieQuotesApiResponse(responseData: APIResponse): string[] {
    return responseData.docs.map((quote: QuoteApiResponse): string => {
      return quote.dialog
    })
  }

  async getMovieQuotes(movieId: string): Promise<SDKResponse> {
    const url = `${this.apiUrl}movie/${movieId}/quote`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.sdkKey}`,
    }

    for (let i = 0; i < this.retries; i++) {
      try {
        const response = await fetch(url, { headers })
        if (response.ok) {
          const responseData: APIResponse = await response.json()

          console.log('LotrSdk: Sucessfully retrieved movie quotes')

          return {
            success: true,
            data: {
              quotes: this.mapMovieQuotesApiResponse(responseData),
            },
            message: 'Sucessfully retrieved quote data',
          }
        } else {
          console.error(`LotrSdk: API request failed`)

          throw new Error(MOVIE_ERRORS.API_REQUEST_FAILED)
        }
      } catch (e) {
        console.error(`LotrSdk: API request failed: ${e.message}`)
        if (i === this.retries - 1) {
          console.error(
            `LotrSdk: API request failed after ${this.retries} retries`
          )

          throw new Error(MOVIE_ERRORS.API_REQUEST_FAILED_AFTER_RETRIES)
        } else {
          console.warn(`LotrSdk: Retrying in ${this.retryDelay}ms...`)
          await new Promise((resolve) => setTimeout(resolve, this.retryDelay))
        }
      }
    }
  }
}
