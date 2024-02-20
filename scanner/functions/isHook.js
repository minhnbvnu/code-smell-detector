function isHook(node) {
  if (node.type === AST_NODE_TYPES.IDENTIFIER) {
    return isHookName(node.name);
  } else if (node.type === AST_NODE_TYPES.MEMBER_EXPRESSION && !node.computed && isHook(node.property)) {
    const obj = node.object;
    const isPascalCaseNameSpace = /^[A-Z].*/;
    return obj.type === AST_NODE_TYPES.IDENTIFIER && isPascalCaseNameSpace.test(obj.name);
  } else {
    // TODO Possibly handle inline require statements e.g. require("useStable")(...)
    // This does not seem like a high priority, since inline requires are probably
    // not common and are also typically in compiled code rather than source code.
    return false;
  }
}