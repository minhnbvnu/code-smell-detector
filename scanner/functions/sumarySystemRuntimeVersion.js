async function sumarySystemRuntimeVersion (visitAt) {
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
      .select([`runtime_version`, `visit_at_month`, `country`, `province`, `city`])
      .from(systemTableName)
      .where('visit_at_month', '=', visitAtMonth)
      .groupBy('runtime_version')
      .groupBy('country')
      .groupBy('province')
      .groupBy('city')
      .catch((err) => {
        Logger.error(err)
        return []
      })
    if (sumRes.length === 0) {
      Logger.info(`没有查询到数据，返回`)
      continue
    }
    let runtimeVersionRecord = {}
    for (let countItem of sumRes) {
      const { runtime_version: runtimeVersion, country, province, city, total_count: totalCount, visit_at_month: countAtMonth } = countItem
      let distribution = {}
      let distributionPath = [country, province, city]
      _.set(distribution, distributionPath, totalCount)
      if (_.has(runtimeVersionRecord, runtimeVersion)) {
        // 若是已经有，更新count/distribution
        let oldCount = _.get(runtimeVersionRecord, [runtimeVersion, 'totalCount'], 0)
        let newCount = oldCount + totalCount
        let oldDistribution = _.get(runtimeVersionRecord, [runtimeVersion, 'distribution'], {})
        let cityDistribute = MCityDistribution.mergeDistributionData(distribution, oldDistribution, (newCityRecord, oldCityRecord) => { return newCityRecord + oldCityRecord })
        _.set(runtimeVersionRecord, [runtimeVersion, 'totalCount'], newCount)
        _.set(runtimeVersionRecord, [runtimeVersion, 'distribution'], cityDistribute)
      } else {
        _.set(runtimeVersionRecord, [runtimeVersion], {
          totalCount: totalCount,
          runtimeVersion,
          countAtMonth: countAtMonth,
          distribution: distribution
        })
      }
    }

    let totalCount = 0
    Logger.info(`项目${projectId}(${projectName})处理完毕, 共处理${totalCount}条数据`)
    for (let item of Object.keys(runtimeVersionRecord)) {
      if (item) {
        totalCount = totalCount + 1
      }
      let recordInfo = runtimeVersionRecord[item]
      await replaceAndAutoIncreaseRuntimeVersionRecord(projectId, recordInfo, recordInfo['distribution'])
    }
    Logger.info(`项目${projectId}(${projectName})处理完毕, 共处理${totalCount}条数据`)
  }
}