function getParentConditionalPath(path) {
	  var parentPath = void 0;
	  while (parentPath = path.parentPath) {
	    if (parentPath.isIfStatement() || parentPath.isConditionalExpression()) {
	      if (path.key === "test") {
	        return;
	      } else {
	        return parentPath;
	      }
	    } else {
	      path = parentPath;
	    }
	  }
	}