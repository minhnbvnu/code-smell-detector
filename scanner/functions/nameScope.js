function nameScope(name, fn) {
	  _nameScopeStack.push(name);

	  try {
	    var val = fn();

	    _nameScopeStack.pop();

	    return val;
	  } catch (e) {
	    _nameScopeStack.pop();

	    throw e;
	  }
	}