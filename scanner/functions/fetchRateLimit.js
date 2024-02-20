function fetchRateLimit() {
  return fetchOneGraph(operationsDoc, "FetchRateLimitQuery");
}