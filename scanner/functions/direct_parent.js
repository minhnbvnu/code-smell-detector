function direct_parent(node, next, subj) {
    node = options.parent(node)

    return node && next(node, subj) ? node : null
  }