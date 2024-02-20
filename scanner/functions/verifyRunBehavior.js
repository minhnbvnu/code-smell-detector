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