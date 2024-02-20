function fetchDockerVendorInfo(agent, callback) {
  if (!agent.config.utilization || !agent.config.utilization.detect_docker) {
    return callback(null, null)
  }

  if (vendorInfo) {
    return callback(null, vendorInfo)
  }

  if (!os.platform().match(/linux/i)) {
    logger.debug('Platform is not a flavor of linux, omitting docker info')
    return callback(null, null)
  }

  // try v2 path first and if null try parsing v1 path
  common.readProc(CGROUPS_V2_PATH, function getV2CGroup(err, data) {
    if (data === null) {
      logger.debug(
        `${CGROUPS_V2_PATH} not found, trying to parse container id from ${CGROUPS_V1_PATH}`
      )
      findCGroupsV1(callback)
      return
    }

    parseCGroupsV2(data, callback)
  })
}