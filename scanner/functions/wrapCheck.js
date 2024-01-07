function wrapCheck(wrapper, fn) {
	  var newFn = function newFn(path) {
	    if (wrapper.checkPath(path)) {
	      return fn.apply(this, arguments);
	    }
	  };
	  newFn.toString = function () {
	    return fn.toString();
	  };
	  return newFn;
	}