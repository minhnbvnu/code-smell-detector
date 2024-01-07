function renameArguments(funcPath, argsId) {
	  var state = {
	    didRenameArguments: false,
	    argsId: argsId
	  };

	  funcPath.traverse(argumentsVisitor, state);

	  // If the traversal replaced any arguments references, then we need to
	  // alias the outer function's arguments binding (be it the implicit
	  // arguments object or some other parameter or variable) to the variable
	  // named by argsId.
	  return state.didRenameArguments;
	}