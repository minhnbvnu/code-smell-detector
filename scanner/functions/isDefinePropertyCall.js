function isDefinePropertyCall(node) {
    return node.callee.type == "MemberExpression" &&
      node.callee.object.name == "Object" &&
      node.callee.property.name == "defineProperty" &&
      node.arguments.length >= 3 &&
      typeof node.arguments[1].value == "string";
  }