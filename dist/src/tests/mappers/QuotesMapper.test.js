"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuotesMapper_1 = require("../../mappers/QuotesMapper");
describe('mapMovieQuotesApiResponse', () => {
    test('returns an array of strings with movie quotes', () => {
        const responseData = {
            total: 1,
            limit: 10,
            offset: 0,
            page: 1,
            pages: 2,
            docs: [
                { dialog: 'You shall not pass!' },
                { dialog: 'One does not simply walk into Mordor' },
                { dialog: 'My precious...' },
            ],
        };
        const mappedQuotes = (0, QuotesMapper_1.mapMovieQuotesApiResponse)(responseData);
        expect(mappedQuotes).toEqual([
            'You shall not pass!',
            'One does not simply walk into Mordor',
            'My precious...',
        ]);
    });
    test('returns an empty array when passed an empty API response', () => {
        const responseData = {
            total: 1,
            limit: 10,
            offset: 0,
            page: 1,
            pages: 2,
            docs: [],
        };
        const mappedQuotes = (0, QuotesMapper_1.mapMovieQuotesApiResponse)(responseData);
        expect(mappedQuotes).toEqual([]);
    });
});
//# sourceMappingURL=QuotesMapper.test.js.map