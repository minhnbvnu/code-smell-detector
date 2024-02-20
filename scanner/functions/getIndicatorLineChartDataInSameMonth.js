async function getIndicatorLineChartDataInSameMonth (projectId, url, indicator, startAt, endAt, countType) {
  let startAtMoment = moment.unix(startAt).startOf(countType)
  let lineChartDataList = []
  let lineChartDataMap = {}
  let tableName = getTableName(projectId, startAt)
  let unixKeyList = []

  let countAtTimeList = []
  // 获取所有可能的countAtTime
  for (let countStartAtMoment = startAtMoment.clone(); countStartAtMoment.unix() < endAt; countStartAtMoment = countStartAtMoment.clone().add(1, countType)) {
    let formatCountAtTime = countStartAtMoment.format(DATE_FORMAT.DATABASE_BY_UNIT[countType])
    countAtTimeList.push(formatCountAtTime)
    // 将来会以时间戳为key, 对数据进行排序
    unixKeyList.push(countStartAtMoment.unix())
  }
  // 查询数据库
  let rawRecordList = await Knex
    .select(['sum_indicator_value', 'pv', 'count_at_time'])
    .from(tableName)
    .where({
      count_type: countType
    })
    .where('url', url)
    .where('indicator', indicator)
    .whereIn('count_at_time', countAtTimeList)
    .catch((e) => {
      Logger.warn('查询失败, 错误原因 =>', e)
      return []
    })
  for (let rawRecord of rawRecordList) {
    let countAtTime = _.get(rawRecord, ['count_at_time'], 0)
    let sumIndicatorValue = _.get(rawRecord, ['sum_indicator_value'], 0)
    let pv = _.get(rawRecord, ['pv'], 0)
    let recordAt = moment(countAtTime, DATE_FORMAT.DATABASE_BY_UNIT[countType]).unix()
    lineChartDataMap[recordAt] = parseInt(DatabaseUtil.computePercent(sumIndicatorValue, pv, false))
  }
  for (let unixKey of unixKeyList) {
    let result = _.get(lineChartDataMap, [unixKey], 0)
    lineChartDataList.push({
      indicator: indicator,
      index: moment.unix(unixKey).format(DATE_FORMAT.DISPLAY_BY_UNIT[countType]),
      index_timestamp_ms: unixKey * 1000,
      value: result
    })
  }
  return lineChartDataList
}