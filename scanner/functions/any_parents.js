function any_parents(node, next, subj) {
    do {
      node = options.parent(node)
    } while(node && !next(node, subj))

    return node
  }