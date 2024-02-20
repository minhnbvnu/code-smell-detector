function visitClassMethodParam(traverse, node, path, state) {
  var paramName = node.name;
  if (_shouldMungeIdentifier(node, state)) {
    paramName = _getMungedName(node.name, state);
  }
  utils.append(paramName, state);
  utils.move(node.range[1], state);
}