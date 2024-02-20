function valid_empty(options) {
  return function(node) {
    return options.children(node).length === 0
  }
}