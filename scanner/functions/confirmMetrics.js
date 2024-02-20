function confirmMetrics() {
      const unscopedMetrics = getMetrics(agent).unscoped
      t.ok(unscopedMetrics)

      const otherTransactionAllName = 'OtherTransaction/all'
      const otherTransactionAllMetric = unscopedMetrics[otherTransactionAllName]
      t.ok(otherTransactionAllMetric)
      t.equal(otherTransactionAllMetric.callCount, 1)

      const bgTransactionNameMetric = unscopedMetrics[expectedBgTransactionName]
      t.ok(bgTransactionNameMetric)
      t.equal(bgTransactionNameMetric.callCount, 1)

      const otherTransactionTotalTimeMetric = unscopedMetrics.OtherTransactionTotalTime
      t.ok(otherTransactionTotalTimeMetric)
      t.equal(otherTransactionAllMetric.callCount, 1)

      const otherTotalTimeBgTransactionName = 'OtherTransactionTotalTime/' + expectedTransactionName
      const otherTotalTimeBgTransactionNameMetric = unscopedMetrics[otherTotalTimeBgTransactionName]
      t.ok(otherTotalTimeBgTransactionNameMetric)
      t.equal(otherTotalTimeBgTransactionNameMetric.callCount, 1)

      t.end()
    }