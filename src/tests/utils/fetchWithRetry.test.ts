import { fetchWithRetry } from '../../utils/fetchWithRetry'
import { SDK_ERRORS } from '../../types/SdkErrors'

describe('fetchWithRetry', () => {
  const url = 'https://example.com/api'
  const sdkKey = 'test_sdk_key'
  const responseMock = {
    ok: true,
    status: 200,
    data: 'any-data',
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call fetch with expected headers and options', async () => {
    await fetchWithRetry(url, sdkKey)

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sdkKey}`,
      },
    })
  })

  it('should return a response when fetch succeeds', async () => {
    const response = await fetchWithRetry(url, sdkKey)

    expect(response).toEqual(responseMock)
  })

  it('should throw an error when fetch fails even after retries', async () => {
    await expect(fetchWithRetry(url, sdkKey, 2, 100)).rejects.toThrowError(
      SDK_ERRORS.API_REQUEST_FAILED_AFTER_RETRIES
    )

    expect(global.fetch).toHaveBeenCalledTimes(3)
  })

  it('should retry fetch and resolve with response when fetch fails and retries are set', async () => {
    const response = await fetchWithRetry(url, sdkKey, 3, 100)

    expect(response).toEqual(responseMock)
    expect(global.fetch).toHaveBeenCalledTimes(3)
  })

  it('should retry fetch after a delay when fetch fails and retries are set', async () => {
    const start = Date.now()
    await expect(fetchWithRetry(url, sdkKey, 2, 100)).rejects.toThrowError(
      SDK_ERRORS.API_REQUEST_FAILED_AFTER_RETRIES
    )
    const end = Date.now()

    expect(global.fetch).toHaveBeenCalledTimes(3)
    expect(end - start).toBeGreaterThanOrEqual(200)
    // Lowered the time expectation as 300 would mean a minimum of 600ms for two retries
  })
})