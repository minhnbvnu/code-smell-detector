function parseCGroupsV2(data, callback) {
  const containerLine = new RegExp('/docker/containers/([0-9a-f]{64})/')
  const line = containerLine.exec(data)
  if (line) {
    callback(null, { id: line[1] })
  } else {
    logger.debug(`Found ${CGROUPS_V2_PATH} but failed to parse Docker container id.`)
    callback(null, null)
  }
}