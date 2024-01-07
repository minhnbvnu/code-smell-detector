function replaceShorthandObjectMethod(path) {
	  if (!path.node || !t.isFunction(path.node)) {
	    throw new Error("replaceShorthandObjectMethod can only be called on Function AST node paths.");
	  }

	  // this function only replaces shorthand object methods (called ObjectMethod
	  // in Babel-speak).
	  if (!t.isObjectMethod(path.node)) {
	    return path;
	  }

	  // this function only replaces generators.
	  if (!path.node.generator) {
	    return path;
	  }

	  var parameters = path.node.params.map(function (param) {
	    return t.cloneDeep(param);
	  });

	  var functionExpression = t.functionExpression(null, // id
	  parameters, // params
	  t.cloneDeep(path.node.body), // body
	  path.node.generator, path.node.async);

	  util.replaceWithOrRemove(path, t.objectProperty(t.cloneDeep(path.node.key), // key
	  functionExpression, //value
	  path.node.computed, // computed
	  false // shorthand
	  ));

	  // path now refers to the ObjectProperty AST node path, but we want to return a
	  // Function AST node path for the function expression we created. we know that
	  // the FunctionExpression we just created is the value of the ObjectProperty,
	  // so return the "value" path off of this path.
	  return path.get("value");
	}