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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const fetchWithRetry_1 = require("../../utils/fetchWithRetry");
describe('fetchWithRetry', () => {
    const url = 'https://example.com/api';
    const sdkKey = 'test_sdk_key';
    const responseMock = {
        ok: true,
        status: 200,
        data: 'any-data'
    };
    beforeEach(() => {
        jest.mock('node-fetch', () => jest.fn(() => Promise.resolve(responseMock)));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call fetch with expected headers and options', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, fetchWithRetry_1.fetchWithRetry)(url, sdkKey);
        expect(node_fetch_1.default).toHaveBeenCalledTimes(1);
        expect(node_fetch_1.default).toHaveBeenCalledWith(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sdkKey}`,
            },
        });
    }));
    it('should return a response when fetch succeeds', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, fetchWithRetry_1.fetchWithRetry)(url, sdkKey);
        expect(response).toEqual(responseMock);
    }));
    it('should throw an error when fetch fails even after retries', () => __awaiter(void 0, void 0, void 0, function* () {
        ;
        node_fetch_1.default.mockRejectedValue(new Error());
        yield expect((0, fetchWithRetry_1.fetchWithRetry)(url, sdkKey, 2, 100)).rejects.toThrowError("API_REQUEST_FAILED_AFTER_RETRIES" /* SDK_ERRORS.API_REQUEST_FAILED_AFTER_RETRIES */);
        expect(node_fetch_1.default).toHaveBeenCalledTimes(3);
    }));
    it('should retry fetch and resolve with response when fetch fails and retries are set', () => __awaiter(void 0, void 0, void 0, function* () {
        // Fail twice, then succeed on the third attempt
        ;
        node_fetch_1.default
            .mockRejectedValueOnce(new Error())
            .mockRejectedValueOnce(new Error())
            .mockResolvedValueOnce(responseMock);
        const response = yield (0, fetchWithRetry_1.fetchWithRetry)(url, sdkKey, 3, 100);
        expect(response).toEqual(responseMock);
        expect(node_fetch_1.default).toHaveBeenCalledTimes(3);
    }));
    it('should retry fetch after a delay when fetch fails and retries are set', () => __awaiter(void 0, void 0, void 0, function* () {
        // Always fail
        ;
        node_fetch_1.default.mockRejectedValue(new Error());
        const start = Date.now();
        yield expect((0, fetchWithRetry_1.fetchWithRetry)(url, sdkKey, 2, 100)).rejects.toThrowError("API_REQUEST_FAILED_AFTER_RETRIES" /* SDK_ERRORS.API_REQUEST_FAILED_AFTER_RETRIES */);
        const end = Date.now();
        expect(node_fetch_1.default).toHaveBeenCalledTimes(3);
        expect(end - start).toBeGreaterThanOrEqual(300);
    }));
});
//# sourceMappingURL=fetchWithRetry.test.js.map