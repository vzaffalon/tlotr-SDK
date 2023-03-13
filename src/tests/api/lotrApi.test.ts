import nock from 'nock'
import {
  getMovieQuotes,
  getMovieQuotesByName,
  getMovieByName,
} from '../../api/lotrApi'

const API_URL = 'https://example.com/api/'
const SDK_KEY = 'secret'

describe('getMovieQuotes', () => {
  it('should fetch movie quotes successfully', async () => {
    const movieId = '123'
    const quotesApiResponse = {
      ok: true,
      status: 200,
      docs: [{ dialog: 'Quote 1' }, { dialog: 'Quote 2' }],
    }
    nock(API_URL).get(`/movie/${movieId}/quote`).reply(200, quotesApiResponse)

    const result = await getMovieQuotes(movieId, API_URL, SDK_KEY)
    expect(result).toEqual({
      success: true,
      data: {
        quotes: quotesApiResponse.docs.map((doc) => doc.dialog),
      },
      message: 'Sucessfully retrieved quote data',
    })
  })

  it('should throw an error if API request fails', async () => {
    const movieId = '123'
    nock(API_URL).get(`/movie/${movieId}/quote`).reply(500)

    await expect(
      getMovieQuotes(movieId, API_URL, SDK_KEY)
    ).rejects.toThrowError('API_REQUEST_FAILED')
  })
})

describe('getMovieQuotesByName', () => {
  it('should fetch movie quotes by name successfully', async () => {
    const movieName = 'The Lord of the Rings'
    const movieId = '123'
    const moviesApiResponse = {
      ok: true,
      status: 200,
      movies: [{ id: movieId }],
    }
    const quotesApiResponse = {
      ok: true,
      status: 200,
      docs: [{ dialog: 'Quote 1' }, { dialog: 'Quote 2' }],
    }
    nock(API_URL).get(`/movie?name=${movieName}`).reply(200, moviesApiResponse)
    nock(API_URL).get(`/movie/${movieId}/quote`).reply(200, quotesApiResponse)

    const result = await getMovieQuotesByName(movieName, API_URL, SDK_KEY)
  })

  it('should throw an error if movie not found', async () => {
    const movieName = 'Non-existent Movie'
    const moviesApiResponse = { movies: [] }
    nock(API_URL).get(`/movie?name=${movieName}`).reply(200, moviesApiResponse)

    await expect(
      getMovieQuotesByName(movieName, API_URL, SDK_KEY)
    ).resolves.toBe(undefined)
  })

  it('should throw an error if API request fails', async () => {
    const movieName = 'The Lord of the Rings'
    const movieId = '123'
    const moviesApiResponse = { movies: [{ id: movieId }] }
    nock(API_URL).get(`/movie?name=${movieName}`).reply(200, moviesApiResponse)
    nock(API_URL).get(`/movie/${movieId}/quote`).reply(500)

    await expect(
      getMovieQuotesByName(movieName, API_URL, SDK_KEY)
    ).resolves.toBe(undefined)
  })
})

describe('getMovieByName', () => {
  it('should return failure if movie not found', async () => {
    const movieName = 'Non-existent Movie'
    nock(API_URL).get(`/movie?name=${movieName}`).reply(200, { movies: [] })

    const result = await getMovieByName(movieName, API_URL, SDK_KEY)
    expect(result).toEqual({
      success: false,
      message: 'Not able to find movie',
    })
  })

  describe('getMovieQuotes', () => {
    const apiUrl = 'https://lotr-api.com/'
    const sdkKey = 'test-sdk-key'
    const movieId = '1234'

    afterEach(() => {
      nock.cleanAll()
    })

    it('returns success with valid data', async () => {
      const quotesApiResponse = {
        ok: true,
        status: 200,
        docs: [{ dialog: 'Quote 1' }, { dialog: 'Quote 2' }],
      }
      nock(apiUrl).get(`/movie/${movieId}/quote`).reply(200, quotesApiResponse)

      const result = await getMovieQuotes(movieId, apiUrl, sdkKey)

      expect(result.success).toBeTruthy()
      expect(result.data?.quotes).toEqual(
        quotesApiResponse.docs.map((doc) => doc.dialog)
      )
      expect(result.message).toEqual('Sucessfully retrieved quote data')
    })

    it('throws error with invalid API request', async () => {
      nock(apiUrl).get(`/movie/${movieId}/quote`).replyWithError('API is down')

      await expect(async () => {
        await getMovieQuotes(movieId, apiUrl, sdkKey)
      }).rejects.toThrow('API_REQUEST_FAILED')
    })
  })
})
