function validateBrowserMonitoring(config, transaction, allowTransactionlessInjection) {
  /*
   * config.browser_monitoring should always exist, but we don't want the agent
   * to bail here if something goes wrong
   */
  if (!config.browser_monitoring) {
    return { isValidConfig: false, failureIdx: 2 }
  }

  /*
   * Can control header generation with configuration this setting is only
   * available in the newrelic.js config file, it is not ever set by the
   * server.
   */
  if (!config.browser_monitoring.enable) {
    // It has been disabled by the user; no need to warn them about their own
    // settings so fail quietly and gracefully.
    return { isValidConfig: false, failureIdx: 0, quietMode: true }
  }

  /*
   * This is only going to work if the agent has successfully handshaked with
   * the collector. If the networks is bad, or there is no license key set in
   * newrelic.js, there will be no application_id set.  We bail instead of
   * outputting null/undefined configuration values.
   */
  if (!config.application_id) {
    return { isValidConfig: false, failureIdx: 4 }
  }

  /*
   * If there is no browser_key, the server has likely decided to disable
   * browser monitoring.
   */
  if (!config.browser_monitoring.browser_key) {
    return { isValidConfig: false, failureIdx: 5 }
  }

  /*
   * If there is no agent_loader script, there is no point
   * in setting the rum data
   */
  if (!config.browser_monitoring.js_agent_loader) {
    return { isValidConfig: false, failureIdx: 6 }
  }

  /*
   * If rum is enabled, but then later disabled on the server,
   * this is the only parameter that gets updated.
   *
   * This condition should only be met if rum is disabled during
   * the lifetime of an application, and it should be picked up
   * on the next ForceRestart by the collector.
   */
  if (config.browser_monitoring.loader === 'none') {
    return { isValidConfig: false, failureIdx: 7 }
  }

  if (!allowTransactionlessInjection && !transaction) {
    return { isValidConfig: false, failureIdx: 1 }
  }

  return { isValidConfig: true }
}