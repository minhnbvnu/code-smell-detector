function printReports(reports, formatter) {
  const warnings = areWarningsExceeded(reports)
  let finalMessage = ''
  let exitWithOne = false
  if (
    program.opts().maxWarnings &&
    reports &&
    reports.length > 0 &&
    warnings.warningsNumberExceeded
  ) {
    if (!reports[0].errorCount) {
      finalMessage = `Solhint found more warnings than the maximum specified (maximum: ${
        program.opts().maxWarnings
      }, found: ${warnings.warningsCount})`
      exitWithOne = true
    } else {
      finalMessage =
        'Error/s found on rules! [max-warnings] param is ignored. Fixing errors enables max-warnings'
    }
  }

  const fullReport = formatter(reports) + (finalMessage || '')
  console.log(fullReport)

  if (program.opts().save) {
    writeStringToFile(fullReport)
  }

  if (exitWithOne) process.exit(1)
  return reports
}