function _recordOperationMetrics(segment, scope) {
  if (!segment) {
    return
  }

  const duration = segment.getDurationInMillis()
  const exclusive = segment.getExclusiveDurationInMillis()
  const transaction = segment.transaction
  const type = transaction.isWeb() ? 'allWeb' : 'allOther'
  const operation = segment.name

  if (scope) {
    transaction.measure(operation, scope, duration, exclusive)
  }

  transaction.measure(operation, null, duration, exclusive)
  transaction.measure(metrics.DB.PREFIX + type, null, duration, exclusive)
  transaction.measure(metrics.DB.ALL, null, duration, exclusive)
  transaction.measure(this._metrics.ALL, null, duration, exclusive)
  transaction.measure(
    metrics.DB.PREFIX + this._metrics.PREFIX + '/' + type,
    null,
    duration,
    exclusive
  )

  const attributes = segment.getAttributes()
  if (attributes.host && attributes.port_path_or_id) {
    const instanceName = [
      metrics.DB.INSTANCE,
      this._metrics.PREFIX,
      attributes.host,
      attributes.port_path_or_id
    ].join('/')

    transaction.measure(instanceName, null, duration, exclusive)
  }
}