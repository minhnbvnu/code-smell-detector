async function createDb(mysql, user, db) {
  const client = mysql.createConnection({
    host: params.mysql_host,
    port: params.mysql_port,
    user: 'root',
    database: 'mysql'
  })

  await runCommand(client, `CREATE USER ${user}`)
  await runCommand(client, `GRANT ALL ON *.* TO ${user}`)
  await runCommand(client, `CREATE DATABASE IF NOT EXISTS ${db}`)
  client.end()
}