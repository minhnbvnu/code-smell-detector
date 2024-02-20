function fetchUsage (usagePlanId) {
  const date = new Date()
  const start = new Date(date.getFullYear(), date.getMonth(), 1).toJSON().split('T')[0]
  const end = date.toJSON().split('T')[0]
  return apiGatewayClientWithCredentials()
    .then(apiGatewayClient => apiGatewayClient.get('/subscriptions/' + usagePlanId + '/usage', { start, end }, {}))
}