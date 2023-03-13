# Introduction
This is a software development kit (SDK) for interacting with an API that provides movie data. The SDK offers the following functionalities:

getMovieById: retrieves a specific movie based on movieId.
getMovieByName: retrieves a specific movie based on movieName.
getMovies: retrieves all movies available.
getMovieQuotes: retrieves quotes for a specific movie based on movieId.
getMovieQuotesByName: retrieves quotes for a specific movie based on movieName.

# Installation
To install this SDK in your project, run the following command:
npm install tlotr-sdk

To test the usage of the sdk a script was created, you can run it with:
npm start -> in case of error make sure you installed the lotr-sdk before

Running test:
npm test

# Usage
Importing:
import {
  getMovieById,
  getMovieByName,
  getMovies,
  getMovieQuotes,
  getMovieQuotesByName
} from 'lotr-sdk';

getMovieById(movieId: string, apiUrl: string, sdkKey: string, retries?: number, retryDelay?: number): Promise<MovieSDKResponsePayload>

Retrieves a specific movie based on movieId. The function returns a Promise which resolves to an object that has the following properties:

success: boolean indicating whether the request was successful or not.
data: an object with the retrieved movie data.
message: a message describing the outcome of the request.

getMovieByName(movieName: string, apiUrl: string, sdkKey: string, retries?: number, retryDelay?: number): Promise<MovieSDKResponsePayload>
Retrieves a specific movie based on movieName. The function returns a Promise which resolves to an object that has the following properties:

success: boolean indicating whether the request was successful or not.
data: an object with the retrieved movie data.
message: a message describing the outcome of the request.
getMovies(apiUrl: string, sdkKey: string, retries?: number, retryDelay?: number): Promise<MoviesSdkResponsePayload>
Retrieves all movies available. The function returns a Promise which resolves to an object that has the following properties:

success: boolean indicating whether the request was successful or not.
data: an object with the retrieved movies data.
message: a message describing the outcome of the request.

getMovieQuotes(movieId: string, apiUrl: string, sdkKey: string, retries?: number, retryDelay?: number): Promise<QuotesSdkResponsePayload>
Retrieves quotes for a specific movie based on movieId. The function returns a Promise which resolves to an object that has the following properties:

success: boolean indicating whether the request was successful or not.
data: an object with the retrieved quote data.
message: a message describing the outcome of the request.

getMovieQuotesByName(movieName: string, apiUrl: string, sdkKey: string, retries?: number, retryDelay?: number): Promise<QuotesSdkResponsePayload>
Retrieves quotes for a specific movie based on movieName. The function returns a Promise which resolves to an object that has the following properties:

success: boolean indicating whether the request was successful or not.
data: an object with the retrieved quote data.
message: a message describing the outcome of the request.
Types
This SDK includes the following types:

# Types
ApiResponse: describes the shape of the response from the server.
SDK_ERRORS: enum containing the possible errors returned by the SDK.
MovieSDKResponsePayload: describes the response payload format for methods that retrieve a single movie.
MoviesSdkResponsePayload: describes the response payload format for the getMovies method.
QuotesSdkResponsePayload: describes the response payload format for methods that retrieve quotes for a movie.
# Utils
This SDK includes a utility module named fetchWithRetry.

# Dependencies
This SDK depends on the following external libraries and modules:

node-fetch: for making HTTP requests.

# ENV variables
The env variable for the sdk was commited just to facilitate testing. Do not do this in production.

# TODO
- Add e2e tests
- Map possible errors to correct status code
- Make tests to check API returning correct status code
- Create variables to store messages
- Add a better log library
- Add a monitoring tool
- Add CI/CD
- Store sdk key more securely with secrets manager
- Correctly threat possible API errors responses