function getAlarmLog () {
  let id = 1
  let sql = `REPLACE INTO \`t_r_alarm_log\` (\`id\`, \`project_id\`, \`config_id\`, \`send_at\`, \`error_type\`, \`error_name\`, \`message\`, \`create_time\`, \`update_time\`) VALUES`
  let timeAt = moment().startOf('day').unix()
  for (let count = 1; count <= 20; count++) {
    let index = 1
    for (let errorName of errorNameList) {
      sql += `
      (${id++}, 1, ${index++}, ${timeAt}, '8', '${errorName}', 'alarm message', ${timeAt}, ${timeAt}),`
      timeAt += 500
    }
  }
  return sql.slice(0, sql.length - 1) + ';'
}