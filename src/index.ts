import * as dotenv from 'dotenv'
import { LotrSdk } from 'tlotr-sdk';

//receive env variables
dotenv.config()

const sdkKey = process.env.SDK_KEY
const movieWithQuotesId = '5cd95395de30eff6ebccde5b'
const movieId = '5cd95395de30eff6ebccde56'
const movieName = 'The Two Towers'

async function useSdk() {
  const sdk = new LotrSdk(sdkKey)
  try {
    const response = await sdk.getMovies()
    if (response.success) {
      console.log(`Movie data: ${JSON.stringify(response.data)}`)
    } else {
      console.error(`API error: ${response.message}`)
    }
  } catch (e) {
    console.error(`API request failed: ${e.message}`)
  }

  try {
    const response = await sdk.getMovieById(movieId)
    if (response.success) {
      console.log(`Movie data: ${JSON.stringify(response.data)}`)
    } else {
      console.error(`API error: ${response.message}`)
    }
  } catch (e) {
    console.error(`API request failed: ${e.message}`)
  }

  try {
    const response = await sdk.getMovieByName(movieName)
    if (response.success) {
      console.log(`Movie data: ${JSON.stringify(response.data)}`)
    } else {
      console.error(`API error: ${response.message}`)
    }
  } catch (e) {
    console.error(`API request failed: ${e.message}`)
  }

  try {
    const response = await sdk.getMovieQuotes(movieWithQuotesId)
    if (response.success) {
      console.log(`Quote data: ${JSON.stringify(response.data)}`)
    } else {
      console.error(`API error: ${response.message}`)
    }
  } catch (e) {
    console.error(`API request failed: ${e.message}`)
  }


  try {
    const response = await sdk.getMovieQuotesByName(movieName)
    if (response.success) {
      console.log(`Quote data: ${JSON.stringify(response.data)}`)
    } else {
      console.error(`API error: ${response.message}`)
    }
  } catch (e) {
    console.error(`API request failed: ${e.message}`)
  }
}

useSdk()
