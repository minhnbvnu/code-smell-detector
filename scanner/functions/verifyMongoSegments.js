function verifyMongoSegments(t, agent, transaction, names) {
  t.ok(agent.getTransaction(), 'should not lose transaction state')
  t.equal(agent.getTransaction().id, transaction.id, 'transaction is correct')

  const segment = agent.tracer.getSegment()
  let current = transaction.trace.root

  for (let i = 0, l = names.length; i < l; ++i) {
    // Filter out net.createConnection segments as they could occur during execution, which is fine
    // but breaks out assertion function
    current.children = current.children.filter((child) => child.name !== 'net.createConnection')
    t.equal(current.children.length, 1, 'should have one child segment')
    current = current.children[0]
    t.equal(current.name, names[i], 'segment should be named ' + names[i])

    // If this is a Mongo operation/statement segment then it should have the
    // datastore instance attributes.
    if (/^Datastore\/.*?\/MongoDB/.test(current.name)) {
      if (isBadSegment(current)) {
        t.comment('Skipping attributes check for ' + current.name)
        continue
      }

      // Commands known as "admin commands" always happen against the "admin"
      // database regardless of the DB the connection is actually connected to.
      // This is apparently by design.
      // https://jira.mongodb.org/browse/NODE-827
      let dbName = common.DB_NAME
      if (/\/renameCollection$/.test(current.name)) {
        dbName = 'admin'
      }

      const attributes = current.getAttributes()
      t.equal(attributes.database_name, dbName, 'should have correct db name')
      t.equal(attributes.host, MONGO_HOST, 'should have correct host name')
      t.equal(attributes.port_path_or_id, MONGO_PORT, 'should have correct port')
      t.equal(attributes.product, 'MongoDB', 'should have correct product attribute')
    }
  }

  // Do not use `t.equal` for this comparison. When it is false tap would dump
  // way too much information to be useful.
  t.ok(current === segment, 'current segment is ' + segment.name)
}