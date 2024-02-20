function segmentsDisabledTests(t, agent, Promise, doSomeWork) {
  const tracer = agent.tracer

  t.test('no segments: child segment is created inside then handler', function (t) {
    agent.once('transactionFinished', function (tx) {
      t.equal(tx.trace.root.children.length, 2)

      t.assertSegments(tx.trace.root, ['doSomeWork', 'someChildSegment'])

      t.end()
    })

    helper.runInTransaction(agent, function transactionWrapper(transaction) {
      doSomeWork('doSomeWork').then(function () {
        const childSegment = tracer.createSegment('someChildSegment')
        // touch the segment, so that it is not truncated
        childSegment.touch()
        tracer.bindFunction(function () {}, childSegment)
        process.nextTick(transaction.end.bind(transaction))
      })
    })
  })

  t.test('no segments: then handler that returns a new promise', function (t) {
    agent.once('transactionFinished', function (tx) {
      t.equal(tx.trace.root.children.length, 1)

      t.assertSegments(tx.trace.root, ['doWork1'])

      t.end()
    })

    helper.runInTransaction(agent, function transactionWrapper(transaction) {
      doSomeWork('doWork1')
        .then(function firstThen() {
          return new Promise(function secondChain(res) {
            res()
          })
        })
        .then(function secondThen() {
          process.nextTick(transaction.end.bind(transaction))
        })
    })
  })

  t.test('no segments: then handler that returns a value', function (t) {
    agent.once('transactionFinished', function (tx) {
      t.equal(tx.trace.root.children.length, 1)

      t.assertSegments(tx.trace.root, ['doWork1'])

      t.end()
    })

    helper.runInTransaction(agent, function transactionWrapper(transaction) {
      doSomeWork('doWork1')
        .then(function firstThen() {
          return 'some value'
        })
        .then(function secondThen() {
          process.nextTick(transaction.end.bind(transaction))
        })
    })
  })

  t.test('no segments: catch handler with error from original promise', function (t) {
    agent.once('transactionFinished', function (tx) {
      t.equal(tx.trace.root.children.length, 1)

      t.assertSegments(tx.trace.root, ['doWork1'])

      t.end()
    })

    helper.runInTransaction(agent, function transactionWrapper(transaction) {
      doSomeWork('doWork1', true)
        .then(function firstThen() {
          return 'some value'
        })
        .catch(function catchHandler() {
          process.nextTick(transaction.end.bind(transaction))
        })
    })
  })

  t.test('no segments: catch handler with error from subsequent promise', function (t) {
    agent.once('transactionFinished', function (tx) {
      t.equal(tx.trace.root.children.length, 2)

      t.assertSegments(tx.trace.root, ['doWork1', 'doWork2'])

      t.end()
    })

    helper.runInTransaction(agent, function transactionWrapper(transaction) {
      doSomeWork('doWork1')
        .then(function firstThen() {
          return doSomeWork('doWork2', true)
        })
        .then(function secondThen() {})
        .catch(function catchHandler() {
          process.nextTick(transaction.end.bind(transaction))
        })
    })
  })

  t.test('no segments: when promise is created beforehand', function (t) {
    agent.once('transactionFinished', function (tx) {
      t.equal(tx.trace.root.children.length, 1)

      t.assertSegments(tx.trace.root, ['doSomeWork'], true)

      t.end()
    })

    helper.runInTransaction(agent, function transactionWrapper(transaction) {
      let resolve
      const p = new Promise(function startSomeWork(r) {
        resolve = r
      })

      const segment = tracer.createSegment('doSomeWork')
      resolve = tracer.bindFunction(resolve, segment)

      p.then(function myThen() {
        segment.touch()
        process.nextTick(transaction.end.bind(transaction))
      })

      // Simulate call that resolves the promise, but its segment is created
      // after the promise is created.
      resolve()
    })
  })
}