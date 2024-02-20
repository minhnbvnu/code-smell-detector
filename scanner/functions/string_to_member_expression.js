function string_to_member_expression(name2) {
    const parts = name2.split(".");
    let node2 = {
      type: "Identifier",
      name: parts[0]
    };
    for (let i = 1; i < parts.length; i++) {
      node2 = {
        type: "MemberExpression",
        object: node2,
        property: { type: "Identifier", name: parts[i] }
      };
    }
    return node2;
  }