function d3_layout_treeSeparation(a, b) {
    return a.parent == b.parent ? 1 : 2;
  }