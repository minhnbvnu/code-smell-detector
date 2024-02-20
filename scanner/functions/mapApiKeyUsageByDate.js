function mapApiKeyUsageByDate (apiKeyUsage, startDate) {
  const apiKeyDate = new Date(startDate)

  if (apiKeyUsage && !Array.isArray(apiKeyUsage[0])) { apiKeyUsage = [apiKeyUsage] }

  return apiKeyUsage.map((usage) => {
    const date = apiKeyDate.setDate(apiKeyDate.getDate())
    const item = [date, ...usage]
    apiKeyDate.setDate(apiKeyDate.getDate() + 1)
    return item
  })
}