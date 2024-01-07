function wrapWithStateOrWrapper(oldVisitor, state, wrapper) {
	  var newVisitor = {};

	  var _loop = function _loop(key) {
	    var fns = oldVisitor[key];

	    if (!Array.isArray(fns)) return "continue";

	    fns = fns.map(function (fn) {
	      var newFn = fn;

	      if (state) {
	        newFn = function newFn(path) {
	          return fn.call(state, path, state);
	        };
	      }

	      if (wrapper) {
	        newFn = wrapper(state.key, key, newFn);
	      }

	      return newFn;
	    });

	    newVisitor[key] = fns;
	  };

	  for (var key in oldVisitor) {
	    var _ret = _loop(key);

	    if (_ret === "continue") continue;
	  }

	  return newVisitor;
	}