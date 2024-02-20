function showSinkConfigMsg (value) {
  let sinkConfigMsgTemp = ''
  if (value === 'cassandra') {
    sinkConfigMsgTemp = 'For example: {"mutation_type":"iud"}'
  } else if (value === 'mysql' || value === 'oracle' || value === 'postgresql' || value === 'kudu') {
    sinkConfigMsgTemp = 'For example: {"mutation_type":"iud"}'
  } else if (value === 'es') {
    sinkConfigMsgTemp = 'For example: {"mutation_type":"iud", "_id": "id,name"}'
  } else if (value === 'hbase') {
    const temp = "'_'"
    sinkConfigMsgTemp = `For example: {"mutation_type":"iud","hbase.columnFamily":"cf","hbase.saveAsString": true, "hbase.rowKey":"hash(id1)+${temp}+value(id2)"}`
  } else if (value === 'mongodb') {
    sinkConfigMsgTemp = 'For example: {"mutation_type":"iud", "_id": "id,name"}'
  } else {
    sinkConfigMsgTemp = ''
  }
  return sinkConfigMsgTemp
}