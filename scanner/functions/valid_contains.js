function valid_contains(options, contents) {
  return function(node) {
    return options.contents(node).indexOf(contents) !== -1
  }
}