function instrumentMongoClient(shim, MongoClient) {
  shim.recordOperation(MongoClient.prototype, 'connect', wrapConnect)
}