function isBadSegment(segment) {
  const nameParts = segment.name.split('/')
  const command = nameParts[nameParts.length - 1]
  const attributes = segment.getAttributes()

  return (
    BAD_MONGO_COMMANDS.indexOf(command) !== -1 && // Is in the list of bad commands
    !attributes.database_name && // and does not have any of the
    !attributes.host && // instance attributes.
    !attributes.port_path_or_id
  )
}