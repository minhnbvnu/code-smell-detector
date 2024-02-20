function aroundNodeIfNeeded(node) {
  var shouldLimit = shouldLimitLineBreakAroundNode(node);
  debugAround('[aroundNodeIfNeeded] type: %s, shouldLimit: %s, ', node.type, shouldLimit);
  if (!shouldLimit) return;

  var type = node.type;
  _br.limitBefore(node.startToken, type);

  if (_tk.isSemiColon(node.endToken)) {
    _br.limitAfter(node.endToken, type);
  }
}