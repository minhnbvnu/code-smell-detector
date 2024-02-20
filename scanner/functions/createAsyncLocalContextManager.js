function createAsyncLocalContextManager(config) {
  logger.info('Using AsyncLocalContextManager')

  const AsyncLocalContextManager = require('./async-local-context-manager')
  return new AsyncLocalContextManager(config)
}