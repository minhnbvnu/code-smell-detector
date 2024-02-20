function assertNoErrors(report) {
  assert.equal(report.errorCount, 0, `Report must not contain errors. ${printReport(report)}`)
}