function getSubscribedUsagePlan (usagePlanId) {
  return store.subscriptions.find(sub => sub.id === usagePlanId)
}