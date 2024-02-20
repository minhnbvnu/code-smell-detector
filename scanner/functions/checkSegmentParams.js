function checkSegmentParams(t, segment) {
  let dbName = common.DB_NAME
  if (/\/rename$/.test(segment.name)) {
    dbName = 'admin'
  }

  const attributes = segment.getAttributes()
  t.equal(attributes.database_name, dbName, 'should have correct db name')
  t.equal(attributes.host, METRIC_HOST_NAME, 'should have correct host name')
  t.equal(attributes.port_path_or_id, METRIC_HOST_PORT, 'should have correct port')
}