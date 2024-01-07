function replaceRestProperty(parentPath, paramPath, i, numParams) {
	    if (paramPath.isAssignmentPattern()) {
	      replaceRestProperty(parentPath, paramPath.get("left"), i, numParams);
	      return;
	    }

	    if (paramPath.isObjectPattern() && hasRestProperty(paramPath)) {
	      var uid = parentPath.scope.generateUidIdentifier("ref");

	      var declar = t.variableDeclaration("let", [t.variableDeclarator(paramPath.node, uid)]);
	      declar._blockHoist = i ? numParams - i : 1;

	      parentPath.ensureBlock();
	      parentPath.get("body").unshiftContainer("body", declar);
	      paramPath.replaceWith(uid);
	    }
	  }