function op(f) {
	  var keys = Object.keys(f);

	  if (keys.length !== 1) {
	    throw new Error("Please provide an object with a single key " + "(operation name) mapping to a function. Got an object with " + (keys.length + " keys."));
	  }

	  var opName = keys[0];
	  var fn = f[opName]; // Strip the underscore from the end of the function name.

	  if (opName.endsWith('_')) {
	    opName = opName.substring(0, opName.length - 1);
	  } // add an __op suffix to distinguish ops from kernels in tf.profile


	  opName = opName + OP_SCOPE_SUFFIX; // tslint:disable-next-line:no-any

	  var f2 = function f2() {
	    ENGINE.startScope(opName);

	    try {
	      var result = fn.apply(void 0, arguments);

	      if (isPromise(result)) {
	        console.error('Cannot return a Promise inside of tidy.');
	      }

	      ENGINE.endScope(result);
	      return result;
	    } catch (ex) {
	      ENGINE.endScope(null);
	      throw ex;
	    }
	  };

	  Object.defineProperty(f2, 'name', {
	    value: opName,
	    configurable: true
	  }); // tslint:disable-next-line:no-any

	  return f2;
	}