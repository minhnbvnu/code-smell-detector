function assertErrorCount(report, count) {
  assert.equal(
    report.errorCount,
    count,
    `Report must contains ${count} errors. ${printReport(report)}`
  )
}