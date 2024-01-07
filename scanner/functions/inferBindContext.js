function inferBindContext(bind, scope) {
	    var staticContext = getStaticContext(bind, scope);
	    if (staticContext) return staticContext;

	    var tempId = getTempId(scope);
	    if (bind.object) {
	      bind.callee = t.sequenceExpression([t.assignmentExpression("=", tempId, bind.object), bind.callee]);
	    } else {
	      bind.callee.object = t.assignmentExpression("=", tempId, bind.callee.object);
	    }
	    return tempId;
	  }