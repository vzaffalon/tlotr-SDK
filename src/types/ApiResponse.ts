export interface APIResponse {
  docs: any[]
  total: number
  limit: number
  offset: number
  page: number
  pages: number
}

export interface MovieApiResponse {
  _id: string
  name: string
  runtimeInMinutes: number
  budgetInMillions: number
  boxOfficeRevenueInMillions: number
  academyAwardNominations: number
  academyAwardWins: number
  rottenTomatoesScore: number
}

export interface QuoteApiResponse {
  _id: string
  dialog: string
  movie: string
  character: string
}
