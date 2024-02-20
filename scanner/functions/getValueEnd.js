function getValueEnd(prop) {
  if (prop.key.startToken === prop.value.startToken) {
    return null;
  }
  // we need to grab next "," or "}" because value might be surrounded by
  // parenthesis which would break the regular logic
  var end = _tk.findNext(prop.value.endToken, [',', '}']);
  return _tk.findPrev(end, _tk.isCode);
}