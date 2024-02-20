async function createTable(mysql, user, db, table) {
  const client = mysql.createConnection({
    host: params.mysql_host,
    port: params.mysql_port,
    user: user,
    database: db
  })

  await runCommand(
    client,
    [
      `CREATE TABLE IF NOT EXISTS ${table} (`,
      '  `id`         INTEGER(10) PRIMARY KEY AUTO_INCREMENT,',
      '  `test_value` VARCHAR(255)',
      ')'
    ].join('\n')
  )

  await runCommand(client, `TRUNCATE TABLE ${table}`)
  await runCommand(client, `INSERT INTO ${table} (test_value) VALUE ("hamburgefontstiv")`)
  client.end()
}