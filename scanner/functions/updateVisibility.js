function updateVisibility (cacheBust = false) {
  return apiGatewayClientWithCredentials()
    .then(app => app.get('/admin/catalog/visibility', {}, {}, {}))
    .then(({ data }) => (store.visibility = data))
}