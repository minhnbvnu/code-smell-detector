function parseInput(inputStr) {
  try {
    // first we try to parse the string as we normally do
    return parser.parse(inputStr, { loc: true, range: true })
  } catch (e) {
    // using 'loc' may throw when inputStr is empty or only has comments
    return parser.parse(inputStr, {})
  }
}