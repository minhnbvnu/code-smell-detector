function maybeMemoise(path) {
	    if (!path.node || path.isPure()) return;

	    var uid = classPath.scope.generateDeclaredUidIdentifier();
	    memoisedExpressions.push(t.assignmentExpression("=", uid, path.node));
	    path.replaceWith(uid);
	  }