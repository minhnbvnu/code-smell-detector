function assertLineNumber(report, line) {
  assert.equal(report.line, line, `Report must be in line ${line}.`)
}