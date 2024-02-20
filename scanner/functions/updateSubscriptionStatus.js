function updateSubscriptionStatus (usagePlans) {
  if (usagePlans) {
    usagePlans.forEach(usagePlan => {
      const subscribed = !!getSubscribedUsagePlan(usagePlan.id)
      usagePlan.subscribed = subscribed

      usagePlan.apis.forEach(api => { api.subscribed = subscribed })
    })
  }
}