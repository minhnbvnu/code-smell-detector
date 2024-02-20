function findCGroupsV1(callback) {
  common.readProc(CGROUPS_V1_PATH, function getCGroup(err, data) {
    if (!data) {
      logger.debug(`${CGROUPS_V1_PATH} not found, exiting parsing containerId.`)
      return callback(null)
    }

    let id = null
    parseCGroupsV1(data, 'cpu', function forEachCpuGroup(cpuGroup) {
      const match = /(?:^|[^0-9a-f])([0-9a-f]{64})(?:[^0-9a-f]|$)/.exec(cpuGroup)
      if (match) {
        id = match[1]
        return false
      }

      return true
    })

    if (id) {
      vendorInfo = { id: id }
      callback(null, vendorInfo)
    } else {
      logger.debug('No matching cpu group found.')
      callback(null, null)
    }
  })
}