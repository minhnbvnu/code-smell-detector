function calculateDelay(retryObject) {
  const { error, computedValue } = retryObject;
  const response = error.response;

  // Detect GraphQL request throttling.
  if (
    response &&
    response.statusCode === 200 &&
    response.body &&
    typeof response.body === 'object' &&
    Array.isArray(response.body.errors) &&
    response.body.errors[0].extensions &&
    response.body.errors[0].extensions.code == 'THROTTLED'
  ) {
    const costData = response.body.extensions.cost;

    return (
      ((costData.requestedQueryCost -
        costData.throttleStatus.currentlyAvailable) /
        costData.throttleStatus.restoreRate) *
      1000
    );
  }

  // Stop retrying if the attempt limit has been reached or the request is not
  // retryable.
  if (computedValue === 0) {
    return 0;
  }

  // For simplicity, retry network connectivity issues after a hardcoded 1s.
  if (retryableErrorCodes.has(error.code)) {
    return 1000;
  }

  if (response.headers && response.headers['retry-after']) {
    return response.headers['retry-after'] * 1000 || computedValue;
  }

  // Arbitrary 2 seconds, in case we get a 429 without a `Retry-After`
  // response header, or 4xx/5xx series error that matches the Got retry
  // defaults.
  return 2 * 1000;
}