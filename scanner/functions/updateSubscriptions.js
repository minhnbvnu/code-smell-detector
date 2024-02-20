function updateSubscriptions (bustCache = false) {
  const subscriptionsOrPromise = store.subscriptions.length ? store.subscriptions : subscriptionsPromiseCache
  if (!bustCache && subscriptionsOrPromise) return Promise.resolve(subscriptionsOrPromise)

  // eslint-disable-next-line no-return-assign
  return subscriptionsPromiseCache = apiGatewayClientWithCredentials()
    .then(apiGatewayClient => apiGatewayClient.get('/subscriptions', {}, {}, {}))
    .then(({ data }) => (store.subscriptions = data))
}