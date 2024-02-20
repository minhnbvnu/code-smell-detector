function denodeify(nodeFunc, options) {
	  var fn = function () {
	    var self = this;
	    var l = arguments.length;
	    var args = new Array(l + 1);
	    var promiseInput = false;

	    for (var i = 0; i < l; ++i) {
	      var arg = arguments[i];

	      if (!promiseInput) {
	        // TODO: clean this up
	        promiseInput = needsPromiseInput(arg);
	        if (promiseInput === GET_THEN_ERROR$1) {
	          var p = new Promise(noop);
	          reject(p, GET_THEN_ERROR$1.value);
	          return p;
	        } else if (promiseInput && promiseInput !== true) {
	          arg = wrapThenable(promiseInput, arg);
	        }
	      }
	      args[i] = arg;
	    }

	    var promise = new Promise(noop);

	    args[l] = function (err, val) {
	      if (err) reject(promise, err);else if (options === undefined) resolve(promise, val);else if (options === true) resolve(promise, arrayResult(arguments));else if (isArray(options)) resolve(promise, makeObject(arguments, options));else resolve(promise, val);
	    };

	    if (promiseInput) {
	      return handlePromiseInput(promise, args, nodeFunc, self);
	    } else {
	      return handleValueInput(promise, args, nodeFunc, self);
	    }
	  };

	  fn.__proto__ = nodeFunc;

	  return fn;
	}