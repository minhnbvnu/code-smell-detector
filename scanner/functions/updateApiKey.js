function updateApiKey (bustCache) {
  const apiKeyOrPromise = store.apiKey ? store.apiKey : apiKeyPromiseCache
  if (!bustCache && apiKeyOrPromise) return Promise.resolve(apiKeyOrPromise)
  store.apiKeyFetchFailed = false

  const MAX_RETRIES = 5
  let remaining = MAX_RETRIES

  const timeouts = [
    250,
    500,
    1000,
    2000
  ]

  function loop () {
    remaining--
    const promise = apiGatewayClientWithCredentials()
      .then(apiGatewayClient => apiGatewayClient.get('/apikey', {}, {}, {}))
      .then(({ data }) => (store.apiKey = data.value))

    return remaining
      ? promise.catch(() =>
        new Promise(resolve => setTimeout(resolve, timeouts[remaining])).then(loop)
      )
      : promise
  }

  return (apiKeyPromiseCache = loop()).catch(() => {
    store.apiKeyFetchFailed = true
  })
}