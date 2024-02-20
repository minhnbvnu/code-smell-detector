function is_head(node2) {
    return node2 && node2.type === "MemberExpression" && node2.object["name"] === "@_document" && node2.property["name"] === "head";
  }