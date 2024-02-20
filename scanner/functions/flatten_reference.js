function flatten_reference(node2) {
    const nodes = [];
    const parts = [];
    while (node2.type === "MemberExpression") {
      nodes.unshift(node2.property);
      if (!node2.computed) {
        parts.unshift(node2.property.name);
      } else {
        const computed_property = to_string$1(node2.property);
        if (computed_property) {
          parts.unshift(`[${computed_property}]`);
        }
      }
      node2 = node2.object;
    }
    const name2 = node2.type === "Identifier" ? node2.name : node2.type === "ThisExpression" ? "this" : null;
    nodes.unshift(node2);
    parts.unshift(name2);
    return { name: name2, nodes, parts };
  }