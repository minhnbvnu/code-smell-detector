function makeInit(instrumented) {
  return function setDatastore(agent) {
    testDatastore = shared.getTestDatastore(agent, instrumented)
  }
}