function exitWithCode(reports) {
  const errorsCount = reports.reduce((acc, i) => acc + i.errorCount, 0)
  process.exit(errorsCount > 0 ? 1 : 0)
}