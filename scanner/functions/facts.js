async function facts(agent, callback) {
  const startTime = Date.now()

  const systemInfoPromise = new Promise((resolve) => {
    fetchSystemInfo(agent, (_, data) => {
      resolve(data)
    })
  })

  const environmentPromise = agent.environment.getJSON()
  let [systemInfo, environment] = await Promise.all([systemInfoPromise, environmentPromise])
  logger.trace('Facts gathering finished in %dms', Date.now() - startTime)

  if (environment.failed) {
    logger.debug(environment.err, 'Failed to load system facts!')
  }

  systemInfo = systemInfo || Object.create(null)
  environment = environment || []

  const hostname = agent.config.getHostnameSafe()
  const results = {
    utilization: {
      metadata_version: 5,
      logical_processors: systemInfo.logicalProcessors || null,
      total_ram_mib: systemInfo.memory || null,
      hostname: hostname
    },
    pid: process.pid,
    host: hostname,
    display_host: agent.config.getDisplayHost() || hostname,
    language: 'nodejs',
    app_name: agent.config.applications(),
    agent_version: agent.version,
    environment: environment,
    settings: agent.config.publicSettings(),
    high_security: agent.config.high_security,
    labels: parseLabels(agent.config.labels),
    metadata: Object.keys(process.env).reduce((obj, key) => {
      if (key.startsWith('NEW_RELIC_METADATA_')) {
        obj[key] = process.env[key]
      }
      return obj
    }, {})
  }

  logger.debug('New Relic metadata %o', results.metadata)

  /**
   * WARNING: This may not make sense if you are familiar with our config
   * and updating of config from server.  But the intention here is to always
   * send the values from user config of harvest limits because on connect these
   * values get reconfigured based on harvest cycle intervals.  So if you originally
   * had 1000 and a harvest of 5 seconds the new value of the harvest limit would be 83.
   * Then every subsequent connect request it would continue to decrease until it eventually hit 0
   * and we would never be sampling a certain piece of data.
   */
  results.event_harvest_config = {
    harvest_limits: {
      analytic_event_data: agent.config.transaction_events.max_samples_stored,
      custom_event_data: agent.config.custom_insights_events.max_samples_stored,
      error_event_data: agent.config.error_collector.max_event_samples_stored,
      span_event_data: agent.config.span_events.max_samples_stored,
      log_event_data: agent.config.application_logging.forwarding.max_samples_stored
    }
  }

  results.identifier = getIdentifierOverride(results.app_name)

  const ipAddresses = getAllIPAddresses()
  if (ipAddresses.length) {
    results.utilization.ip_address = ipAddresses
  }

  if (systemInfo.bootId) {
    results.utilization.boot_id = systemInfo.bootId
  }

  if (systemInfo.vendors) {
    results.utilization.vendors = systemInfo.vendors
  }

  if (systemInfo.config) {
    results.utilization.config = systemInfo.config
  }

  callback(results)
}