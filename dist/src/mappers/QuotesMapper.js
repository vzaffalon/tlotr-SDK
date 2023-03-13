"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapMovieQuotesApiResponse = void 0;
const mapMovieQuotesApiResponse = (responseData) => {
    return responseData.docs.map((quote) => {
        return quote.dialog;
    });
};
exports.mapMovieQuotesApiResponse = mapMovieQuotesApiResponse;
//# sourceMappingURL=QuotesMapper.js.map