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