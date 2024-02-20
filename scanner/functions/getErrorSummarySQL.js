function getErrorSummarySQL () {
  let id = 1
  let nowMoment = moment()
  let tableName = 't_r_error_summary_1_' + nowMoment.format('YYYYMM')
  let monthPrefix = nowMoment.format('YYYY-MM')
  let timeStrPrefix = nowMoment.format('YYYY-MM-DD')
  let sql = `
  REPLACE INTO \`${tableName}\` (\`id\`, \`error_type\`, \`error_name\`, \`url_path\`, \`city_distribution_id\`, \`count_at_time\`, \`count_type\`, \`error_count\`, \`create_time\`, \`update_time\`) VALUES `
  let nowHour = nowMoment.hour()
  let endHour = nowHour - 3
  if (endHour < 0) endHour = 0
  for (let hour = endHour; hour <= nowHour; hour++) {
    let hourStr = (hour + '').padStart(2, '0')
    for (let minute = 0; minute < 60; minute++) {
      let minuteStr = (minute + '').padStart(2, '0')
      sql += `(${id++}, '8', '${errorNameList[id % errorNameList.length]}', '${urlList[id % urlList.length]}', ${id}, '${timeStrPrefix + '_' + hourStr + ':' + minuteStr}', 'minute', ${id % 10}, ${moment().unix()}, ${moment().unix()}),
      `
    }
    sql += `(${id++}, '8', '${errorNameList[id % errorNameList.length]}', '${urlList[id % urlList.length]}', ${id}, '${timeStrPrefix + '_' + hourStr}', 'hour', ${id % 100}, ${moment().unix()}, ${moment().unix()}),`
  }
  for (let day = nowMoment.date(), count = 1; count <= 30; count++) {
    sql += `
    (${id++}, '8', '${errorNameList[id % errorNameList.length]}', '${urlList[id % urlList.length]}', ${id}, '${monthPrefix + '-' + day.toString().padStart(2, '0')}', 'day', ${id % 100}, ${moment().unix()}, ${moment().unix()}),`
  }
  return sql.slice(0, sql.length - 1) + ';'
}