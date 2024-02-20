function createStatusCodeTest(testCase) {
  return (statusCodeTest) => {
    let startEndpoints = null
    let restartEndpoints = null
    let shutdown = null
    let testClock = null

    let disconnected = false
    let connecting = false
    let started = false

    let agent = null

    statusCodeTest.beforeEach(async () => {
      nock.disableNetConnect()

      testClock = sinon.useFakeTimers({
        toFake: ['setTimeout', 'setInterval', 'Date', 'clearInterval']
      })

      startEndpoints = setupConnectionEndpoints()
      disconnected = false
      connecting = false
      started = false

      agent = helper.loadMockedAgent({
        license_key: 'license key here',
        apdex_t: Number.MIN_VALUE, // force transaction traces
        host: TEST_DOMAIN,
        plugins: {
          // turn off native metrics to avoid unwanted gc metrics
          native_metrics: { enabled: false }
        },
        distributed_tracing: { enabled: true },
        slow_sql: { enabled: true },
        transaction_tracer: {
          record_sql: 'obfuscated',
          explain_threshold: Number.MIN_VALUE // force SQL traces
        }
      })

      // We don't want any harvests before our manually triggered harvest
      agent.config.no_immediate_harvest = true

      await new Promise((resolve) => {
        createTestData(agent, resolve)
      })
    })

    statusCodeTest.afterEach(() => {
      helper.unloadAgent(agent)
      agent = null
      testClock.restore()
      testClock = null
      startEndpoints = null
      restartEndpoints = null
      shutdown = null

      if (!nock.isDone()) {
        // eslint-disable-next-line no-console
        console.error('Cleaning pending mocks: %j', nock.pendingMocks())
        nock.cleanAll()
      }

      nock.enableNetConnect()
    })

    // Test behavior for this status code against every endpoint
    // since not all business logic is shared for each.
    const endpointNames = Object.keys(endpointDataChecks)
    statusCodeTest.plan(endpointNames.length)

    endpointNames.forEach((endpointName) => {
      const checkHasTestData = endpointDataChecks[endpointName]
      const test = createReponseHandlingTest(endpointName, checkHasTestData)

      statusCodeTest.test(endpointName, test)
    })

    function createReponseHandlingTest(endpointName, checkHasTestData) {
      return (subTest) => {
        const mockEndpoint = nockRequest(endpointName, RUN_ID).reply(testCase.code)

        agent.start((error) => {
          verifyAgentStart(error)

          // Watch state changes once agent already started
          agent.on('disconnected', () => {
            disconnected = true
          })

          agent.on('connecting', () => {
            connecting = true
          })

          agent.on('started', () => {
            started = true
          })

          if (testCase.restart) {
            restartEndpoints = setupConnectionEndpoints()
          }

          if (testCase.disconnect) {
            shutdown = nockRequest('shutdown', RUN_ID).reply(200)
          }

          subTest.notOk(
            mockEndpoint.isDone(),
            `${endpointName} should not have been called yet. ` +
              'An early invocation may indicate a race condition with the test or agent.'
          )

          // Move clock forward to trigger auto harvests.
          testClock.tick(60000)

          whenAllAggregatorsSend(agent).then(() => {
            subTest.ok(mockEndpoint.isDone(), `called ${endpointName} endpoint`)

            verifyRunBehavior()
            verifyDataRetention()

            subTest.end()
          })
        })

        function verifyAgentStart(error) {
          if (error) {
            throw error
          }

          subTest.ok(startEndpoints.preconnect.isDone(), 'requested preconnect')
          subTest.ok(startEndpoints.connect.isDone(), 'requested connect')
          subTest.ok(startEndpoints.settings.isDone(), 'requested settings')
        }

        function verifyRunBehavior() {
          if (testCase.disconnect) {
            subTest.ok(disconnected, 'should have disconnected')
            subTest.notOk(connecting, 'should not have reconnected')

            subTest.ok(shutdown.isDone(), 'requested shutdown')
          } else if (testCase.restart) {
            subTest.ok(disconnected, 'should have disconnected')
            subTest.ok(connecting, 'should have started reconnecting')
            subTest.ok(started, 'should have set agent to started')

            subTest.ok(restartEndpoints.preconnect.isDone(), 'requested preconnect')
            subTest.ok(restartEndpoints.connect.isDone(), 'requested connect')
            subTest.ok(restartEndpoints.settings.isDone(), 'requested settings')
          } else {
            subTest.notOk(disconnected, 'should not have disconnected')
            subTest.notOk(connecting, 'should not have reconnected')
          }
        }

        function verifyDataRetention() {
          const hasDataPostHarvest = checkHasTestData(agent)
          if (testCase.retain_data) {
            subTest.ok(hasDataPostHarvest, `should have retained data after ${endpointName} call`)
          } else {
            subTest.notOk(
              hasDataPostHarvest,
              `should not have retained data after ${endpointName} call`
            )
          }
        }
      }
    }
  }
}