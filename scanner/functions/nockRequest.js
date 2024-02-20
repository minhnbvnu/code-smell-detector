function nockRequest(endpointMethod, bodyMatcher) {
  const relativepath = helper.generateCollectorPath(endpointMethod)
  return nock(TEST_COLLECTOR_URL).post(relativepath, bodyMatcher)
}