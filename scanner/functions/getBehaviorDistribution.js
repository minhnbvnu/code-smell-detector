function getBehaviorDistribution () {
  let nowMoment = moment()
  let nowDay = nowMoment.date()
  let threeDayAgo = nowDay - 3
  let code = ['SIDE_A01B02', 'SIDE_A01B0', 'SIDE_A01B', 'SIDE_A01']
  let name = ['用户', '产品', 'url', '错误页面']
  let id = 101
  let sql = `
  REPLACE INTO \`t_r_behavior_distribution\` (\`id\`, \`project_id\`, \`code\`, \`name\`, \`url\`, \`total_count\`, \`count_at_time\`, \`count_type\`, \`city_distribute_id\`, \`create_time\`, \`update_time\`) VALUES `
  if (threeDayAgo < 0) threeDayAgo = 0
  for (let day = threeDayAgo; day <= nowDay; day++) {
    for (let hour = 0; hour <= 23; hour++) {
      sql += `
      (${id++},1, '${code[id % code.length]}', '${name[id % name.length]}', '${urlList[id % urlList.length]}', ${id % 30}, '${nowMoment.format('YYYY-MM-') + day.toString().padStart(2, '0') + '_' + hour.toString().padStart(2, '0')}', 'day', ${id}, ${moment().unix()}, ${moment().unix()}),
      `
    }
    sql += `
    (${id++},1, '${code[id % code.length]}', '${name[id % name.length]}', '${urlList[id % urlList.length]}', ${id % 30}, '${nowMoment.format('YYYY-MM-') + day.toString().padStart(2, '0')}', 'day', ${id}, ${moment().unix()}, ${moment().unix()}),`
  }
  return sql.slice(0, sql.length - 1) + ';'
}