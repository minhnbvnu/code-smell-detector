function lineNumberFor(options, i) {
  return String(options.lineNumberFormatter(i + options.firstLineNumber))
}