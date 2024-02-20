function reformatLogLine({ logLine, msg, agent, chindings = '', level, logger }) {
  const metadata = agent.getLinkingMetadata()

  /**
   * pino adds this already for us at times
   * since asJson manually constructs the json string,
   * it will have hostname twice if we do not delete ours.
   */
  if (chindings.includes('hostname')) {
    delete metadata.hostname
  }

  const agentMeta = Object.assign({}, { timestamp: Date.now(), message: msg }, metadata)

  /**
   * A function that gets executed in `_toPayloadSync` of log aggregator.
   * This will parse the serialized log line and then add the relevant NR
   * context metadata and rename the time/msg keys to timestamp/message
   */
  return function formatLogLine() {
    let formattedLog
    try {
      formattedLog = JSON.parse(logLine)
    } catch (err) {
      logger.error('Failed to parse log line as json: %s', err.message)
      return
    }

    if (formattedLog.err) {
      reformatError(formattedLog)
    }
    Object.assign(formattedLog, agentMeta)
    formattedLog.level = level
    delete formattedLog.time
    delete formattedLog.msg
    return formattedLog
  }
}