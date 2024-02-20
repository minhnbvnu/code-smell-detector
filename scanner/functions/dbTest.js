function dbTest(name, run) {
  mongoTest(name, function init(t, agent) {
    const LOCALHOST = agent.config.getHostnameSafe()
    const domainPath = common.getDomainSocketPath()
    const mongodb = require('mongodb')
    let db = null
    let client = null

    t.autoend()

    t.test('remote connection', function (t) {
      t.autoend()
      t.beforeEach(async function () {
        // mongo >= 3.6.9 fails if you try to create an existing collection
        // drop before executing tests
        if (name === 'createCollection') {
          await collectionCommon.dropTestCollections(mongodb)
        }
        MONGO_HOST = common.getHostName(agent)
        MONGO_PORT = common.getPort()

        const res = await common.connect(mongodb)
        client = res.client
        db = res.db
      })

      t.afterEach(function () {
        return common.close(client, db)
      })

      t.test('without transaction', function (t) {
        run(t, db, function () {
          t.notOk(agent.getTransaction(), 'should not have transaction')
          t.end()
        })
      })

      t.test('with transaction', function (t) {
        t.notOk(agent.getTransaction(), 'should not have transaction')
        helper.runInTransaction(agent, function (transaction) {
          run(t, db, function (names) {
            verifyMongoSegments(t, agent, transaction, names)
            transaction.end()
            t.end()
          })
        })
      })
    })

    // The domain socket tests should only be run if there is a domain socket
    // to connect to, which only happens if there is a Mongo instance running on
    // the same box as these tests.
    const shouldTestDomain = domainPath

    t.test('domain socket', { skip: !shouldTestDomain }, function (t) {
      t.autoend()
      t.beforeEach(async function () {
        // mongo >= 3.6.9 fails if you try to create an existing collection
        // drop before executing tests
        if (name === 'createCollection') {
          await collectionCommon.dropTestCollections(mongodb)
        }
        MONGO_HOST = LOCALHOST
        MONGO_PORT = domainPath

        const res = await common.connect(mongodb, domainPath)
        client = res.client
        db = res.db
      })

      t.afterEach(function () {
        return common.close(client, db)
      })

      t.test('with transaction', function (t) {
        t.notOk(agent.getTransaction(), 'should not have transaction')
        helper.runInTransaction(agent, function (transaction) {
          run(t, db, function (names) {
            verifyMongoSegments(t, agent, transaction, names)
            transaction.end()
            t.end()
          })
        })
      })
    })
  })
}