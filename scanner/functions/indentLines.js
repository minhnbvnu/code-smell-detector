function indentLines (n, lines) {
  return lines.split('\n').map(function (line) {
    return indentLine(n, line)
  }).join('\n')
}