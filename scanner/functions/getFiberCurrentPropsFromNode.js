function getFiberCurrentPropsFromNode(node) {
  return node[internalEventHandlersKey] || null;
}