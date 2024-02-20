async function getRecordList (projectId, startAt, finishAt, countType) {
  let tableName = getTableName()
  let countAtTimeList = []
  let dateFormat = DATE_FORMAT.DATABASE_BY_UNIT[countType]
  let addDateRange = 'day'
  switch (countType) {
    case DATE_FORMAT.UNIT.HOUR:
      addDateRange = 'hour'
      break
    case DATE_FORMAT.UNIT.DAY:
      addDateRange = 'day'
      break
    case DATE_FORMAT.UNIT.MONTH:
      addDateRange = 'month'
      break
    default:
      addDateRange = 'month'
  }
  let finishAtMoment = moment.unix(finishAt)

  for (let currentAtMoment = moment.unix(startAt); currentAtMoment.isBefore(finishAtMoment); currentAtMoment = currentAtMoment.clone().add(1, addDateRange)) {
    let currentAtFormated = currentAtMoment.format(dateFormat)
    countAtTimeList.push(currentAtFormated)
  }
  let recordList = await Knex
    .select(TABLE_COLUMN)
    .from(tableName)
    .where('project_id', projectId)
    .andWhere('count_at_time', 'in', countAtTimeList)
    .andWhere('count_type', '=', countType)
    .orderBy('count_at_time', 'asc')
    .catch(e => {
      return []
    })

  return recordList
}