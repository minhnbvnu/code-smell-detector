async function getListByConditionInSameMonth (projectId, startAt, endAt, offset = 0, max = 10, errorNameList = [], url = '') {
  let tableName = getTableName(projectId, startAt)

  // 获取最大id
  let rawResult = await Knex
    .max('id as maxId')
    .from(tableName)
    .catch(err => {
      Logger.error('monitor.js => getListByConditionInSameMonth获取最大id出错', err.message)
      return [{ maxId: 0 }]
    })
  let maxId = _.get(rawResult, [0, 'maxId'], 0)
  if (maxId === null || maxId === 0) return []
  let rawRecordList = await Knex
    .select(TABLE_COLUMN)
    .from(tableName)
    .where('log_at', '>', startAt)
    .andWhere('id', '>', maxId - MAX_ERROR_LOG_LENGTH)
    .andWhere('log_at', '<', endAt)
    .whereIn('error_name', errorNameList)
    .andWhere((builder) => {
      // 外部传入的url可能是去除get参数后的结果, 所以需要进行模糊匹配
      // @todo(yaozeyuan) 添加字段, 记录 页面真实地址, 以和url进行区分
      if (url.length > 0) {
        builder.where('url', 'like', `%${url}%`)
      }
    })
    .orderBy('log_at', 'desc')
    .offset(offset)
    .limit(max)
    .catch(e => {
      Logger.warn(e)
      return []
    })

  let extendLogIdList = []
  let createAt = 0
  if (rawRecordList.length === 0) return []
  for (let rawRecord of rawRecordList) {
    let extendRecordId = _.get(rawRecord, ['monitor_ext_id'], 0)
    // 所有记录一定在同一张扩展表里
    createAt = _.get(rawRecord, ['create_time'], 0)
    extendLogIdList.push(extendRecordId)
  }
  // 补全扩展信息
  let extendRecordList = await MMonitorExt.getRecordListByIdList(projectId, createAt, extendLogIdList)
  let extendRecordMap = {}
  for (let extendRecord of extendRecordList) {
    let extJson = _.get(extendRecord, ['ext_json'], '{}')
    let extId = _.get(extendRecord, ['id'], '{}')
    let ext = {}
    try {
      ext = JSON.parse(extJson)
    } catch (e) {
      ext = {}
    }
    extendRecordMap[extId] = ext
  }

  // 填充到数据里
  let recordList = []
  for (let rawRecord of rawRecordList) {
    let extendRecordId = _.get(rawRecord, ['monitor_ext_id'], 0)
    let extendRecord = _.get(extendRecordMap, [extendRecordId], {})
    rawRecord['ext'] = extendRecord
    let record = {
      ...rawRecord
    }
    recordList.push(record)
  }

  return recordList
}