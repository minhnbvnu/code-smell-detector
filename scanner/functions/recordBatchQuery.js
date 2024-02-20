function recordBatchQuery(nodule, properties, querySpec) {
  return _recordQuery.call(this, '/batch', nodule, properties, querySpec)
}