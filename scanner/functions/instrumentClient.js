function instrumentClient(shim, mongodb) {
  shim.recordOperation(mongodb.MongoClient, 'connect', function wrappedConnect(shim, _, __, args) {
    // Add the connection url to the MongoClient to retrieve later in the `lib/instrumentation/mongo/common`
    // captureAttributesOnStarted listener
    this[NR_ATTRS] = args[0]
    return { callback: shim.LAST }
  })
}