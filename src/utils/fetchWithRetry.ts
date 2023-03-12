import fetch from 'node-fetch'
import { SDK_ERRORS } from '../types/SdkErrors'

export const fetchWithRetry = async (
  url: string,
  sdkKey: string,
  retries: number = 3,
  retryDelay: number = 500
): Promise<Response> => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sdkKey}`,
  }

  for (let i = 0; i < retries; i++) {
    try {
      const response: Response = await fetch(url, { headers })
      if (response.ok) {
        return response
      } else {
        throw new Error(SDK_ERRORS.API_REQUEST_FAILED)
      }
    } catch (e) {
      console.error(`LotrSdk: API request failed: ${e.message}`)
      if (i === retries - 1) {
        throw new Error(SDK_ERRORS.API_REQUEST_FAILED_AFTER_RETRIES)
      } else {
        console.warn(`LotrSdk: Retrying in ${retryDelay}ms...`)
        await new Promise((resolve) => setTimeout(resolve, retryDelay))
      }
    }
  }
}
