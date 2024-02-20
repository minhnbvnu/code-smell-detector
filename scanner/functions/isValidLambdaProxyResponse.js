function isValidLambdaProxyResponse(response) {
  return !!(response && response.statusCode)
}