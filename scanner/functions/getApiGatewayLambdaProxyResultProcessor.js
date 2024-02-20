function getApiGatewayLambdaProxyResultProcessor(transaction) {
  return function processApiGatewayLambdaProxyResponse(response) {
    if (apiGateway.isValidLambdaProxyResponse(response)) {
      const webResponse = new apiGateway.LambdaProxyWebResponse(response)
      setWebResponse(transaction, webResponse)
    } else {
      logger.debug('Did not contain a valid API Gateway Lambda Proxy response.')
    }
  }
}