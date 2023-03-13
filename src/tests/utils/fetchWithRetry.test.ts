import fetch from 'node-fetch'
import { fetchWithRetry } from '../../utils/fetchWithRetry'
import { SDK_ERRORS } from '../../types/SdkErrors'

describe('fetchWithRetry', () => {
  const url = 'https://example.com/api'
  const sdkKey = 'test_sdk_key'
  const responseMock =  {
    ok: true,
    status: 200,
    data: 'any-data'
  }

  beforeEach(() => {
    jest.mock('node-fetch', ()=> jest.fn( () => Promise.resolve(responseMock)))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call fetch with expected headers and options', async () => {
    await fetchWithRetry(url, sdkKey)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(url, {
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
    ;(fetch as jest.Mock).mockRejectedValue(new Error())

    await expect(fetchWithRetry(url, sdkKey, 2, 100)).rejects.toThrowError(
      SDK_ERRORS.API_REQUEST_FAILED_AFTER_RETRIES
    )

    expect(fetch).toHaveBeenCalledTimes(3)
  })

  it('should retry fetch and resolve with response when fetch fails and retries are set', async () => {
    // Fail twice, then succeed on the third attempt
    ;(fetch as jest.Mock)
      .mockRejectedValueOnce(new Error())
      .mockRejectedValueOnce(new Error())
      .mockResolvedValueOnce(responseMock)

    const response = await fetchWithRetry(url, sdkKey, 3, 100)

    expect(response).toEqual(responseMock)
    expect(fetch).toHaveBeenCalledTimes(3)
  })

  it('should retry fetch after a delay when fetch fails and retries are set', async () => {
    // Always fail
    ;(fetch as jest.Mock).mockRejectedValue(new Error())

    const start = Date.now()
    await expect(fetchWithRetry(url, sdkKey, 2, 100)).rejects.toThrowError(
      SDK_ERRORS.API_REQUEST_FAILED_AFTER_RETRIES
    )
    const end = Date.now()

    expect(fetch).toHaveBeenCalledTimes(3)
    expect(end - start).toBeGreaterThanOrEqual(300)
  })
})
