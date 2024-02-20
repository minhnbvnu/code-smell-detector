function getOriginMonitorSQL () {
  let nowMoment = moment()
  let startDayMoment = moment().startOf('day')
  let tableName = 't_o_monitor_1_' + nowMoment.format('YYYYMM')
  let id = 1
  let sql = `
  REPLACE INTO \`${tableName}\` (\`id\`, \`error_type\`, \`error_name\`, \`http_code\`, \`monitor_ext_id\`, \`during_ms\`, \`request_size_b\`, \`response_size_b\`, \`url\`, \`country\`, \`province\`, \`city\`, \`log_at\`, \`md5\`, \`create_time\`, \`update_time\`) VALUES`
  for (let logAt = startDayMoment.unix(), count = 1; logAt <= nowMoment.unix() && count <= 100; logAt += 120, count++) {
    sql += `
    (${id++}, '8', '${errorNameList[id % errorNameList.length]}', '400', ${id}, '10', '10', '10', '${urlList[id % urlList.length]}', '中国', '河南', '安阳', '${logAt}', 'md5', ${logAt}, ${logAt}),`
  }
  return sql.slice(0, sql.length - 1) + ';'
}