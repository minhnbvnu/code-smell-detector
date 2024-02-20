async function getErrorNameDistributionByTimeWithCache (projectId, startAt, endAt, forceUpdate = false) {
  let distributionList = []
  let distributionMap = {}
  for (let timeAt = startAt; timeAt <= endAt; timeAt += 86400) {
    let key = getRedisKey(REDIS_KEY_ERROR_NAME_DISTRIBUTION_CACHE, projectId, timeAt)
    let redisDistributionList = await redis.asyncGet(key)

    if (_.isEmpty(redisDistributionList) || forceUpdate) {
      redisDistributionList = await getErrorNameDistributionInSameMonth(projectId, moment.unix(timeAt).startOf('day').unix(), moment.unix(timeAt).endOf('day').unix())
      await redis.asyncSetex(key, 86400, redisDistributionList)
    }
    for (let redisDistribution of redisDistributionList) {
      let errorName = _.get(redisDistribution, ['error_name'], '')
      let errorCount = _.get(redisDistribution, ['error_count'], 0)
      let oldCount = _.get(distributionMap, [errorName], 0)
      _.set(distributionMap, [errorName], oldCount + errorCount)
    }
  }
  for (let errorName of Object.keys(distributionMap)) {
    distributionList.push({
      error_name: errorName,
      error_count: _.get(distributionMap, [errorName], 0)
    })
  }
  return distributionList
}