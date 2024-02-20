function getIndentLevel(node) {
  var value = _opts[node.type];
  debug('[getIndentLevel] type: %s, value: %s', node.type, value);
  if (value == null && node.type in _specialTypes) {
    var specials = _specialTypes[node.type];
    specials.some(function(type) {
      value = _opts[type];
      return value > 0;
    });
    debug('[specialNodeType] indent: %s', value);
  }
  return value;
}