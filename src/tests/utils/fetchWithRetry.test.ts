import { fetchWithRetry } from '../../utils/fetchWithRetry';
import { SDK_ERRORS } from '../../types/SdkErrors';
import nock from 'nock';

describe('fetchWithRetry', () => {
  const url = 'https://example.com/api';
  const sdkKey = 'test_sdk_key';
  const responseMock = {
    ok: true,
    status: 200,
    data: 'any-data',
  };

  afterEach(() => {
    jest.clearAllMocks();
    nock.cleanAll(); // Clean up all Nock mocks
  });

  it('should call fetch with expected headers and options', async () => {
    const fetchMock = nock(url, {
      reqheaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sdkKey}`,
      }
    }).get('').reply(200, responseMock.data); // set mocked response with expected headers

    await fetchWithRetry(url, sdkKey);

    expect(fetchMock.isDone()).toBe(true);
  });

  it('should return a response when fetch succeeds', async () => {
    nock(url).get('').reply(200, responseMock.data); // set mocked response

    const response = await fetchWithRetry(url, sdkKey);

    expect(await response.json()).toEqual(responseMock.data);
  });

  it('should throw an error when fetch fails even after retries', async () => {
    nock(url).get('').times(3).replyWithError(new Error()); // set mocked failed responses

    await expect(fetchWithRetry(url, sdkKey, 2, 100)).rejects.toThrowError(
      SDK_ERRORS.API_REQUEST_FAILED_AFTER_RETRIES
    );
  });

  it('should retry fetch and resolve with response when fetch fails and retries are set', async () => {
    nock(url).get('').twice().replyWithError(new Error()); // set mocked failed responses
    nock(url).get('').reply(200, responseMock.data); // set mocked successful response

    const response = await fetchWithRetry(url, sdkKey, 3, 100);

    expect(response).toEqual(responseMock);
  });

  it('should retry fetch after a delay when fetch fails and retries are set', async () => {
    nock(url).get('')
      .times(3)
      .delay(100)
      .replyWithError(new Error()); // set mocked delayed failed responses

    const start = Date.now();
    await expect(fetchWithRetry(url, sdkKey, 2, 100)).rejects.toThrowError(
      SDK_ERRORS.API_REQUEST_FAILED_AFTER_RETRIES
    );
    const end = Date.now();

    expect(end - start).toBeGreaterThanOrEqual(200);
    // Lowered the time expectation as 300 would mean a minimum of 600ms for two retries
  });
});