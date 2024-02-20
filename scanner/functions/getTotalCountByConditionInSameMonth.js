async function getTotalCountByConditionInSameMonth (projectId, startAt, endAt, offset = 0, max = 10, errorNameList = [], url = '') {
  let tableName = getTableName(projectId, startAt)

  let rawRecordList = await Knex
    .count('* as total_count')
    .from(tableName)
    .where('log_at', '>', startAt)
    .andWhere('log_at', '<', endAt)
    .whereIn('error_name', errorNameList)
    .andWhere((builder) => {
      // 外部传入的url可能是去除get参数后的结果, 所以需要进行模糊匹配
      // @todo(yaozeyuan) 添加字段, 记录 页面真实地址, 以和url进行区分
      if (url.length > 0) {
        builder.where('url', 'like', `%${url}%`)
      }
    })
    .catch(e => {
      Logger.warn(e)
      return []
    })

  let totalCount = _.get(rawRecordList, [0, 'total_count'], 0)
  return totalCount
}