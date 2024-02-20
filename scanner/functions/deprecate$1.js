function deprecate$1(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global$1.process)) {
	    return function () {
	      return deprecate$1(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process$3.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;

	  function deprecated() {
	    if (!warned) {
	      if (process$3.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process$3.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }

	      warned = true;
	    }

	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	}