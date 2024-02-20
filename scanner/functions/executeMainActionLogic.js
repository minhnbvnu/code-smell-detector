function executeMainActionLogic() {
  if (program.opts().init) {
    writeSampleConfigFile()
  }

  let formatterFn
  try {
    // to check if is a valid formatter before execute linter
    formatterFn = getFormatter(program.opts().formatter)
  } catch (ex) {
    console.error(ex.message)
    process.exit(1)
  }

  const reportLists = program.args.filter(_.isString).map(processPath)
  const reports = _.flatten(reportLists)

  if (program.opts().fix) {
    for (const report of reports) {
      const inputSrc = fs.readFileSync(report.filePath).toString()

      const fixes = _(report.reports)
        .filter((x) => x.fix)
        .map((x) => x.fix(ruleFixer))
        .sort((a, b) => a.range[0] - b.range[0])
        .value()

      const { fixed, output } = applyFixes(fixes, inputSrc)
      if (fixed) {
        report.reports.forEach((report) => {
          if (report.fix !== null) {
            report.message = `[FIXED] - ${report.message}`
          }
        })
        try {
          fs.writeFileSync(report.filePath, output)
        } catch (error) {
          console.error('An error occurred while writing the file:', error)
        }
      }
    }
  }

  if (program.opts().quiet) {
    // filter the list of reports, to set errors only.
    reports.forEach((reporter) => {
      reporter.reports = reporter.reports.filter((i) => i.severity === 2)
    })
  }

  printReports(reports, formatterFn)

  exitWithCode(reports)
}