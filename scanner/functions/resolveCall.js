function resolveCall(callee) {
	  callee = callee.resolve();

	  if (callee.isFunction()) {
	    if (callee.is("async")) {
	      if (callee.is("generator")) {
	        return t.genericTypeAnnotation(t.identifier("AsyncIterator"));
	      } else {
	        return t.genericTypeAnnotation(t.identifier("Promise"));
	      }
	    } else {
	      if (callee.node.returnType) {
	        return callee.node.returnType;
	      } else {}
	    }
	  }
	}