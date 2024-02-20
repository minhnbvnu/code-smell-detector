async function getCityDistributeInRange (projectId, startAt, finishAt) {
  let startAtMoment = moment.unix(startAt)
  let finishAtMoment = moment.unix(finishAt)
  let cityDistribute = {}
  // uv记录表按月分表, 因此需要分月计算总uv
  for (let currentAtMoment = startAtMoment; currentAtMoment.isBefore(finishAtMoment); currentAtMoment = currentAtMoment.clone().add(1, 'months')) {
    let tableName = getTableName(projectId, startAt)
    let rawRecordList = await Knex
      .countDistinct('uuid as uv_count')
      .select([`country`, `province`, `city`])
      .from(tableName)
      .where('create_time', '>', startAt)
      .andWhere('create_time', '<', finishAt)
      .groupBy([`country`, `province`, `city`])
      .catch(() => { return [] })

    for (let rawRecord of rawRecordList) {
      let country = _.get(rawRecord, ['country'], '')
      let province = _.get(rawRecord, ['province'], '')
      let city = _.get(rawRecord, ['city'], '')
      let uvCount = _.get(rawRecord, ['uv_count'], '')

      let locationPath = [country, province, city]
      if (_.has(cityDistribute, locationPath)) {
        uvCount = uvCount + _.get(cityDistribute, locationPath, 0)
      }
      _.set(cityDistribute, locationPath, uvCount)
    }
  }
  return cityDistribute
}