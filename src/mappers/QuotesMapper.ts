import { APIResponse, QuoteApiResponse } from "../types/ApiResponse"

export const mapMovieQuotesApiResponse = (
  responseData: APIResponse
): string[] => {
  return responseData.docs.map((quote: QuoteApiResponse): string => {
    return quote.dialog
  })
}
