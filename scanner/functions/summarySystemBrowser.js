async function summarySystemBrowser(visitAt) {
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
      .select([`browser`, `browser_version`, `visit_at_month`, `country`, `province`, `city`])
      .from(systemTableName)
      .where('visit_at_month', '=', visitAtMonth)
      .groupBy('browser')
      .groupBy('browser_version')
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
    let browserVersionRecord = {}
    for (let countItem of sumRes) {
      const { browser, browser_version: browserVersion, country, province, city, total_count: totalCount, visit_at_month: countAtMonth } = countItem
      let distribution = {}
      let distributionPath = [country, province, city]
      _.set(distribution, distributionPath, totalCount)
      let browserAndVersion = browser + browserVersion
      if (_.has(browserVersionRecord, browserAndVersion)) {
        // 若是已经有，更新count/distribution
        let oldCount = _.get(browserVersionRecord, [browserAndVersion, 'totalCount'], 0)
        let newCount = oldCount + totalCount
        let oldDistribution = _.get(browserVersionRecord, [browserAndVersion, 'distribution'], {})
        let cityDistribute = MCityDistribution.mergeDistributionData(distribution, oldDistribution, (newCityRecord, oldCityRecord) => { return newCityRecord + oldCityRecord })
        _.set(browserVersionRecord, [browserAndVersion, 'totalCount'], newCount)
        _.set(browserVersionRecord, [browserAndVersion, 'distribution'], cityDistribute)
      } else {
        _.set(browserVersionRecord, [browserAndVersion], {
          totalCount: totalCount,
          browser: browser,
          countAtMonth: countAtMonth,
          browserVersion: browserVersion,
          distribution: distribution
        })
      }
    }

    let totalCount = 0
    for (let item of Object.keys(browserVersionRecord)) {
      if (item) {
        totalCount = totalCount + 1
      }
      let recordInfo = browserVersionRecord[item]
      await replaceAndAutoIncreaseBrowserRecord(projectId, recordInfo, recordInfo['distribution'])
    }
    Logger.info(`项目${projectId}(${projectName})处理完毕, 共处理${totalCount}条数据`)
  }
}