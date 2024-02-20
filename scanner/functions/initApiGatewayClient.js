function initApiGatewayClient ({ accessKeyId, secretAccessKey, sessionToken } = {}) {
  cachedClient = window.apigClientFactory.newClient({
    accessKey: accessKeyId,
    secretKey: secretAccessKey,
    sessionToken: sessionToken,
    region: awsRegion
  })

  if (accessKeyId && secretAccessKey && sessionToken) {
    cachedClientWithCredentials = cachedClient
  }

  window.apigw = cachedClient
}