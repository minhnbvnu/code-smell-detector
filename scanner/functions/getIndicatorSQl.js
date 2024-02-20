function getIndicatorSQl () {
  let id = 1
  let indicatorList = MPerformance.INDICATOR_TYPE_LIST
  let nowMoment = moment()
  let tableName = 't_r_performance_1_' + nowMoment.format('YYYYMM')
  let sql = `
  REPLACE INTO \`${tableName}\` (\`id\`, \`sum_indicator_value\`, \`pv\`, \`indicator\`, \`url\`, \`city_distribute_id\`, \`count_at_time\`, \`count_type\`, \`create_time\`, \`update_time\`) VALUES`
  for (let timeAt = nowMoment.clone().subtract(3, 'hour').unix(); timeAt <= nowMoment.unix(); timeAt += 60) {
    sql += `
    (${id++}, ${id % 10}, ${id % 5}, '${indicatorList[id % indicatorList.length]}', '${urlList[id % urlList.length]}', ${id}, '${moment.unix(timeAt).format('YYYY-MM-DD_HH:mm')}', 'minute', ${timeAt}, ${timeAt}),`
  }
  for (let timeAt = nowMoment.clone().subtract(48, 'hour').unix(); timeAt <= nowMoment.unix(); timeAt += 3600) {
    sql += `
    (${id++}, ${id % 10}, ${id % 5}, '${indicatorList[id % indicatorList.length]}', '${urlList[id % urlList.length]}', ${id}, '${moment.unix(timeAt).format('YYYY-MM-DD_HH')}', 'hour', ${timeAt}, ${timeAt}),`
  }
  return sql.slice(0, sql.length - 1) + ';'
}