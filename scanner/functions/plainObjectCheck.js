function plainObjectCheck(x) {
	  if (x === null) {
	    // Note: typeof `null` is 'object', and `null` is valid in JSON.
	    return true;
	  } else if (typeof x === 'object') {
	    if (Object.getPrototypeOf(x) === Object.prototype) {
	      // `x` is a JavaScript object and its prototype is Object.
	      var keys = Object.keys(x);

	      for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
	        var key = _keys[_i];

	        if (typeof key !== 'string') {
	          // JSON keys must be strings.
	          return false;
	        }

	        if (!plainObjectCheck(x[key])) {
	          // Recursive call.
	          return false;
	        }
	      }

	      return true;
	    } else {
	      // `x` is a JavaScript object but its prototype is not Object.
	      if (Array.isArray(x)) {
	        // `x` is a JavaScript array.
	        for (var _iterator = _createForOfIteratorHelperLoose(x), _step; !(_step = _iterator()).done;) {
	          var item = _step.value;

	          if (!plainObjectCheck(item)) {
	            // Recursive call.
	            return false;
	          }
	        }

	        return true;
	      } else {
	        // `x` is a JavaScript object and its prototype is not Object,
	        // and it's not an Array. I.e., it's a complex object such as
	        // `Error` and `Date`.
	        return false;
	      }
	    }
	  } else {
	    // `x` is not a JavaScript object or `null`.
	    var xType = typeof x;
	    return xType === 'string' || xType === 'number' || xType === 'boolean';
	  }
	}