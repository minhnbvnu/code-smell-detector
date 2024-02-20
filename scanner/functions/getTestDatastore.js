function getTestDatastore(agent, instrumented) {
  const testDatastore = new TestDatastore()
  if (instrumented) {
    const shim = new DatastoreShim(agent, 'Test', 'Test')
    shim.setDatastore('test')
    shim.setParser((query) => {
      return {
        collection: 'test',
        operation: 'test',
        query: query
      }
    })

    shim.recordOperation(testDatastore, 'testOp', {
      name: 'testOp',
      callback: shim.LAST
    })

    shim.recordQuery(testDatastore, 'testQuery', {
      name: 'testQuery',
      callback: shim.LAST
    })

    shim.recordBatchQuery(testDatastore, 'testBatch', {
      name: 'testBatch',
      callback: shim.LAST
    })
  }
  return testDatastore
}