function _normalizeParameters(parameters) {
  parameters = parameters || Object.create(null)
  const config = this.agent.config
  const dsTracerConf = config.datastore_tracer

  parameters.product = parameters.product || this._datastore

  _normalizeDatabaseName(parameters, dsTracerConf)
  _normalizeInstanceInformation(parameters, dsTracerConf, config)

  return parameters
}