function isReference(node, scope, state) {
	  var declared = state.letReferences[node.name];
	  if (!declared) return false;

	  return scope.getBindingIdentifier(node.name) === declared;
	}