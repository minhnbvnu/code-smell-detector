function toKeyAlias(node, key = node.key) {
  let alias;

  if (node.kind === "method") {
    return toKeyAlias.increment() + "";
  } else if ((0, _generated.isIdentifier)(key)) {
    alias = key.name;
  } else if ((0, _generated.isStringLiteral)(key)) {
    alias = JSON.stringify(key.value);
  } else {
    alias = JSON.stringify((0, _removePropertiesDeep.default)((0, _cloneNode.default)(key)));
  }

  if (node.computed) {
    alias = `[${alias}]`;
  }

  if (node.static) {
    alias = `static:${alias}`;
  }

  return alias;
}