function updateUsagePlansAndApisList (bustCache = false) {
  // if we've already tried, just return that promise
  if (!bustCache && catalogPromiseCache) return catalogPromiseCache

  store.apiList.loaded = false

  // eslint-disable-next-line no-return-assign
  return catalogPromiseCache = apiGatewayClientWithCredentials()
    .then(apiGatewayClient => apiGatewayClient.get('/catalog', {}, {}, {}))
    .then(({ data = { apiGateway: [], generic: [] } }) => {
      store.usagePlans = data.apiGateway
      store.apiList = {
        loaded: true,
        apiGateway: getApiGatewayApisFromUsagePlans(store.usagePlans), // MUST create
        generic: data.generic
      }
    })
    .catch(() => {
      store.usagePlans = []
      store.apiList = {
        loaded: true,
        apiGateway: [],
        generic: []
      }
    })
}