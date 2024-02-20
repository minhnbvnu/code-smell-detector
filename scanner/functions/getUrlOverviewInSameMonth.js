async function getUrlOverviewInSameMonth (projectId, urlList, startAt, endAt, countType) {
  let startAtMoment = moment.unix(startAt).startOf(countType)
  let overview = {}
  let tableName = getTableName(projectId, startAt)

  let countAtTimeList = []
  // 获取所有可能的countAtTime
  for (let countStartAtMoment = startAtMoment.clone(); countStartAtMoment.unix() < endAt; countStartAtMoment = countStartAtMoment.clone().add(1, countType)) {
    let formatCountAtTime = countStartAtMoment.format(DATE_FORMAT.DATABASE_BY_UNIT[countType])
    countAtTimeList.push(formatCountAtTime)
  }

  // 查询数据库
  let rawRecordList = await Knex
    .select(['url', 'count_type', 'indicator'])
    .sum('sum_indicator_value as total_sum_indicator_value')
    .sum('pv as total_pv')
    .from(tableName)
    .where({
      count_type: countType
    })
    .whereIn('url', urlList)
    .whereIn('count_at_time', countAtTimeList)
    .groupBy([
      'url', 'count_type', 'indicator'
    ])
    .catch((e) => {
      Logger.warn('查询失败, 错误原因 =>', e)
      return []
    })
  let rawOverview = {}
  for (let rawRecord of rawRecordList) {
    let indicator = _.get(rawRecord, ['indicator'], '')
    let totalSumIndicatorValue = _.get(rawRecord, ['total_sum_indicator_value'], 0)
    let totalPv = _.get(rawRecord, ['total_pv'], 0)
    if (_.has(rawOverview, [indicator])) {
      let oldTotalSumIndicatorValue = _.get(rawOverview, [indicator, 'total_sum_indicator_value'], 0)
      let oldTotalPv = _.get(rawOverview, [indicator, 'total_pv'], 0)
      _.set(rawOverview, [indicator, 'total_sum_indicator_value'], oldTotalSumIndicatorValue + totalSumIndicatorValue)
      _.set(rawOverview, [indicator, 'total_pv'], oldTotalPv + totalPv)
    } else {
      _.set(rawOverview, [indicator, 'total_sum_indicator_value'], totalSumIndicatorValue)
      _.set(rawOverview, [indicator, 'total_pv'], totalPv)
    }
  }

  for (let indicator of INDICATOR_TYPE_LIST) {
    if (_.has(rawOverview, [indicator])) {
      let sum = _.get(rawOverview, [indicator, 'total_sum_indicator_value'], 0)
      let pv = _.get(rawOverview, [indicator, 'total_pv'], 0)
      overview[indicator] = parseInt(DatabaseUtil.computePercent(sum, pv, false))
    } else {
      overview[indicator] = 0
    }
  }

  return overview
}