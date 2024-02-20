function getApiGatewayApisFromUsagePlans (usagePlans) {
  return usagePlans.reduce((acc, usagePlan) => {
    usagePlan.apis.forEach(api => {
      api.usagePlan = _.cloneDeep(usagePlan)
      // remove the apis from the cloned usagePlan so we don't go circular
      delete api.usagePlan.apis
    })

    return acc.concat(usagePlan.apis)
  }, [])
}