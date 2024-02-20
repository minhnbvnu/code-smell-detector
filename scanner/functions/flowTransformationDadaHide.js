function flowTransformationDadaHide () {
  const transformData = [
    { value: 'mysql', icon: 'icon-mysql' },
    { value: 'oracle', icon: 'icon-amy-db-oracle' },
    { value: 'postgresql', icon: 'icon-postgresql', style: { fontSize: '31px' } },
    { value: 'cassandra', icon: 'icon-cass', style: { fontSize: '52px', lineHeight: '60px' } },
    { value: 'mongodb', icon: 'icon-mongodb', style: { fontSize: '26px' } },
    { value: 'phoenix', text: 'Phoenix' },
    { value: 'es', icon: 'icon-elastic', style: { fontSize: '24px' } },
    { value: 'greenplum', text: 'Greenplum' },
    { value: 'kudu', text: 'Kudu' },
    { value: 'clickhouse', text: 'ClickHouse' }
  ]
  return transformData
}