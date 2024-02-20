function valid_root(options) {
  return function(node) {
    return !options.parent(node)
  }
}