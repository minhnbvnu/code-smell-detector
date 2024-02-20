async function summarySystemDevice (visitAt) {
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
      .select([`device_vendor`, `device_model`, `visit_at_month`, `country`, `province`, `city`])
      .from(systemTableName)
      .where('visit_at_month', '=', visitAtMonth)
      .groupBy('device_vendor')
      .groupBy('device_model')
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

    let deviceVersionRecord = {}
    for (let countItem of sumRes) {
      const { device_model: deviceModel, device_vendor: deviceVendor, country, province, city, total_count: totalCount, visit_at_month: countAtMonth } = countItem
      let distribution = {}
      let distributionPath = [country, province, city]
      _.set(distribution, distributionPath, totalCount)
      let deviceVersionKey = deviceModel + deviceVendor
      if (_.has(deviceVersionRecord, deviceVersionKey)) {
        // 若是已经有，更新count/distribution
        let oldCount = _.get(deviceVersionRecord, [deviceVersionKey, 'totalCount'], 0)
        let newCount = oldCount + totalCount
        let oldDistribution = _.get(deviceVersionRecord, [deviceVersionKey, 'distribution'], {})
        let cityDistribute = MCityDistribution.mergeDistributionData(distribution, oldDistribution, (newCityRecord, oldCityRecord) => { return newCityRecord + oldCityRecord })
        _.set(deviceVersionRecord, [deviceVersionKey, 'totalCount'], newCount)
        _.set(deviceVersionRecord, [deviceVersionKey, 'distribution'], cityDistribute)
      } else {
        _.set(deviceVersionRecord, [deviceVersionKey], {
          totalCount: totalCount,
          deviceVendor: deviceVendor,
          deviceModel: deviceModel,
          countAtMonth: countAtMonth,
          distribution: distribution
        })
      }
    }

    let totalCount = 0
    for (let item of Object.keys(deviceVersionRecord)) {
      if (item) {
        totalCount = totalCount + 1
      }
      let recordInfo = deviceVersionRecord[item]
      await replaceAndAutoIncreaseDeviceRecord(projectId, recordInfo, recordInfo['distribution'])
    }
    Logger.info(`项目${projectId}(${projectName})处理完毕, 共处理${totalCount}条数据`)
  }
}