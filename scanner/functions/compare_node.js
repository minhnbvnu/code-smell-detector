function compare_node(a, b2) {
    if (a === b2)
      return true;
    if (!a || !b2)
      return false;
    if (a.type !== b2.type)
      return false;
    switch (a.type) {
      case "Identifier":
        return a.name === b2.name;
      case "MemberExpression":
        return compare_node(a.object, b2.object) && compare_node(a.property, b2.property) && a.computed === b2.computed;
      case "Literal":
        return a.value === b2.value;
    }
  }