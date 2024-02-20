function updateAllUserData (bustCache = true) {
  const promises = [
    updateUsagePlansAndApisList(bustCache),
    updateSubscriptions(bustCache),
    updateApiKey(bustCache)
  ]

  if (isAdmin()) { promises.push(updateVisibility(bustCache)) }

  return Promise.all(promises)
}