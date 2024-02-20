function checkCallMetrics(t, testMetrics) {
  // Tap also creates promises, so these counts don't quite match the tests.
  const TAP_COUNT = 1

  t.equal(testMetrics.initCalled - TAP_COUNT, 2, 'two promises were created')
  t.equal(testMetrics.beforeCalled, 1, 'before hook called for all async promises')
  t.equal(
    testMetrics.beforeCalled,
    testMetrics.afterCalled,
    'before should be called as many times as after'
  )

  if (global.gc) {
    global.gc()
    return setTimeout(function () {
      t.equal(
        testMetrics.initCalled - TAP_COUNT,
        testMetrics.destroyCalled,
        'all promises created were destroyed'
      )
      t.end()
    }, 10)
  }
  t.end()
}