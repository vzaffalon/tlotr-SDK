import { mapMovieApiResponse } from '../mappers/MovieMapper'
import { mapMoviesApiResponse } from '../mappers/MoviesMapper'
import { mapMovieQuotesApiResponse } from '../mappers/QuotesMapper'
import { APIResponse } from '../types/ApiResponse'
import { SDK_ERRORS } from '../types/SdkErrors'
import {
  MovieSDKResponsePayload,
  MoviesSdkResponsePayload,
  QuotesSdkResponsePayload,
} from '../types/SdkResponse'
import { fetchWithRetry } from '../utils/fetchWithRetry'

export const getMovieQuotes = async (
  movieId: string,
  apiUrl: string,
  sdkKey: string,
  retries?: number,
  retryDelay?: number
): Promise<QuotesSdkResponsePayload> => {
  const url = `${apiUrl}movie/${movieId}/quote`
  const responseData = await fetchWithRetry(url, sdkKey, retries, retryDelay)

  if (responseData.ok) {
    const responseJson: APIResponse = await responseData.json()

    console.log('LotrSdk: Sucessfully retrieved movie quotes')

    return {
      success: true,
      data: {
        quotes: mapMovieQuotesApiResponse(responseJson),
      },
      message: 'Sucessfully retrieved quote data',
    }
  } else {
    console.error(`LotrSdk: API request failed`)

    throw new Error(SDK_ERRORS.API_REQUEST_FAILED)
  }
}

export const getMovieQuotesByName = async (
  movieName: string,
  apiUrl: string,
  sdkKey: string,
  retries?: number,
  retryDelay?: number
): Promise<QuotesSdkResponsePayload> => {
  const getMovieByNameResponse = await getMovieByName(
    movieName,
    apiUrl,
    sdkKey,
    retries,
    retryDelay
  )
  const url = `${apiUrl}movie/${getMovieByNameResponse.data.movie.id}/quote`
  const responseData = await fetchWithRetry(url, sdkKey, retries, retryDelay)

  if (responseData.ok) {
    const responseJson: APIResponse = await responseData.json()

    console.log('LotrSdk: Sucessfully retrieved movie quotes')

    return {
      success: true,
      data: {
        quotes: mapMovieQuotesApiResponse(responseJson),
      },
      message: 'Sucessfully retrieved quote data',
    }
  } else {
    console.error(`LotrSdk: API request failed`)

    throw new Error(SDK_ERRORS.API_REQUEST_FAILED)
  }
}

export const getMovieByName = async (
  movieName: string,
  apiUrl: string,
  sdkKey: string,
  retries?: number,
  retryDelay?: number
): Promise<MovieSDKResponsePayload> => {
  const url = `${apiUrl}movie?name=${movieName}`
  const responseData = await fetchWithRetry(url, sdkKey, retries, retryDelay)

  if (responseData.ok) {
    const responseJson: APIResponse = await responseData.json()
    const SDKResponse = {
      success: true,
      data: {
        movie: mapMovieApiResponse(responseJson),
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

    throw new Error(SDK_ERRORS.API_REQUEST_FAILED)
  }
}

export const getMovies = async (
  apiUrl: string,
  sdkKey: string,
  retries?: number,
  retryDelay?: number
): Promise<MoviesSdkResponsePayload> => {
  const url = `${apiUrl}movie`
  const responseData = await fetchWithRetry(url, sdkKey, retries, retryDelay)
  const responseDataJson: APIResponse = await responseData.json()

  return {
    success: true,
    data: {
      movies: mapMoviesApiResponse(responseDataJson),
    },
    message: 'Sucessfully retrieved movies data',
  }
}

export const getMovieById = async (
  movieId: string,
  apiUrl: string,
  sdkKey: string,
  retries?: number,
  retryDelay?: number
): Promise<MovieSDKResponsePayload> => {
  const url = `${apiUrl}movie/${movieId}`
  const responseData = await fetchWithRetry(url, sdkKey, retries, retryDelay)

  if (responseData.ok) {
    const responseDataJson: APIResponse = await responseData.json()

    const SDKResponse = {
      success: true,
      data: {
        movie: mapMovieApiResponse(responseDataJson),
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
