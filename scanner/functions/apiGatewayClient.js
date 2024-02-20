function apiGatewayClient () {
  if (cachedClient) return Promise.resolve(cachedClient)
  return new Promise(resolve => {
    const poller = setInterval(() => {
      if (cachedClient) {
        clearInterval(poller)
        resolve(cachedClient)
      }
    }, 100)
  })
}