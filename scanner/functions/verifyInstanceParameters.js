function verifyInstanceParameters(t, segment) {
    const transaction = segment.transaction
    const agent = transaction.agent
    const trace = transaction.trace

    const setSegment = findSegment(trace.root, 'Datastore/statement/Postgres/' + TABLE + '/insert')
    const attributes = setSegment.getAttributes()

    const metricHostName = getMetricHostName(agent, params.postgres_host)
    t.equal(attributes.host, metricHostName, 'should add the host parameter')
    t.equal(
      attributes.port_path_or_id,
      String(params.postgres_port),
      'should add the port parameter'
    )
    t.equal(attributes.database_name, params.postgres_db, 'should add the database name parameter')
    t.equal(attributes.product, 'Postgres', 'should add the product attribute')
  }