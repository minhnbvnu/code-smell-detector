function processFile(file, config) {
  const report = processStr(fs.readFileSync(file).toString(), config, file)
  report.file = file

  return report
}