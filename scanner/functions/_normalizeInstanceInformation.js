function _normalizeInstanceInformation(parameters, dsTracerConf, config) {
  // Add instance information if enabled.
  if (!dsTracerConf.instance_reporting.enabled) {
    delete parameters.host
    delete parameters.port_path_or_id
  } else {
    // Determine appropriate defaults for host and port.
    if (hasOwnProperty(parameters, 'port_path_or_id')) {
      parameters.port_path_or_id = String(parameters.port_path_or_id || INSTANCE_UNKNOWN)
    }
    if (hasOwnProperty(parameters, 'host')) {
      if (parameters.host && urltils.isLocalhost(parameters.host)) {
        parameters.host = config.getHostnameSafe(parameters.host)
      }

      // Config's default name of a host is `UNKNOWN_BOX`.
      if (!parameters.host || parameters.host === 'UNKNOWN_BOX') {
        parameters.host = INSTANCE_UNKNOWN
      }
    }
  }
}