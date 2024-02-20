async function summarySystemOs(visitAt) {
  let visitAtMonth = moment.unix(visitAt).format(DATE_FORMAT.DATABASE_BY_MONTH)
  const projectList = await MProject.getList()
  for (let rawProject of projectList) {
    const projectId = _.get(rawProject, 'id', '')
    const projectName = _.get(rawProject, 'project_name', '')
    const systemTableName = MSystem.getTableName(projectId)
    Logger.info(`开始处理项目${projectId}(${projectName})的数据`)
    Logger.info(`[${projectId}(${projectName})] 统计月份:${visitAtMonth}`)
    const sumRes = await Knex
      .count('* as total_count')
      .select([`os`, `os_version`, `visit_at_month`, `country`, `province`, `city`])
      .from(systemTableName)
      .where('visit_at_month', '=', visitAtMonth)
      .groupBy('os')
      .groupBy('os_version')
      .groupBy('country')
      .groupBy('province')
      .groupBy('city')
      .catch((err) => {
        Logger.error(err)
        return []
      })
    if (sumRes.length === 0) {
      continue
    }
    let osAndOsversionRecord = {}
    for (let countItem of sumRes) {
      const { os, os_version: osVersion, country, province, city, total_count: totalCount, visit_at_month: countAtMonth } = countItem
      let distribution = {}
      let distributionPath = [country, province, city]
      _.set(distribution, distributionPath, totalCount)
      let osAndOsVersion = os + osVersion
      if (_.has(osAndOsversionRecord, osAndOsVersion)) {
        // 若是已经有，更新count/distribution
        let oldCount = _.get(osAndOsversionRecord, [osAndOsVersion, 'totalCount'], 0)
        let newCount = oldCount + totalCount
        let oldDistribution = _.get(osAndOsversionRecord, [osAndOsVersion, 'distribution'], {})
        let cityDistribute = MCityDistribution.mergeDistributionData(distribution, oldDistribution, (newCityRecord, oldCityRecord) => { return newCityRecord + oldCityRecord })
        _.set(osAndOsversionRecord, [osAndOsVersion, 'totalCount'], newCount)
        _.set(osAndOsversionRecord, [osAndOsVersion, 'distribution'], cityDistribute)
      } else {
        _.set(osAndOsversionRecord, [osAndOsVersion], {
          totalCount: totalCount,
          os: os,
          countAtMonth: countAtMonth,
          osVersion: osVersion,
          distribution: distribution
        })
      }
    }

    let totalCount = 0
    for (let item of Object.keys(osAndOsversionRecord)) {
      if (item) {
        totalCount = totalCount + 1
      }
      let recordInfo = osAndOsversionRecord[item]
      await replaceAndAutoIncreaseOsRecord(projectId, recordInfo, recordInfo['distribution'])
    }
    Logger.info(`项目${projectId}(${projectName})处理完毕, 共处理${totalCount}条数据`)
  }
}