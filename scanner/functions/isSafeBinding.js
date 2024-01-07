function isSafeBinding(scope, node) {
	  if (!scope.hasOwnBinding(node.name)) return true;

	  var _scope$getOwnBinding = scope.getOwnBinding(node.name),
	      kind = _scope$getOwnBinding.kind;

	  return kind === "param" || kind === "local";
	}