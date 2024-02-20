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