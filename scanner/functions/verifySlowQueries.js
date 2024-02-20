function verifySlowQueries(t, agent) {
    const metricHostName = getMetricHostName(agent, params.postgres_host)

    t.equal(agent.queries.samples.size, 1, 'should have one slow query')
    for (const sample of agent.queries.samples.values()) {
      const queryParams = sample.getParams()

      t.equal(queryParams.host, metricHostName, 'instance data should show up in slow query params')

      t.equal(
        queryParams.port_path_or_id,
        String(params.postgres_port),
        'instance data should show up in slow query params'
      )

      t.equal(
        queryParams.database_name,
        params.postgres_db,
        'database name should show up in slow query params'
      )

      t.ok(queryParams.backtrace, 'params should contain a backtrace')
    }
  }