async function getErrorNameDistributionInSameMonth (projectId, startAt, endAt, max = 500) {
  let tableName = getTableName(projectId, startAt)
  let timeList = DatabaseUtil.getDatabaseTimeList(startAt, endAt, DATE_FORMAT.UNIT.DAY)
  let rawDistributionList = await Knex
    .sum('error_count as sum_error_count')
    .select('error_name')
    .from(tableName)
    .whereIn('count_at_time', timeList)
    .andWhere('count_type', DATE_FORMAT.UNIT.DAY)
    .groupBy('error_name')
    .orderBy('sum_error_count', 'desc')
    .limit(max)
    .catch((e) => {
      Logger.warn('getErrorNameDistributionInSameMonth查询错误, 错误信息=>', e)
      return []
    })
  let distributionList = []
  for (let rawDistribution of rawDistributionList) {
    let errorName = _.get(rawDistribution, ['error_name'], '')
    let errorCount = _.get(rawDistribution, ['sum_error_count'], '')
    let distribution = {
      error_name: errorName,
      error_count: errorCount
    }
    distributionList.push(distribution)
  }
  return distributionList
}