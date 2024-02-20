function getNewUser () {
  let id = 1
  let count = [50, 6, 3, 10, 100]
  let sql = `REPLACE INTO \`t_r_new_user_summary\` (\`id\`, \`project_id\`, \`total_count\`, \`count_at_time\`, \`count_type\`, \`city_distribute_id\`, \`create_time\`, \`update_time\`) VALUES`
  for (let hour = moment().startOf('day').unix(); hour <= moment().endOf('day').unix(); hour += 3600) {
    sql += `
    (${id++}, 1, ${count[id % count.length]}, '${moment.unix(hour).format('YYYY-MM-DD_HH')}', 'hour', ${id}, ${hour}, ${hour}),`
  }
  return sql.slice(0, sql.length - 1) + ';'
}