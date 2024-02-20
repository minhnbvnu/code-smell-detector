function processStdin(options) {
  const STDIN_FILE = options.filename || 0
  const stdinBuffer = fs.readFileSync(STDIN_FILE)
  const report = processStr(stdinBuffer.toString())
  report.file = options.filename || 'stdin'

  let formatterFn
  try {
    // to check if is a valid formatter before execute linter
    formatterFn = getFormatter(program.opts().formatter)
  } catch (ex) {
    console.error(ex.message)
    process.exit(1)
  }

  const reports = [report]

  printReports(reports, formatterFn)

  exitWithCode(reports)
}