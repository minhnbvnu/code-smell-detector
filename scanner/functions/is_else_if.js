function is_else_if(node2) {
    return node2 && node2.children.length === 1 && node2.children[0].type === "IfBlock";
  }