function getHookVariableName(hook, isCustomHook = false) {
  var _hook$node$id$element, _hook$node$id$element2;

  const nodeType = hook.node.id.type;

  switch (nodeType) {
    case AST_NODE_TYPES.ARRAY_PATTERN:
      return !isCustomHook ? (_hook$node$id$element = (_hook$node$id$element2 = hook.node.id.elements[0]) === null || _hook$node$id$element2 === void 0 ? void 0 : _hook$node$id$element2.name) !== null && _hook$node$id$element !== void 0 ? _hook$node$id$element : null : null;

    case AST_NODE_TYPES.IDENTIFIER:
      return hook.node.id.name;

    default:
      return null;
  }
}