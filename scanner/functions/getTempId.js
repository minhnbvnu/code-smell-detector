function getTempId(scope) {
	    var id = scope.path.getData("functionBind");
	    if (id) return id;

	    id = scope.generateDeclaredUidIdentifier("context");
	    return scope.path.setData("functionBind", id);
	  }