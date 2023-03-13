"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.LotrSdk = void 0;
const API_CALLS = __importStar(require("../api/lotrApi"));
class LotrSdk {
    constructor(sdkKey, apiUrl, retries, retryDelay) {
        this.apiUrl = 'https://the-one-api.dev/v2/';
        this.retries = 3;
        this.retryDelay = 500;
        this.sdkKey = sdkKey;
        if (apiUrl) {
            this.apiUrl = apiUrl;
        }
        if (retries) {
            this.retries = retries;
        }
        if (retryDelay) {
            this.retryDelay = retryDelay;
        }
    }
    getMovieQuotes(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            return API_CALLS.getMovieQuotes(movieId, this.apiUrl, this.sdkKey, this.retries, this.retryDelay);
        });
    }
    getMovieQuotesByName(movieName) {
        return __awaiter(this, void 0, void 0, function* () {
            return API_CALLS.getMovieQuotesByName(movieName, this.apiUrl, this.sdkKey, this.retries, this.retryDelay);
        });
    }
    getMovieByName(movieName) {
        return __awaiter(this, void 0, void 0, function* () {
            return API_CALLS.getMovieByName(movieName, this.apiUrl, this.sdkKey, this.retries, this.retryDelay);
        });
    }
    getMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            return API_CALLS.getMovies(this.apiUrl, this.sdkKey, this.retries, this.retryDelay);
        });
    }
    getMovieById(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            return API_CALLS.getMovieById(movieId, this.apiUrl, this.sdkKey, this.retries, this.retryDelay);
        });
    }
}
exports.LotrSdk = LotrSdk;
//# sourceMappingURL=LotrSdk.js.map