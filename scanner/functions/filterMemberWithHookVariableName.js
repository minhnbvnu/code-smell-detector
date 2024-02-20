function filterMemberWithHookVariableName(hook) {
  return hook.node.init.property.type === AST_NODE_TYPES.NUMERIC_LITERAL && hook.node.init.property.value === 0;
}