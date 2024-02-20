function gather_possible_values(node2, set) {
    if (node2.type === "Literal") {
      set.add(node2.value);
    } else if (node2.type === "ConditionalExpression") {
      gather_possible_values(node2.consequent, set);
      gather_possible_values(node2.alternate, set);
    } else {
      set.add(UNKNOWN);
    }
  }