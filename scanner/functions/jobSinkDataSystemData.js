function jobSinkDataSystemData () {
  const sinkDataSystemData = [
    { value: 'oracle', icon: 'icon-amy-db-oracle', style: { lineHeight: '40px' } },
    { value: 'mysql', icon: 'icon-mysql' },
    { value: 'es', icon: 'icon-elastic', style: { fontSize: '24px' } },
    { value: 'hbase', icon: 'icon-hbase1' },
    { value: 'phoenix', text: 'Phoenix' },
    { value: 'kafka', icon: 'icon-kafka', style: { fontSize: '35px' } },
    { value: 'postgresql', icon: 'icon-postgresql', style: { fontSize: '31px' } },
    { value: 'cassandra', icon: 'icon-cass', style: { fontSize: '52px', lineHeight: '60px' } },
    { value: 'mongodb', icon: 'icon-mongodb', style: { fontSize: '26px' } },
    { value: 'vertica', icon: 'icon-vertica', style: { fontSize: '45px' } },
    { value: 'parquet', text: 'Parquet' },
    { value: 'kudu', text: 'Kudu' },
    { value: 'greenplum', text: 'Greenplum' },
    { value: 'clickhouse', text: 'ClickHouse' },
    { value: 'redis', text: 'Redis' }
  ]
  return sinkDataSystemData
}