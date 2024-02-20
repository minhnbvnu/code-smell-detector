function maybeAddHostUtilization(configHostname, utilizationConfig) {
  if (typeof configHostname === 'string') {
    utilizationConfig.hostname = configHostname
  } else {
    logger.info('%s supplied in config for utilization.Hostname, expected a string', configHostname)
  }
}