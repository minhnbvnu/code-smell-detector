function createPromiseTests(t, config) {
  t.test('maintains context across await', function (t) {
    const { agent } = setupAgent(t, config)
    helper.runInTransaction(agent, async function (txn) {
      let transaction = agent.getTransaction()
      t.equal(transaction && transaction.id, txn.id, 'should start in a transaction')

      await Promise.resolve("i'll be back")

      transaction = agent.getTransaction()
      t.equal(
        transaction && transaction.id,
        txn.id,
        'should resume in the same transaction after await'
      )

      txn.end()
      t.end()
    })
  })

  t.test('maintains context across multiple awaits', async (t) => {
    const { agent } = setupAgent(t, config)
    await helper.runInTransaction(agent, async function (createdTransaction) {
      let transaction = agent.getTransaction()
      t.equal(transaction && transaction.id, createdTransaction.id, 'should start in a transaction')

      await firstFunction()
      transaction = agent.getTransaction()
      t.equal(transaction && transaction.id, createdTransaction.id)

      await secondFunction()
      transaction = agent.getTransaction()
      t.equal(transaction && transaction.id, createdTransaction.id)

      createdTransaction.end()

      async function firstFunction() {
        await childFunction()

        transaction = agent.getTransaction()
        t.equal(transaction && transaction.id, createdTransaction.id)
      }

      async function childFunction() {
        await new Promise((resolve) => {
          transaction = agent.getTransaction()
          t.equal(transaction && transaction.id, createdTransaction.id)

          setTimeout(resolve, 1)
        })
      }

      async function secondFunction() {
        await new Promise((resolve) => {
          setImmediate(resolve)
        })
      }
    })
  })

  t.test('maintains context across promise chain', (t) => {
    const { agent } = setupAgent(t, config)
    helper.runInTransaction(agent, function (createdTransaction) {
      let transaction = agent.getTransaction()
      t.equal(transaction && transaction.id, createdTransaction.id, 'should start in a transaction')
      firstFunction()
        .then(() => {
          transaction = agent.getTransaction()
          t.equal(transaction && transaction.id, createdTransaction.id)
          return secondFunction()
        })
        .then(() => {
          transaction = agent.getTransaction()
          t.equal(transaction && transaction.id, createdTransaction.id)
          createdTransaction.end()
          t.end()
        })

      function firstFunction() {
        return childFunction()
      }

      function childFunction() {
        return new Promise((resolve) => {
          transaction = agent.getTransaction()
          t.equal(transaction && transaction.id, createdTransaction.id)

          setTimeout(resolve, 1)
        })
      }

      function secondFunction() {
        return new Promise((resolve) => {
          setImmediate(resolve)
        })
      }
    })
  })

  t.test('does not crash on multiple resolve calls', function (t) {
    const { agent } = setupAgent(t, config)
    helper.runInTransaction(agent, function () {
      t.doesNotThrow(function () {
        new Promise(function (res) {
          res()
          res()
        }).then(t.end)
      })
    })
  })

  t.test('restores context in inactive transactions', function (t) {
    const { agent, contextManager } = setupAgent(t, config)

    helper.runInTransaction(agent, function (txn) {
      const res = new TestResource(1)
      const root = contextManager.getContext()
      txn.end()
      res.doStuff(function () {
        t.equal(
          contextManager.getContext(),
          root,
          'should restore a segment when its transaction has been ended'
        )
        t.end()
      })
    })
  })

  t.test('handles multi-entry callbacks correctly', function (t) {
    const { agent, contextManager } = setupAgent(t, config)

    helper.runInTransaction(agent, function () {
      const root = contextManager.getContext()

      const aSeg = agent.tracer.createSegment('A')
      contextManager.setContext(aSeg)

      const resA = new TestResource(1)

      const bSeg = agent.tracer.createSegment('B')
      contextManager.setContext(bSeg)
      const resB = new TestResource(2)

      contextManager.setContext(root)

      resA.doStuff(() => {
        t.equal(
          contextManager.getContext().name,
          aSeg.name,
          'runInAsyncScope should restore the segment active when a resource was made'
        )

        resB.doStuff(() => {
          t.equal(
            contextManager.getContext().name,
            bSeg.name,
            'runInAsyncScope should restore the segment active when a resource was made'
          )

          t.end()
        })
        t.equal(
          contextManager.getContext().name,
          aSeg.name,
          'runInAsyncScope should restore the segment active when a callback was called'
        )
      })
      t.equal(
        contextManager.getContext().name,
        root.name,
        'root should be restored after we are finished'
      )
      resA.doStuff(() => {
        t.equal(
          contextManager.getContext().name,
          aSeg.name,
          'runInAsyncScope should restore the segment active when a resource was made'
        )
      })
    })
  })

  t.test('maintains transaction context over setImmediate in-context', (t) => {
    const { agent } = setupAgent(t, config)

    helper.runInTransaction(agent, function (txn) {
      t.ok(txn, 'transaction should not be null')

      const segment = txn.trace.root
      agent.tracer.bindFunction(function one() {
        return new Promise(executor).then(() => {
          const tx = agent.getTransaction()
          t.equal(tx ? tx.id : null, txn.id)
          t.end()
        })
      }, segment)()

      const wrapperTwo = agent.tracer.bindFunction(function () {
        return two()
      }, segment)
      const wrapperThree = agent.tracer.bindFunction(function () {
        return three()
      }, segment)

      function executor(resolve) {
        setImmediate(() => {
          next().then(() => {
            const tx = agent.getTransaction()
            t.equal(tx ? tx.id : null, txn.id)
            resolve()
          })
        })
      }

      function next() {
        return Promise.resolve(wrapperTwo())
      }

      function two() {
        return nextTwo()
      }

      function nextTwo() {
        return Promise.resolve(wrapperThree())
      }

      function three() {}
    })
  })

  t.test('maintains transaction context over process.nextTick in-context', (t) => {
    const { agent } = setupAgent(t, config)

    helper.runInTransaction(agent, function (txn) {
      t.ok(txn, 'transaction should not be null')

      const segment = txn.trace.root
      agent.tracer.bindFunction(function one() {
        return new Promise(executor).then(() => {
          const tx = agent.getTransaction()
          t.equal(tx ? tx.id : null, txn.id)
          t.end()
        })
      }, segment)()

      const wrapperTwo = agent.tracer.bindFunction(function () {
        return two()
      }, segment)
      const wrapperThree = agent.tracer.bindFunction(function () {
        return three()
      }, segment)

      function executor(resolve) {
        process.nextTick(() => {
          next().then(() => {
            const tx = agent.getTransaction()
            t.equal(tx ? tx.id : null, txn.id)
            resolve()
          })
        })
      }

      function next() {
        return Promise.resolve(wrapperTwo())
      }

      function two() {
        return nextTwo()
      }

      function nextTwo() {
        return Promise.resolve(wrapperThree())
      }

      function three() {}
    })
  })

  t.test('maintains transaction context over setTimeout in-context', (t) => {
    const { agent } = setupAgent(t, config)

    helper.runInTransaction(agent, function (txn) {
      t.ok(txn, 'transaction should not be null')

      const segment = txn.trace.root
      agent.tracer.bindFunction(function one() {
        return new Promise(executor).then(() => {
          const tx = agent.getTransaction()
          t.equal(tx ? tx.id : null, txn.id)
          t.end()
        })
      }, segment)()

      const wrapperTwo = agent.tracer.bindFunction(function () {
        return two()
      }, segment)
      const wrapperThree = agent.tracer.bindFunction(function () {
        return three()
      }, segment)

      function executor(resolve) {
        setTimeout(() => {
          next().then(() => {
            const tx = agent.getTransaction()
            t.equal(tx ? tx.id : null, txn.id)
            resolve()
          })
        }, 1)
      }

      function next() {
        return Promise.resolve(wrapperTwo())
      }

      function two() {
        return nextTwo()
      }

      function nextTwo() {
        return Promise.resolve(wrapperThree())
      }

      function three() {}
    })
  })

  t.test('maintains transaction context over setInterval in-context', (t) => {
    const { agent } = setupAgent(t, config)

    helper.runInTransaction(agent, function (txn) {
      t.ok(txn, 'transaction should not be null')

      const segment = txn.trace.root
      agent.tracer.bindFunction(function one() {
        return new Promise(executor).then(() => {
          const tx = agent.getTransaction()
          t.equal(tx ? tx.id : null, txn.id)
          t.end()
        })
      }, segment)()

      const wrapperTwo = agent.tracer.bindFunction(function () {
        return two()
      }, segment)
      const wrapperThree = agent.tracer.bindFunction(function () {
        return three()
      }, segment)

      function executor(resolve) {
        const ref = setInterval(() => {
          clearInterval(ref)

          next().then(() => {
            const tx = agent.getTransaction()
            t.equal(tx ? tx.id : null, txn.id)
            resolve()
          })
        }, 1)
      }

      function next() {
        return Promise.resolve(wrapperTwo())
      }

      function two() {
        return nextTwo()
      }

      function nextTwo() {
        return Promise.resolve(wrapperThree())
      }

      function three() {}
    })
  })
}