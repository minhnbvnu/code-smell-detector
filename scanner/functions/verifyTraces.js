function verifyTraces(t, agent, transaction) {
  const host = getMetricHostName(agent, params.postgres_host)
  const trace = transaction.trace
  t.ok(trace, 'trace should exist')
  t.ok(trace.root, 'root element should exist')

  t.assertSegments(trace.root, [findMany, update, update, findMany], { exact: true })
  const findManySegment = findSegment(trace.root, findMany)
  t.ok(findManySegment.timer.hrDuration, 'findMany segment should have ended')
  const updateSegment = findSegment(trace.root, update)
  t.ok(updateSegment.timer.hrDuration, 'update segment should have ended')
  for (const segment of [findManySegment, updateSegment]) {
    const attributes = segment.getAttributes()
    const name = segment.name
    t.equal(attributes.host, host, `host of segment ${name} should equal ${host}`)
    t.equal(
      attributes.database_name,
      params.postgres_db,
      `database name of segment ${name} should be ${params.postgres_db}`
    )
    t.equal(
      attributes.port_path_or_id,
      params.postgres_prisma_port.toString(),
      `port of segment ${name} should be ${params.postgres_prisma_port}`
    )
  }
}