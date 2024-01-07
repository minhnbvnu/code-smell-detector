function valueToNode(value) {
	  if (value === undefined) {
	    return t.identifier("undefined");
	  }

	  if (value === true || value === false) {
	    return t.booleanLiteral(value);
	  }

	  if (value === null) {
	    return t.nullLiteral();
	  }

	  if (typeof value === "string") {
	    return t.stringLiteral(value);
	  }

	  if (typeof value === "number") {
	    return t.numericLiteral(value);
	  }

	  if ((0, _isRegExp2.default)(value)) {
	    var pattern = value.source;
	    var flags = value.toString().match(/\/([a-z]+|)$/)[1];
	    return t.regExpLiteral(pattern, flags);
	  }

	  if (Array.isArray(value)) {
	    return t.arrayExpression(value.map(t.valueToNode));
	  }

	  if ((0, _isPlainObject2.default)(value)) {
	    var props = [];
	    for (var key in value) {
	      var nodeKey = void 0;
	      if (t.isValidIdentifier(key)) {
	        nodeKey = t.identifier(key);
	      } else {
	        nodeKey = t.stringLiteral(key);
	      }
	      props.push(t.objectProperty(nodeKey, t.valueToNode(value[key])));
	    }
	    return t.objectExpression(props);
	  }

	  throw new Error("don't know how to turn this value into a node");
	}