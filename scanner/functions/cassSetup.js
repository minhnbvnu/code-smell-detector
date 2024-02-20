async function cassSetup(runTest) {
  const setupClient = new cassandra.Client({
    contactPoints: [params.cassandra_host],
    protocolOptions: params.cassandra_port,
    localDataCenter: 'datacenter1'
  })

  function runCommand(cmd) {
    return new Promise((resolve, reject) => {
      setupClient.execute(cmd, function (err) {
        if (err) {
          reject(err)
        }

        resolve()
      })
    })
  }

  const ksDrop = 'DROP KEYSPACE IF EXISTS ' + KS + ';'
  await runCommand(ksDrop)

  let ksCreate = 'CREATE KEYSPACE ' + KS + ' WITH replication = '
  ksCreate += "{'class': 'SimpleStrategy', 'replication_factor': 1};"

  await runCommand(ksCreate)

  let famCreate = 'CREATE TABLE ' + KS + '.' + FAM + ' (' + PK + ' int PRIMARY KEY, '
  famCreate += COL + ' varchar );'

  await runCommand(famCreate)

  setupClient.shutdown()
  runTest()
}