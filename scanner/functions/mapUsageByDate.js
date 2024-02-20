function mapUsageByDate (usage, usedOrRemaining) {
  const dates = {}
  Object.keys(usage.items).forEach(apiKeyId => {
    const apiKeyUsage = mapApiKeyUsageByDate(usage.items[apiKeyId], usage.startDate, usedOrRemaining)

    // handles the bizarre case that the user has more than one api key
    // currently not possible (and my never be), so we probably don't need it
    apiKeyUsage.forEach(dailyUsage => {
      const date = dailyUsage[0]
      const used = dailyUsage[1]
      const remaining = dailyUsage[2]

      if (!dates[date]) { dates[date] = { used: 0, remaining: 0 } }

      dates[date].used += used
      dates[date].remaining += remaining
    })
  })

  const usageByDate = Object.keys(dates).sort().map(date => [
    parseInt(date, 10),
    dates[date].used,
    dates[date].remaining
  ])

  return usageByDate
}