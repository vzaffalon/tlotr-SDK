import { fetchWithRetry } from '../../utils/fetchWithRetry';
import { SDK_ERRORS } from '../../types/SdkErrors';

describe('fetchWithRetry', () => {
  const url = 'https://example.com/api';
  const sdkKey = 'test_sdk_key';
  const responseMock = {
    ok: true,
    status: 200,
    data: 'any-data',
  };

  beforeEach(() => {
    jest.resetModules(); // clear previous module mocks
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call fetch with expected headers and options', async () => {
    const fetchMock = jest.fn(() => Promise.resolve(responseMock)); // mocked implementation of fetch
    jest.mock('node-fetch', () => {
      return fetchMock;
    }); // mock node-fetch module

    await fetchWithRetry(url, sdkKey);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sdkKey}`,
      },
    });
  });

  it('should return a response when fetch succeeds', async () => {
    const fetchMock = jest.fn(() => Promise.resolve(responseMock)); // mocked implementation of fetch
    jest.mock('node-fetch', () => {
      return fetchMock;
    }); // mock node-fetch module

    const response = await fetchWithRetry(url, sdkKey);

    expect(response).toEqual(responseMock);
  });

  it('should throw an error when fetch fails even after retries', async () => {
    const fetchMock = jest.fn(() => Promise.reject(new Error())); // mocked implementation of fetch
    jest.mock('node-fetch', () => {
      return fetchMock;
    }); // mock node-fetch module

    await expect(fetchWithRetry(url, sdkKey, 2, 100)).rejects.toThrowError(
      SDK_ERRORS.API_REQUEST_FAILED_AFTER_RETRIES
    );

    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('should retry fetch and resolve with response when fetch fails and retries are set', async () => {
    const fetchMock = jest
      .fn()
      .mockRejectedValueOnce(new Error())
      .mockRejectedValueOnce(new Error())
      .mockResolvedValueOnce(responseMock); // mocked implementation of fetch
    jest.mock('node-fetch', () => {
      return fetchMock;
    }); // mock node-fetch module

    const response = await fetchWithRetry(url, sdkKey, 3, 100);

    expect(response).toEqual(responseMock);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('should retry fetch after a delay when fetch fails and retries are set', async () => {
    const fetchMock = jest.fn(() => Promise.reject(new Error())); // mocked implementation of fetch
    jest.mock('node-fetch', () => {
      return fetchMock;
    }); // mock node-fetch module

    const start = Date.now();
    await expect(fetchWithRetry(url, sdkKey, 2, 100)).rejects.toThrowError(
      SDK_ERRORS.API_REQUEST_FAILED_AFTER_RETRIES
    );
    const end = Date.now();

    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(end - start).toBeGreaterThanOrEqual(200);
    // Lowered the time expectation as 300 would mean a minimum of 600ms for two retries
  });
});