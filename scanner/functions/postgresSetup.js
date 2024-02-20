async function postgresSetup() {
    const pg = clientFactory()
    const setupClient = new pg.Client(CON_OBJ)

    await new Promise((resolve, reject) => {
      setupClient.connect(function (err) {
        if (err) {
          reject(err)
        }

        resolve()
      })
    })
    await runCommand(setupClient, "set client_min_messages='warning';") // supress PG notices

    const tableDrop = 'DROP TABLE IF EXISTS ' + TABLE_PREPARED
    await runCommand(setupClient, tableDrop)

    const tableCreate =
      'CREATE TABLE ' + TABLE_PREPARED + ' (' + PK + ' integer PRIMARY KEY, ' + COL + ' text' + ');'
    await runCommand(setupClient, tableCreate)
    setupClient.end()
  }