function isLambdaProxyEvent(event) {
  return !!(event.path && (event.headers ?? event.multiValueHeaders) && event.httpMethod)
}