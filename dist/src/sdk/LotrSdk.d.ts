import { MovieSDKResponsePayload, MoviesSdkResponsePayload, QuotesSdkResponsePayload } from '../types/SdkResponse';
export declare class LotrSdk {
    private sdkKey;
    private readonly apiUrl;
    private readonly retries;
    private readonly retryDelay;
    constructor(sdkKey: string, apiUrl?: string, retries?: number, retryDelay?: number);
    getMovieQuotes(movieId: string): Promise<QuotesSdkResponsePayload>;
    getMovieQuotesByName(movieName: string): Promise<QuotesSdkResponsePayload>;
    getMovieByName(movieName: string): Promise<MovieSDKResponsePayload>;
    getMovies(): Promise<MoviesSdkResponsePayload>;
    getMovieById(movieId: string): Promise<MovieSDKResponsePayload>;
}
