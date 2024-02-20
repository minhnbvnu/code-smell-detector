function get_object(node2) {
    while (node2.type === "MemberExpression")
      node2 = node2.object;
    return node2;
  }