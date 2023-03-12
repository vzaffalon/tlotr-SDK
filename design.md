# Design
The SDK has 5 functions that utilize the fetchWithRetry function provided in the utils folder to make API requests to the backend. The SDK takes in API url, SDK Key, and optional arguments for retries and retryDelay.

getMovieById
This function retrieves Lord of the Rings movie data by ID. The function uses fetchWithRetry function to make a request to the backend API endpoint for a specific movie by its ID. It returns the movie's data as defined in MovieSDKResponsePayload object if it exists, otherwise an object with a message indicating not able to find movie.

getMovies
This function retrieves all Lord of the Rings movies by using fetchWithRetry function to make an API request to the backend API endpoint. It returns an array of movie objects represented by MoviesSdkResponsePayload object.

getMovieByName
This function retrieves Lord of the Rings movie data by Name argument. The function uses fetchWithRetry function to make a request to the backend API endpoint by appending the movie name to the url. It returns the movie data represented by MovieSDKResponsePayload object if it exists, otherwise an object with a message indicating not able to find movie.

getMovieQuotes
This function retrieves quotes belonging to a Lord of the Rings movie by movieId argument. The function uses fetchWithRetry function to make a request to the backend API endpoint for movie quotes by id. It returns an object containing the movie's quotes as per QuotesSdkResponsePayload object if successful, otherwise throws an error with the SDK_ERRORS.API_REQUEST_FAILED message.

getMovieQuotesByName
This function completes two tasks. Firstly, it retrieves specific movie using getMovieByName method call. Then it uses movie ID received from getMovieByName response to retrieve the quotes belonging to that movie. The function uses the fetchWithRetry function to make a request to the backend API endpoint for movie quotes by ID. It returns an object containing the movie's quotes as per QuotesSdkResponsePayload object if successful, otherwise throws an error with the SDK_ERRORS.API_REQUEST_FAILED message.

In addition to this, the SDK uses mappers in the mappers folder for mapping different responses from API endpoints returned format.