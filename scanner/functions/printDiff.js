function printDiff(a, b) {
  if (a == b) {
    return
  }

  var DARK = '\x1b[90m'
  var GREEN = '\x1b[32m'
  var RED = '\x1b[31m'
  var RESET = '\x1b[39m'

  var df = diff.diffLines(a, b)
  var content = fu.map(function (n) {
    var line = df[n]
    if (line.removed) {
      return RED + line.value
    } else if (line.added) {
      return GREEN + line.value
    } else {
      return DARK + line.value
    }
  }, Object.keys(df))
  console.log(content.join(RESET + '\n'), RESET)
}