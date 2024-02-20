async function getUVInRange (projectId, startAt, finishAt) {
  let startAtMoment = moment.unix(startAt).format(DATE_FORMAT.DATABASE_BY_HOUR)
  let finishAtMoment = moment.unix(finishAt).format(DATE_FORMAT.DATABASE_BY_HOUR)
  let tableName = getTableName(projectId, startAt)
  let rawRecord = await Knex
    .from(tableName)
    .sum('total_count as total')
    .where('count_type', '=', DATE_FORMAT.UNIT.HOUR)
    .where('count_at_time', '>', startAtMoment)
    .andWhere('count_at_time', '<', finishAtMoment)
    .catch(e => {
      return 0
    })
  let totalUV = _.get(rawRecord, [0, 'total'], 0)
  return totalUV
}