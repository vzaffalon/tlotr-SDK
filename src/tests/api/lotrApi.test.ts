import { fetchWithRetry } from '../../utils/fetchWithRetry'
import { SDK_ERRORS } from '../../types/SdkErrors'
import { getMovieByName, getMovies } from '../../api/lotrApi'
jest.mock('../utils/fetchWithRetry')
describe('lotrApi', () => {
    describe('fetchWithRetry', () => {
        const url = 'https://example.com/api'
        const sdkKey = 'test_sdk_key'
        const responseMock = {
          ok: true,
          status: 200,
          data: 'any-data',
        }
      
        beforeEach(() => {
          fetchMock.resetMocks()
        })
      
        it('should call fetch with expected headers and options', async () => {
          fetchMock.mockResponseOnce(JSON.stringify(responseMock))
      
          await fetchWithRetry(url, sdkKey)
      
          expect(fetchMock).toHaveBeenCalledTimes(1)
          expect(fetchMock.mock.calls[0][0]).toEqual(url)
          expect(fetchMock.mock.calls[0][1]?.headers).toEqual({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sdkKey}`,
          })
        })
      
        it('should return a response when fetch succeeds', async () => {
          fetchMock.mockResponseOnce(JSON.stringify(responseMock))
      
          const response = await fetchWithRetry(url, sdkKey)
      
          expect(response.status).toEqual(responseMock.status)
          expect(await response.json()).toEqual(responseMock.data)
        })
      
        it('should throw an error when fetch fails even after retries', async () => {
          fetchMock.mockReject(new Error())
      
          await expect(fetchWithRetry(url, sdkKey, 2, 100)).rejects.toThrowError(
            SDK_ERRORS.API_REQUEST_FAILED_AFTER_RETRIES
          )
      
          expect(fetchMock).toHaveBeenCalledTimes(3)
        })
      
        it('should retry fetch and resolve with response when fetch fails and retries are set', async () => {
          // Fail twice, then succeed on the third attempt
          fetchMock.mockRejectOnce(new Error())
          fetchMock.mockRejectOnce(new Error())
          fetchMock.mockResponseOnce(JSON.stringify(responseMock))
      
          const response = await fetchWithRetry(url, sdkKey, 3, 100)
      
          expect(response.status).toEqual(responseMock.status)
          expect(await response.json()).toEqual(responseMock.data)
          expect(fetchMock).toHaveBeenCalledTimes(3)
        })
      
        it('should retry fetch after a delay when fetch fails and retries are set', async () => {
          // Always fail
          fetchMock.mockReject(new Error())
      
          const start = Date.now()
          await expect(fetchWithRetry(url, sdkKey, 2, 100)).rejects.toThrowError(
            SDK_ERRORS.API_REQUEST_FAILED_AFTER_RETRIES
          )
          const end = Date.now()
      
          expect(fetchMock).toHaveBeenCalledTimes(3)
          expect(end - start).toBeGreaterThanOrEqual(300)
        })
      })
      
      describe('getMovieByName', () => {
        const apiUrl = 'https://the-one-api.dev/v2/'
        const sdkKey = 'test_sdk_key'
        const retries = 3
        const retryDelay = 500
      
        afterEach(() => {
          jest.clearAllMocks()
        })
      
        it('should successfully retrieve movie data', async () => {
          const responseData = {
            ok: true,
            json: async () => ({
              docs: [
                {
                  _id: 'movie_id',
                  name: 'movie_name',
                  runtimeInMinutes: 180,
                  budgetInMillions: 200,
                  boxOfficeRevenueInMillions: 350,
                  academyAwardNominations: 10,
                  academyAwardWins: 5,
                  rottenTomatesScore: 90,
                  awards: ['Best Picture'],
                },
              ],
            }),
          }
          const expectedResponse = {
            success: true,
            data: {
              movie: {
                id: 'movie_id',
                name: 'movie_name',
                runtime: 180,
                budget: 200,
                boxOfficeRevenue: 350,
                academyAwardNominations: 10,
                academyAwardWins: 5,
                rottenTomatoesScore: 90,
                awards: ['Best Picture'],
              },
            },
            message: 'Sucessfully retrieved movies data',
          }
      
          ;(
            fetchWithRetry as jest.MockedFunction<typeof fetchWithRetry>
          ).mockResolvedValueOnce(responseData as any)
      
          const response = await getMovieByName(
            'movie_name',
            apiUrl,
            sdkKey,
            retries,
            retryDelay
          )
      
          expect(fetchWithRetry).toHaveBeenCalledTimes(1)
          expect(response).toEqual(expectedResponse)
        })
      
        it('should not find the movie', async () => {
          const responseData = {
            ok: true,
            json: async () => ({
              docs: [],
            }),
          }
          const expectedResponse = {
            success: false,
            message: 'Not able to find movie',
          }
      
          ;(
            fetchWithRetry as jest.MockedFunction<typeof fetchWithRetry>
          ).mockResolvedValueOnce(responseData as any)
      
          const response = await getMovieByName(
            'unknown_movie_name',
            apiUrl,
            sdkKey,
            retries,
            retryDelay
          )
      
          expect(fetchWithRetry).toHaveBeenCalledTimes(1)
          expect(response).toEqual(expectedResponse)
        })
      
        it('should throw an exception on API error', async () => {
          ;(
            fetchWithRetry as jest.MockedFunction<typeof fetchWithRetry>
          ).mockRejectedValueOnce(new Error())
      
          await expect(
            getMovieByName('movie_name', apiUrl, sdkKey, retries, retryDelay)
          ).rejects.toThrow(SDK_ERRORS.API_REQUEST_FAILED)
          expect(fetchWithRetry).toHaveBeenCalledTimes(3) // expect three retries, specified by default 'retries' parameter
        })
      })
      
      describe('getMovies', () => {
        const apiUrl = 'https://the-one-api.dev/v2/'
        const sdkKey = 'test_sdk_key'
        const moviesApiResponse = {
          docs: [
            {
              _id: 'movie-id-1',
              name: 'The Lord of the Rings: The Fellowship of the Ring',
              runtimeInMinutes: '208',
              budgetInMillions: '93',
              boxOfficeRevenueInMillions: '871.5',
              academyAwardNominations: 13,
              academyAwardWins: 4,
              rottenTomatesScore: 91,
            },
            {
              _id: 'movie-id-2',
              name: 'The Lord of the Rings: The Two Towers',
              runtimeInMinutes: '223',
              budgetInMillions: '94',
              boxOfficeRevenueInMillions: '926',
              academyAwardNominations: 6,
              academyAwardWins: 2,
              rottenTomatesScore: 95,
            },
          ],
        }
      
        it('should call fetchWithRetry with expected url and headers', async () => {
          mockedFetchWithRetry.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(moviesApiResponse),
          } as Response)
      
          await getMovies(apiUrl, sdkKey)
      
          expect(mockedFetchWithRetry).toHaveBeenCalledTimes(1)
          expect(mockedFetchWithRetry).toHaveBeenCalledWith(
            `${apiUrl}movie`,
            sdkKey,
            undefined,
            undefined
          )
        })
      
        it('should return expected SDK response when fetch is successful', async () => {
          mockedFetchWithRetry.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(moviesApiResponse),
          } as Response)
      
          const result = await getMovies(apiUrl, sdkKey)
      
          expect(result).toEqual({
            success: true,
            data: {
              movies: [
                {
                  id: 'movie-id-1',
                  title: 'The Lord of the Rings: The Fellowship of the Ring',
                  runtimeInMinutes: 208,
                  budgetInMillions: 93,
                  boxOfficeRevenueInMillions: 871.5,
                  academyAwardNominations: 13,
                  academyAwardWins: 4,
                  rottenTomatoesScore: 91,
                },
                {
                  id: 'movie-id-2',
                  title: 'The Lord of the Rings: The Two Towers',
                  runtimeInMinutes: 223,
                  budgetInMillions: 94,
                  boxOfficeRevenueInMillions: 926,
                  academyAwardNominations: 6,
                  academyAwardWins: 2,
                  rottenTomatoesScore: 95,
                },
              ],
            },
            message: 'Sucessfully retrieved movies data',
          })
        })
      
        it('should throw an error when fetch fails even after retries', async () => {
          mockedFetchWithRetry.mockRejectedValueOnce(new Error())
      
          await expect(getMovies(apiUrl, sdkKey)).rejects.toThrowError()
      
          expect(mockedFetchWithRetry).toHaveBeenCalledTimes(3)
        })
      
        it('should retry fetch when it fails and retries option is set', async () => {
          // 2 retries, so we should have a total of 3 fetch calls
          mockedFetchWithRetry
            .mockRejectedValueOnce(new Error())
            .mockRejectedValueOnce(new Error())
            .mockResolvedValueOnce({
              ok: true,
              json: () => Promise.resolve(moviesApiResponse),
            } as Response)
      
          const result = await getMovies(apiUrl, sdkKey, 2, 100)
      
          expect(result).toEqual({
            success: true,
            data: {
              movies: [
                {
                  id: 'movie-id-1',
                  title: 'The Lord of the Rings: The Fellowship of the Ring',
                  runtimeInMinutes: 208,
                  budgetInMillions: 93,
                  boxOfficeRevenueInMillions: 871.5,
                  academyAwardNominations: 13,
                  academyAwardWins: 4,
                  rottenTomatoesScore: 91,
                },
                {
                  id: 'movie-id-2',
                  title: 'The Lord of the Rings: The Two Towers',
                  runtimeInMinutes: 223,
                  budgetInMillions: 94,
                  boxOfficeRevenueInMillions: 926,
                  academyAwardNominations: 6,
                  academyAwardWins: 2,
                  rottenTomatoesScore: 95,
                },
              ],
            },
            message: 'Sucessfully retrieved movies data',
          })
        })
      })   
});