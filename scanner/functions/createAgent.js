function createAgent(config) {
  /* Only load the rest of the module if configuration is available and the
   * configurator didn't throw.
   *
   * The agent must be a singleton, or else module loading will be patched
   * multiple times, with undefined results. New Relic's instrumentation
   * can't be enabled or disabled without an application restart.
   */
  const Agent = require('./lib/agent')
  const agent = new Agent(config)
  const appNames = agent.config.applications()

  if (config.logging.diagnostics) {
    logger.warn('Diagnostics logging is enabled, this may cause significant overhead.')
  }

  if (appNames.length < 1) {
    const message =
      'New Relic requires that you name this application!\n' +
      'Set app_name in your newrelic.js or newrelic.cjs file or set environment variable\n' +
      'NEW_RELIC_APP_NAME. Not starting!'
    throw new Error(message)
  }

  const shimmer = require('./lib/shimmer')
  shimmer.bootstrapInstrumentation(agent)

  // Check for already loaded modules and warn about them.
  const uninstrumented = require('./lib/uninstrumented')
  uninstrumented.check(shimmer.registeredInstrumentations)
  shimmer.registerHooks(agent)

  agent.start(function afterStart(error) {
    if (error) {
      const errorMessage = 'New Relic for Node.js halted startup due to an error:'
      logger.error(error, errorMessage)

      /* eslint-disable no-console */
      console.error(errorMessage)
      console.error(error.stack)
      /* eslint-enable no-console */

      return
    }

    logger.debug('New Relic for Node.js is connected to New Relic.')
  })

  return agent
}