function performInstrumentation({ obj, args, opts, agent, winston, shim, registerLogger }) {
  const config = agent.config

  createModuleUsageMetric('winston', agent.metrics)

  if (isLocalDecoratingEnabled(config) || isMetricsEnabled(config)) {
    registerFormatter({ opts, agent, winston })
  }

  const winstonLogger = registerLogger.apply(obj, args)

  if (isLogForwardingEnabled(config, agent)) {
    winstonLogger.add(new NrTransport({ agent }))
    wrapConfigure({ shim, winstonLogger, agent })
  }

  return winstonLogger
}