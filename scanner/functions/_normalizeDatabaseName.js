function _normalizeDatabaseName(parameters, dsTracerConf) {
  // Add database name if provided and enabled.
  if (!dsTracerConf.database_name_reporting.enabled) {
    delete parameters.database_name
  } else if (hasOwnProperty(parameters, 'database_name') && parameters.database_name !== false) {
    parameters.database_name =
      typeof parameters.database_name === 'number'
        ? String(parameters.database_name)
        : parameters.database_name || INSTANCE_UNKNOWN
  }
}