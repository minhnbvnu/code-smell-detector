function mongoTest(name, run) {
  tap.test(name, function testWrap(t) {
    const mongodb = require('mongodb')
    collectionCommon.dropTestCollections(mongodb).then(() => {
      run(t, helper.loadTestAgent(t))
    })
  })
}