function runUnitTests(specification = {}, suiteName = '') {
    const {
      suites = {},
      logs = [],
      tests = {},
      afterAlls = [],
      beforeAlls = [],
      afterEachs = [],
      beforeEachs = [],
      skipped,
      only,
      ancestorSuites = [],
    } = specification

    // if there are suites with `only`
    const suiteContainsOnly = Object.keys(suites).some(
      name => suites[name].only
    )

    return SerialPromise(
      Object.keys(suites).map(suite => {
        if (suiteName) {
          suites[suite].ancestorSuites = ancestorSuites.concat([suiteName])
        }
        if (logs && !suites[suite].logs) {
          suites[suite].logs = logs
        }
        if (skipped) {
          suites[suite].skipped = true
          return () => Promise.resolve()
        }
        if (suiteContainsOnly && !suites[suite].only) {
          return () => Promise.resolve()
        }
        if (only) {
          suites[suite].only = true
        }
        return () => runUnitTests(suites[suite], suite)
      })
    )
      .then(() => {
        // if there are tests with `only`
        const containsOnly = Object.keys(tests).some(name => tests[name].only)
        let alreadyPutLogs = false

        return SerialPromise(
          [() => Promise.all(beforeAlls.map(x => x()))]
            .concat(
              Object.keys(tests).map(name => {
                const test = tests[name]
                if (containsOnly && !test.only) {
                  // there are tests with `only` and it's not this one so skip
                  return () => Promise.resolve()
                }
                if (only) {
                  test.only = true
                }
                if (suiteName) {
                  test.ancestorSuites = ancestorSuites.concat([suiteName])
                }

                if (skipped || test.skipped) {
                  // only push the logs once per suite
                  const logsToStore = !alreadyPutLogs ? logs : []
                  alreadyPutLogs = true
                  testResults.push({
                    name,
                    type: 'skipped',
                    only: test.only,
                    ancestorSuites: test.ancestorSuites,
                    logs: logsToStore,
                  })
                  return () => Promise.resolve()
                }

                return () =>
                  Promise.all(beforeEachs.map(x => x()))
                    .then(() => {
                      expect.resetAssertionsLocalState()

                      return test(
                        context,
                        sketch.fromNative(MSDocumentData.new())
                      )
                    })
                    .then(() => {
                      const assertionError = expect.extractExpectedAssertionsErrors()

                      if (assertionError) {
                        throw assertionError.error
                      }
                    })
                    .then(() => {
                      const logsToStore = !alreadyPutLogs ? logs : []
                      alreadyPutLogs = true
                      testResults.push({
                        name,
                        type: 'passed',
                        only: test.only,
                        ancestorSuites: test.ancestorSuites,
                        logs: logsToStore,
                      })
                    })
                    .catch(err => {
                      const logsToStore = !alreadyPutLogs ? logs : []
                      alreadyPutLogs = true
                      testResults.push({
                        name,
                        only: test.only,
                        type: 'failed',
                        reason: getTestFailure(err),
                        ancestorSuites: test.ancestorSuites,
                        logs: logsToStore,
                      })
                    })
                    .then(() => Promise.all(afterEachs.map(x => x())))
              })
            )
            .concat(() => Promise.all(afterAlls.map(x => x())))
        ).catch(err => {
          const logsToStore = !alreadyPutLogs ? logs : []
          alreadyPutLogs = true
          testResults.push({
            name: suiteName,
            type: 'failed',
            reason: getTestFailure(err),
            ancestorSuites,
            logs: logsToStore,
          })
        })
      })
      .then(() => testResults)
  }