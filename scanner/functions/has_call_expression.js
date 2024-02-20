function has_call_expression(node2) {
    while (node2) {
      if (node2.type[0] === "CallExpression") {
        return true;
      } else if (node2.type === "MemberExpression") {
        node2 = node2.object;
      } else {
        return false;
      }
    }
  }