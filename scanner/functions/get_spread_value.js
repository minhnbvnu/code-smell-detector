function get_spread_value(block, attribute) {
    return block ? attribute.expression.manipulate(block) : attribute.expression.node;
  }