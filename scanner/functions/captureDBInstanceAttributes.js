function captureDBInstanceAttributes(host, port, database) {
  const config = this.transaction.agent.config
  const dsTracerConf = config.datastore_tracer

  // Add database name if provided and enabled.
  if (database !== false && dsTracerConf.database_name_reporting.enabled) {
    this.addAttribute(
      'database_name',
      typeof database === 'number' ? database : database || INSTANCE_UNKNOWN
    )
  }

  // Add instance information if enabled.
  if (dsTracerConf.instance_reporting.enabled) {
    // Determine appropriate defaults for host and port.
    port = port || INSTANCE_UNKNOWN
    if (host && urltils.isLocalhost(host)) {
      host = config.getHostnameSafe(host)
    }
    if (!host || host === 'UNKNOWN_BOX') {
      // Config's default name of a host.
      host = INSTANCE_UNKNOWN
    }

    this.addAttribute('host', host)
    this.addAttribute('port_path_or_id', String(port))
  }
}