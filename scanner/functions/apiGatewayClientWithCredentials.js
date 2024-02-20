function apiGatewayClientWithCredentials () {
  if (cachedClientWithCredentials) { return Promise.resolve(cachedClientWithCredentials) }
  return new Promise(resolve => {
    const poller = setInterval(() => {
      if (cachedClientWithCredentials) {
        clearInterval(poller)
        resolve(cachedClientWithCredentials)
      }
    }, 100)
  })
}