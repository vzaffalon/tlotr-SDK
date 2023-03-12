import {
  MovieSDKResponsePayload,
  MoviesSdkResponsePayload,
  QuotesSdkResponsePayload,
} from '../types/SdkResponse'
import * as API_CALLS from '../api/lotrApi'

export class LotrSdk {
  private sdkKey: string
  private readonly apiUrl: string = 'https://the-one-api.dev/v2/'
  private readonly retries: number = 3
  private readonly retryDelay: number = 500

  constructor(
    sdkKey: string,
    apiUrl?: string,
    retries?: number,
    retryDelay?: number
  ) {
    this.sdkKey = sdkKey
    if (apiUrl) {
      this.apiUrl = apiUrl
    }
    if (retries) {
      this.retries = retries
    }
    if (retryDelay) {
      this.retryDelay = retryDelay
    }
  }

  async getMovieQuotes(movieId: string): Promise<QuotesSdkResponsePayload> {
    return API_CALLS.getMovieQuotes(
      movieId,
      this.apiUrl,
      this.sdkKey,
      this.retries,
      this.retryDelay
    )
  }

  async getMovieQuotesByName(
    movieName: string
  ): Promise<QuotesSdkResponsePayload> {
    return API_CALLS.getMovieQuotesByName(
      movieName,
      this.apiUrl,
      this.sdkKey,
      this.retries,
      this.retryDelay
    )
  }

  async getMovieByName(movieName: string): Promise<MovieSDKResponsePayload> {
    return API_CALLS.getMovieByName(
      movieName,
      this.apiUrl,
      this.sdkKey,
      this.retries,
      this.retryDelay
    )
  }

  async getMovies(): Promise<MoviesSdkResponsePayload> {
    return API_CALLS.getMovies(
      this.apiUrl,
      this.sdkKey,
      this.retries,
      this.retryDelay
    )
  }

  async getMovieById(movieId: string): Promise<MovieSDKResponsePayload> {
    return API_CALLS.getMovieById(
      movieId,
      this.apiUrl,
      this.sdkKey,
      this.retries,
      this.retryDelay
    )
  }
}
