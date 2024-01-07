function getStaticContext(bind, scope) {
	    var object = bind.object || bind.callee.object;
	    return scope.isStatic(object) && object;
	  }