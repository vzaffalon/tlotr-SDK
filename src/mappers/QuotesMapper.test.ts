import { mapMovieQuotesApiResponse } from '../mappers/QuotesMapper'
import { APIResponse } from '../types/ApiResponse'

describe('mapMovieQuotesApiResponse', () => {
  test('returns an array of strings with movie quotes', () => {
    const responseData: APIResponse = {
      total: 1,
      limit: 10,
      offset: 0,
      page: 1,
      pages: 2,
      docs: [
        { dialog: 'You shall not pass!' },
        { dialog: 'One does not simply walk into Mordor' },
        { dialog: 'My precious...' },
      ],
    }

    const mappedQuotes = mapMovieQuotesApiResponse(responseData)

    expect(mappedQuotes).toEqual([
      'You shall not pass!',
      'One does not simply walk into Mordor',
      'My precious...',
    ])
  })

  test('returns an empty array when passed an empty API response', () => {
    const responseData: APIResponse = {
      total: 1,
      limit: 10,
      offset: 0,
      page: 1,
      pages: 2,
      docs: [],
    }

    const mappedQuotes = mapMovieQuotesApiResponse(responseData)

    expect(mappedQuotes).toEqual([])
  })
})
