async function replaceSummaryRecord (projectId, countAt, countType, errorType, errorName, urlPath, errorCount, cityDistrubutionJsonString) {
  const rawRecord = await get(projectId, countAt, countType, errorType, errorName, urlPath)

  if (_.isEmpty(rawRecord)) {
    // 如果不存在对应的记录
    // 先插城市分布数据获取id
    const cityDistributionId = await MCityDistribution.insertCityDistributionRecord(cityDistrubutionJsonString, projectId, countAt)

    // 再插errorSummary数据
    const isSuccess = await insertErrorSummaryRecord(projectId, countAt, countType, errorType, errorName, urlPath, cityDistributionId, errorCount)
    return isSuccess
  } else {
    // 如果存在对应的记录
    const { id: errorSummaryId, city_distribution_id: cityDistributionId } = rawRecord

    // 更新城市分布记录
    await MCityDistribution.updateCityDistributionRecord(cityDistributionId, projectId, countAt, cityDistrubutionJsonString)

    // 更新errorSummary记录
    const isSuccess = await updateErrorSummaryRecord(errorSummaryId, projectId, countAt, countType, errorType, errorName, urlPath, errorCount)
    return isSuccess
  }
}