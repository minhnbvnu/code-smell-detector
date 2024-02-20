function assertNoWarnings(report) {
  assert.equal(report.warningCount, 0, `Report must not contain warnings. ${printReport(report)}`)
}