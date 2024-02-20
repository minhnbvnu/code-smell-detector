function nrWinstonFormatter(agent, winston) {
  const config = agent.config
  const metrics = agent.metrics

  return winston.format((logLine) => {
    if (isMetricsEnabled(config)) {
      incrementLoggingLinesMetrics(logLine.level, metrics)
    }

    if (isLocalDecoratingEnabled(config)) {
      logLine.message += agent.getNRLinkingMetadata()
    }

    return logLine
  })
}