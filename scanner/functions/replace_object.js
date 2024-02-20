function replace_object(node2, replacement) {
    if (node2.type === "Identifier")
      return replacement;
    const ancestor = node2;
    let parent;
    while (node2.type === "MemberExpression") {
      parent = node2;
      node2 = node2.object;
    }
    parent.object = replacement;
    return ancestor;
  }