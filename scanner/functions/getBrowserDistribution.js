function getBrowserDistribution () {
  let id = 1
  let browserList = ['chrome', '搜狗', 'uc', '百度']
  let versions = ['10', '12', '14', '15', '16', '17', '18', '19']
  let month = moment().format('YYYY-MM')
  let sql = `
  REPLACE INTO \`t_r_system_browser\` (\`id\`, \`project_id\`, \`browser\`, \`browser_version\`, \`total_count\`, \`count_at_month\`, \`city_distribute_id\`, \`create_time\`, \`update_time\`) VALUES`
  for (let browser of browserList) {
    for (let version of versions) {
      sql += `
      (${id++}, 1, '${browser}', '${version}', ${id * 2 % 10 + 5}, '${month}', ${id}, ${moment().unix()}, ${moment().unix()}),`
    }
  }
  return sql.slice(0, sql.length - 1) + ';'
}