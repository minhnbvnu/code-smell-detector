function afterVerify() {
        trans.end()
        const expectedMetrics = ['realpath.native']
        t.ok(
          checkMetric(expectedMetrics, agent, trans.name),
          'metric should exist after transaction end'
        )
        t.end()
      }