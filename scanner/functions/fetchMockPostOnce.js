function fetchMockPostOnce(fetchMock, apiUrl, fixture) {
  fetchMock.postOnce(apiUrl, fixtureWithHeaders(fixture));
}