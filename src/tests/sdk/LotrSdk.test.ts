import { LotrSdk } from "../../sdk/LotrSdk";


// sample API key for testing purposes
const apiKey = 'sampleapikey';

describe('LotrSDK', () => {
  
  // test getMovieQuotes() function
  test('getMovieQuotes returns quotes for a given movie ID', async () => {
    const sdk = new LotrSdk(apiKey);
    const response = await sdk.getMovieQuotes('movieId');
    
    expect(response).toBeDefined();
    expect(response.data.quotes.length).toBeGreaterThan(0);
    expect(response.data.quotes[0]).toHaveProperty('dialog');
  });

  // test getMovieByName() function
  test('getMovieByName returns details for a given movie name', async () => {
    const sdk = new LotrSdk(apiKey);
    const response = await sdk.getMovieByName('The Fellowship of the Ring');

    expect(response).toBeDefined();
    expect(response.data.movie).toHaveProperty('name');
    expect(response.data.movie.name).toEqual('The Fellowship of the Ring');
  });

  // test getMovies() function
  test('getMovies returns a list of movies from the API', async () => {
    const sdk = new LotrSdk(apiKey);
    const response = await sdk.getMovies();

    expect(response).toBeDefined();
    expect(response.data.movies.length).toBeGreaterThan(0);
    expect(response.data.movies[0]).toHaveProperty('_id');
  });
});