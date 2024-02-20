async function getDistinctUrlListInRange (projectId, indicatorList, startAt, endAt, countType = DATE_FORMAT.UNIT.MINUTE) {
  let startAtMoment = moment.unix(startAt).startOf(countType)
  let urlList = []
  let tableNameList = DatabaseUtil.getTableNameListInRange(projectId, startAt, endAt, getTableName)

  let countAtTimeList = []
  // 获取所有可能的countAtTime
  for (let countStartAtMoment = startAtMoment.clone(); countStartAtMoment.unix() < endAt; countStartAtMoment = countStartAtMoment.clone().add(1, countType)) {
    let formatCountAtTime = countStartAtMoment.format(DATE_FORMAT.DATABASE_BY_UNIT[countType])
    countAtTimeList.push(formatCountAtTime)
  }
  // 循环查询数据库
  for (let tableName of tableNameList) {
    let rawRecordList = await Knex
      .distinct(['url'])
      .from(tableName)
      .where({
        count_type: countType
      })
      .whereIn('indicator', indicatorList)
      .whereIn('count_at_time', countAtTimeList)
      .catch((e) => {
        Logger.warn('查询失败, 错误原因 =>', e)
        return []
      })
    for (let rawRecord of rawRecordList) {
      if (_.has(rawRecord, ['url'])) {
        let url = _.get(rawRecord, ['url'])
        urlList.push(url)
      }
    }
  }
  let distinctUrlList = _.union(urlList)
  return distinctUrlList
}