function valid_first_child(options) {
  return function(node) {
    return options.children(options.parent(node))[0] === node
  }
}