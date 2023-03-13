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
exports.fetchWithRetry = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const fetchWithRetry = (url, sdkKey, retries = 3, retryDelay = 500) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sdkKey}`,
    };
    for (let i = 0; i < retries; i++) {
        try {
            const response = yield (0, node_fetch_1.default)(url, { headers });
            if (response.ok) {
                return response;
            }
            else {
                throw new Error("API_REQUEST_FAILED" /* SDK_ERRORS.API_REQUEST_FAILED */);
            }
        }
        catch (e) {
            console.error(`LotrSdk: API request failed: ${e.message}`);
            if (i === retries - 1) {
                throw new Error("API_REQUEST_FAILED_AFTER_RETRIES" /* SDK_ERRORS.API_REQUEST_FAILED_AFTER_RETRIES */);
            }
            else {
                console.warn(`LotrSdk: Retrying in ${retryDelay}ms...`);
                yield new Promise((resolve) => setTimeout(resolve, retryDelay));
            }
        }
    }
});
exports.fetchWithRetry = fetchWithRetry;
//# sourceMappingURL=fetchWithRetry.js.map