function patternName(node) {
    if (node.type == "Identifier") return node.name;
    if (node.type == "AssignmentPattern") return patternName(node.left);
    if (node.type == "ObjectPattern") return "{" + node.properties.map(function (e) {
      return patternName(e.type === 'RestElement' ? e : e.value);
    }).join(", ") + "}";
    if (node.type == "ArrayPattern") return "[" + node.elements.map(function (e) {
      return e ? patternName(e) : "";
    }).join(", ") + "]";
    if (node.type == "RestElement") return "..." + patternName(node.argument);
    return "_";
  }