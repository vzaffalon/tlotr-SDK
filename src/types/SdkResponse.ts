import { Movie } from './Movie'

interface MoviesSdkResponse {
  movies: Movie[]
}

interface MovieSdkResponse {
  movie: Movie
}

interface QuotesSdkResponse {
  quotes: string[]
}

export interface MovieSDKResponsePayload {
  data?: MovieSdkResponse
  success: boolean
  message?: string
}

export interface MoviesSdkResponsePayload {
  data?: MoviesSdkResponse
  success: boolean
  message?: string
}

export interface QuotesSdkResponsePayload {
  data?: QuotesSdkResponse
  success: boolean
  message?: string
}
