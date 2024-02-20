function d3_layout_stackReduceSum(d) {
    return d.reduce(d3_layout_stackSum, 0);
  }