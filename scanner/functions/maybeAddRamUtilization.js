function maybeAddRamUtilization(ramConfig, utilizationConfig) {
  const parsedConfigRam = parseFloat(ramConfig, 10)
  if (!isNaN(parsedConfigRam) && isInteger(parsedConfigRam)) {
    utilizationConfig.total_ram_mib = parsedConfigRam
  } else {
    logger.info('%s supplied in config for utilization.total_ram_mib, expected a number', ramConfig)
  }
}