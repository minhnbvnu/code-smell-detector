function isValidHarvestConfig(harvestConfig) {
  if (harvestConfig == null) {
    return false
  }

  const harvestLimits = harvestConfig.harvest_limits

  return (
    isValidHarvestValue(harvestConfig.report_period_ms) &&
    harvestLimits != null &&
    Object.keys(harvestLimits).length > 0
  )
}