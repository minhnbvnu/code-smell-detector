function assertWarnsCount(report, count) {
  assert.equal(
    report.warningCount,
    count,
    `Report must contains ${count} warnings. ${printReport(report)}`
  )
}