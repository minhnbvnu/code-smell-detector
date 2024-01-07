function toKeyAlias(node) {
	  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : node.key;

	  var alias = void 0;

	  if (node.kind === "method") {
	    return toKeyAlias.increment() + "";
	  } else if (t.isIdentifier(key)) {
	    alias = key.name;
	  } else if (t.isStringLiteral(key)) {
	    alias = (0, _stringify2.default)(key.value);
	  } else {
	    alias = (0, _stringify2.default)(t.removePropertiesDeep(t.cloneDeep(key)));
	  }

	  if (node.computed) {
	    alias = "[" + alias + "]";
	  }

	  if (node.static) {
	    alias = "static:" + alias;
	  }

	  return alias;
	}