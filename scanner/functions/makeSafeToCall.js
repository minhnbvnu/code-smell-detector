function makeSafeToCall(fun) {
	  if (fun) {
	    defProp(fun, "call", fun.call);
	    defProp(fun, "apply", fun.apply);
	  }
	  return fun;
	}