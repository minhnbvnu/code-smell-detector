function getOrCreateInstance() {
  if (_configInstance === null) {
    try {
      _configInstance = initialize()
    } catch (err) {
      /* eslint-disable no-console */
      console.error('New Relic for Node.js is disabled due to an error:')
      console.error(err.stack)
      /* eslint-enable no-console */

      // Config construction has potential to throw due to invalid settings.
      // This allows the agent to return a stub api without crashing the process.
      _configInstance = Object.assign(defaultConfig(), {
        agent_enabled: false,
        logging: {
          enabled: true,
          filepath: 'stdout'
        }
      })

      _configInstance.setLogger = Config.prototype.setLogger
    }
  }
  return _configInstance
}