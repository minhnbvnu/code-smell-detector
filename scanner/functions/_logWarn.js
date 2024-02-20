function _logWarn() {
  if (!logger) {
    logger = require('../logger').child({ component: 'util-process-version' })
  }
  logger.warn.apply(logger, arguments)
}