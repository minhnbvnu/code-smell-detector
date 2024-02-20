function is_reference(node2, parent) {
    if (node2.type === "MemberExpression") {
      return !node2.computed && is_reference(node2.object, node2);
    }
    if (node2.type === "Identifier") {
      if (!parent)
        return true;
      switch (parent.type) {
        case "MemberExpression":
          return parent.computed || node2 === parent.object;
        case "MethodDefinition":
          return parent.computed;
        case "PropertyDefinition":
          return parent.computed || node2 === parent.value;
        case "Property":
          return parent.computed || node2 === parent.value;
        case "ExportSpecifier":
        case "ImportSpecifier":
          return node2 === parent.local;
        case "LabeledStatement":
        case "BreakStatement":
        case "ContinueStatement":
          return false;
        default:
          return true;
      }
    }
    return false;
  }