function getOSDistribution () {
  let id = 1
  let systemList = ['Max OS', 'Windows', 'iOS']
  let versions = ['10.2.1', '10.2.2', '10.2.3', '10.2.4', '10.2.5', '10.2.6', '10.2.11', '10.2.2']
  let month = moment().format('YYYY-MM')
  let sql = `
  REPLACE INTO \`t_r_system_os\` (\`id\`, \`project_id\`, \`os\`, \`os_version\`, \`total_count\`, \`count_at_month\`, \`city_distribute_id\`, \`create_time\`, \`update_time\`) VALUES`
  for (let system of systemList) {
    for (let version of versions) {
      sql += `
      (${id++}, 1, '${system}', '${version}', ${id * 2 % 10 + 5}, '${month}', ${id}, ${moment().unix()}, ${moment().unix()}),`
    }
  }
  return sql.slice(0, sql.length - 1) + ';'
}