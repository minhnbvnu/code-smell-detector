function maybeAddProcessorUtilization(processorConfig, utilizationConfig) {
  const parsedConfigProcessors = parseFloat(processorConfig, 10)
  if (!isNaN(parsedConfigProcessors) && isInteger(parsedConfigProcessors)) {
    utilizationConfig.logical_processors = parsedConfigProcessors
  } else {
    logger.info(
      '%s supplied in config for utilization.logical_processors, expected a number',
      processorConfig
    )
  }
}