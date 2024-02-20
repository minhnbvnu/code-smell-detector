async function summaryHttpError (visitAt, countType, startTimestamp, endTimestamp) {
  const visitAtTime = moment.unix(visitAt).format(DATE_FORMAT.DISPLAY_BY_MINUTE)
  const countAtTime = moment.unix(visitAt).format(DATE_FORMAT.DATABASE_BY_UNIT[countType])
  const projectList = await MProject.getList()
  for (let rawProject of projectList) {
    const projectId = _.get(rawProject, 'id', '')
    const projectName = _.get(rawProject, 'project_name', '')
    const systemTableName = MMonitor.getTableName(projectId, visitAt)
    Logger.info(`开始处理项目${projectId}(${projectName})的数据`)
    Logger.info(`[${projectId}(${projectName})] 统计时间:${visitAtTime}`)
    const sumRes = await Knex.count('* as total_count').select([`http_code`, `country`, `province`, `city`])
      .from(systemTableName)
      .where('http_code', '>', 0)
      .andWhere('log_at', '>', startTimestamp)
      .andWhere('log_at', '<', endTimestamp)
      .groupBy('http_code')
      .groupBy('country')
      .groupBy('province')
      .groupBy('city')
      .catch((err) => {
        Logger.error(err)
        return []
      })
    if (sumRes.length === 0) {
      return
    }

    let distribution = {}
    let totalCount = 0
    let recodeInfo = {}
    for (let countItem of sumRes) {
      const { country, province, city, total_count: count } = countItem
      let distributionPath = [country, province, city]
      let errorTypeName = getHttpCodeType(countItem['http_code'])
      if (_.has(recodeInfo, errorTypeName)) {
        recodeInfo[errorTypeName] += count
      } else {
        recodeInfo[errorTypeName] = 1
      }
      countItem['http_code_type'] = errorTypeName
      totalCount = totalCount + count
      _.set(distribution, distributionPath, count)
    }
    recodeInfo.totalCount = totalCount
    await replaceAndAutoIncreaseHttpErrorRecord(projectId, countType, countAtTime, recodeInfo, distribution)
    Logger.info(`项目${projectId}(${projectName})处理完毕`)
  }
}