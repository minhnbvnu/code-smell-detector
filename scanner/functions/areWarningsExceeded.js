function areWarningsExceeded(reports) {
  const warningsCount = reports.reduce((acc, i) => acc + i.warningCount, 0)
  const warningsNumberExceeded =
    program.opts().maxWarnings >= 0 && warningsCount > program.opts().maxWarnings

  return { warningsNumberExceeded, warningsCount }
}