import { LotrSdk } from "../../sdk/LotrSdk";
import * as API_CALLS from '../../api/lotrApi';
import { MovieSDKResponsePayload, MoviesSdkResponsePayload, QuotesSdkResponsePayload } from '../../types/SdkResponse';

jest.mock('../../api/lotrApi');

// sample API key for testing purposes
const apiKey = 'sampleapikey';

describe('LotrSDK', () => {
  describe('getMovieQuotes', () => {
    beforeEach(() => {
      (API_CALLS.getMovieQuotes as jest.MockedFunction<typeof API_CALLS.getMovieQuotes>).mockReset();
    });

    it('should return quotes for a given movie ID', async () => {
      const sdk = new LotrSdk(apiKey);
      const response = Promise.resolve({
        ok: true,
        sucess: true,
        data: {quotes: ["quote1"]},
      });
      (API_CALLS.getMovieQuotes as jest.MockedFunction<typeof API_CALLS.getMovieQuotes>)
        .mockImplementationOnce(async (movieId, apiUrl, sdkKey, retries, retryDelay) => response as any);

      const result = await sdk.getMovieQuotes('movieId');
  
      expect(result).toBeDefined();
      expect(result.data?.quotes[0]).toEqual('quote1');
    });
  });

  describe('getMovieByName', () => {
    beforeEach(() => {
      (API_CALLS.getMovieByName as jest.MockedFunction<typeof API_CALLS.getMovieByName>).mockReset();
    });

    it('should return details for a given movie name', async () => {
      const sdk = new LotrSdk(apiKey);
      const fakeMovie = {
        "name": "The Fellowship of the Ring"
      };
      const response = Promise.resolve({
        ok: true,
        success: true,
        data: {movie: fakeMovie},
      });
      (API_CALLS.getMovieByName as jest.MockedFunction<typeof API_CALLS.getMovieByName>)
        .mockImplementationOnce(async (movieName, apiUrl, sdkKey, retries, retryDelay) => response as any);

      const result = await sdk.getMovieByName('The Fellowship of the Ring');
  
      expect(result).toBeDefined();
      expect(result.data?.movie.name).toEqual('The Fellowship of the Ring');
    });
  });

  describe('getMovies', () => {
    beforeEach(() => {
      (API_CALLS.getMovies as jest.MockedFunction<typeof API_CALLS.getMovies>).mockReset();
    });

    it('should return a list of movies from the API', async () => {
      const sdk = new LotrSdk(apiKey);
      const fakeMovieArray = [
        {"id":"movie1"}
      ];
      const response = Promise.resolve({
        ok: true,
        success: true,
        data: { movies: fakeMovieArray},
      });
      (API_CALLS.getMovies as jest.MockedFunction<typeof API_CALLS.getMovies>)
        .mockImplementationOnce(async (apiUrl, sdkKey, retries, retryDelay) => response as any);

      const result = await sdk.getMovies();
  
      expect(result).toBeDefined();
      expect(result.data?.movies[0].id).toEqual('movie1');
    });
  });
});