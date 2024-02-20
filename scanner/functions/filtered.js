function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector)
  }