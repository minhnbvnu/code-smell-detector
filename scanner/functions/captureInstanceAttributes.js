function captureInstanceAttributes(host, port, database) {
  // See if we are currently in a segment created by us.
  const segment = this.getSegment()
  if (!segment || segment.shim !== this) {
    this.logger.trace(
      'Not adding db instance metric attributes to segment %j',
      segment && segment.name
    )
    return
  }
  this.logger.trace('Adding db instance attributes to segment %j', segment.name)

  // Normalize the instance attributes.
  const attributes = _normalizeParameters.call(this, {
    host,
    port_path_or_id: port,
    database_name: database
  })

  for (const key in attributes) {
    if (attributes[key]) {
      segment.addAttribute(key, attributes[key])
    }
  }
}