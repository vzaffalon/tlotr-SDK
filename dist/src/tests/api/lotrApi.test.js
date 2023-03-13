"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetchWithRetry_1 = require("../../utils/fetchWithRetry");
const lotrApi_1 = require("../../api/lotrApi");
jest.mock('../utils/fetchWithRetry');
describe('lotrApi', () => {
    describe('fetchWithRetry', () => {
        const url = 'https://example.com/api';
        const sdkKey = 'test_sdk_key';
        const responseMock = {
            ok: true,
            status: 200,
            data: 'any-data',
        };
        beforeEach(() => {
            fetchMock.resetMocks();
        });
        it('should call fetch with expected headers and options', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            fetchMock.mockResponseOnce(JSON.stringify(responseMock));
            yield (0, fetchWithRetry_1.fetchWithRetry)(url, sdkKey);
            expect(fetchMock).toHaveBeenCalledTimes(1);
            expect(fetchMock.mock.calls[0][0]).toEqual(url);
            expect((_a = fetchMock.mock.calls[0][1]) === null || _a === void 0 ? void 0 : _a.headers).toEqual({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sdkKey}`,
            });
        }));
        it('should return a response when fetch succeeds', () => __awaiter(void 0, void 0, void 0, function* () {
            fetchMock.mockResponseOnce(JSON.stringify(responseMock));
            const response = yield (0, fetchWithRetry_1.fetchWithRetry)(url, sdkKey);
            expect(response.status).toEqual(responseMock.status);
            expect(yield response.json()).toEqual(responseMock.data);
        }));
        it('should throw an error when fetch fails even after retries', () => __awaiter(void 0, void 0, void 0, function* () {
            fetchMock.mockReject(new Error());
            yield expect((0, fetchWithRetry_1.fetchWithRetry)(url, sdkKey, 2, 100)).rejects.toThrowError("API_REQUEST_FAILED_AFTER_RETRIES" /* SDK_ERRORS.API_REQUEST_FAILED_AFTER_RETRIES */);
            expect(fetchMock).toHaveBeenCalledTimes(3);
        }));
        it('should retry fetch and resolve with response when fetch fails and retries are set', () => __awaiter(void 0, void 0, void 0, function* () {
            // Fail twice, then succeed on the third attempt
            fetchMock.mockRejectOnce(new Error());
            fetchMock.mockRejectOnce(new Error());
            fetchMock.mockResponseOnce(JSON.stringify(responseMock));
            const response = yield (0, fetchWithRetry_1.fetchWithRetry)(url, sdkKey, 3, 100);
            expect(response.status).toEqual(responseMock.status);
            expect(yield response.json()).toEqual(responseMock.data);
            expect(fetchMock).toHaveBeenCalledTimes(3);
        }));
        it('should retry fetch after a delay when fetch fails and retries are set', () => __awaiter(void 0, void 0, void 0, function* () {
            // Always fail
            fetchMock.mockReject(new Error());
            const start = Date.now();
            yield expect((0, fetchWithRetry_1.fetchWithRetry)(url, sdkKey, 2, 100)).rejects.toThrowError("API_REQUEST_FAILED_AFTER_RETRIES" /* SDK_ERRORS.API_REQUEST_FAILED_AFTER_RETRIES */);
            const end = Date.now();
            expect(fetchMock).toHaveBeenCalledTimes(3);
            expect(end - start).toBeGreaterThanOrEqual(300);
        }));
    });
    describe('getMovieByName', () => {
        const apiUrl = 'https://the-one-api.dev/v2/';
        const sdkKey = 'test_sdk_key';
        const retries = 3;
        const retryDelay = 500;
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should successfully retrieve movie data', () => __awaiter(void 0, void 0, void 0, function* () {
            const responseData = {
                ok: true,
                json: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
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
                    });
                }),
            };
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
            };
            fetchWithRetry_1.fetchWithRetry.mockResolvedValueOnce(responseData);
            const response = yield (0, lotrApi_1.getMovieByName)('movie_name', apiUrl, sdkKey, retries, retryDelay);
            expect(fetchWithRetry_1.fetchWithRetry).toHaveBeenCalledTimes(1);
            expect(response).toEqual(expectedResponse);
        }));
        it('should not find the movie', () => __awaiter(void 0, void 0, void 0, function* () {
            const responseData = {
                ok: true,
                json: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        docs: [],
                    });
                }),
            };
            const expectedResponse = {
                success: false,
                message: 'Not able to find movie',
            };
            fetchWithRetry_1.fetchWithRetry.mockResolvedValueOnce(responseData);
            const response = yield (0, lotrApi_1.getMovieByName)('unknown_movie_name', apiUrl, sdkKey, retries, retryDelay);
            expect(fetchWithRetry_1.fetchWithRetry).toHaveBeenCalledTimes(1);
            expect(response).toEqual(expectedResponse);
        }));
        it('should throw an exception on API error', () => __awaiter(void 0, void 0, void 0, function* () {
            ;
            fetchWithRetry_1.fetchWithRetry.mockRejectedValueOnce(new Error());
            yield expect((0, lotrApi_1.getMovieByName)('movie_name', apiUrl, sdkKey, retries, retryDelay)).rejects.toThrow("API_REQUEST_FAILED" /* SDK_ERRORS.API_REQUEST_FAILED */);
            expect(fetchWithRetry_1.fetchWithRetry).toHaveBeenCalledTimes(3); // expect three retries, specified by default 'retries' parameter
        }));
    });
    describe('getMovies', () => {
        const apiUrl = 'https://the-one-api.dev/v2/';
        const sdkKey = 'test_sdk_key';
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
        };
        it('should call fetchWithRetry with expected url and headers', () => __awaiter(void 0, void 0, void 0, function* () {
            mockedFetchWithRetry.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(moviesApiResponse),
            });
            yield (0, lotrApi_1.getMovies)(apiUrl, sdkKey);
            expect(mockedFetchWithRetry).toHaveBeenCalledTimes(1);
            expect(mockedFetchWithRetry).toHaveBeenCalledWith(`${apiUrl}movie`, sdkKey, undefined, undefined);
        }));
        it('should return expected SDK response when fetch is successful', () => __awaiter(void 0, void 0, void 0, function* () {
            mockedFetchWithRetry.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(moviesApiResponse),
            });
            const result = yield (0, lotrApi_1.getMovies)(apiUrl, sdkKey);
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
            });
        }));
        it('should throw an error when fetch fails even after retries', () => __awaiter(void 0, void 0, void 0, function* () {
            mockedFetchWithRetry.mockRejectedValueOnce(new Error());
            yield expect((0, lotrApi_1.getMovies)(apiUrl, sdkKey)).rejects.toThrowError();
            expect(mockedFetchWithRetry).toHaveBeenCalledTimes(3);
        }));
        it('should retry fetch when it fails and retries option is set', () => __awaiter(void 0, void 0, void 0, function* () {
            // 2 retries, so we should have a total of 3 fetch calls
            mockedFetchWithRetry
                .mockRejectedValueOnce(new Error())
                .mockRejectedValueOnce(new Error())
                .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(moviesApiResponse),
            });
            const result = yield (0, lotrApi_1.getMovies)(apiUrl, sdkKey, 2, 100);
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
            });
        }));
    });
});
//# sourceMappingURL=lotrApi.test.js.map