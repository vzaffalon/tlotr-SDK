import { MovieSDKResponsePayload, MoviesSdkResponsePayload, QuotesSdkResponsePayload } from '../types/SdkResponse';
export declare const getMovieQuotes: (movieId: string, apiUrl: string, sdkKey: string, retries?: number, retryDelay?: number) => Promise<QuotesSdkResponsePayload>;
export declare const getMovieQuotesByName: (movieName: string, apiUrl: string, sdkKey: string, retries?: number, retryDelay?: number) => Promise<QuotesSdkResponsePayload>;
export declare const getMovieByName: (movieName: string, apiUrl: string, sdkKey: string, retries?: number, retryDelay?: number) => Promise<MovieSDKResponsePayload>;
export declare const getMovies: (apiUrl: string, sdkKey: string, retries?: number, retryDelay?: number) => Promise<MoviesSdkResponsePayload>;
export declare const getMovieById: (movieId: string, apiUrl: string, sdkKey: string, retries?: number, retryDelay?: number) => Promise<MovieSDKResponsePayload>;
