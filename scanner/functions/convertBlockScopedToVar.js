function convertBlockScopedToVar(path, node, parent, scope) {
	  var moveBindingsToParent = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

	  if (!node) {
	    node = path.node;
	  }

	  if (!t.isFor(parent)) {
	    for (var i = 0; i < node.declarations.length; i++) {
	      var declar = node.declarations[i];
	      declar.init = declar.init || scope.buildUndefinedNode();
	    }
	  }

	  node[t.BLOCK_SCOPED_SYMBOL] = true;
	  node.kind = "var";

	  if (moveBindingsToParent) {
	    var parentScope = scope.getFunctionParent();
	    var ids = path.getBindingIdentifiers();
	    for (var name in ids) {
	      var binding = scope.getOwnBinding(name);
	      if (binding) binding.kind = "var";
	      scope.moveBindingTo(name, parentScope);
	    }
	  }
	}