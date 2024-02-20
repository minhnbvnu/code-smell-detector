function deterministicDecirc (val, k, edgeIndex, stack, parent, depth, options) {
	  depth += 1;
	  var i;
	  if (typeof val === 'object' && val !== null) {
	    for (i = 0; i < stack.length; i++) {
	      if (stack[i] === val) {
	        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
	        return
	      }
	    }
	    try {
	      if (typeof val.toJSON === 'function') {
	        return
	      }
	    } catch (_) {
	      return
	    }

	    if (
	      typeof options.depthLimit !== 'undefined' &&
	      depth > options.depthLimit
	    ) {
	      setReplace(LIMIT_REPLACE_NODE, val, k, parent);
	      return
	    }

	    if (
	      typeof options.edgesLimit !== 'undefined' &&
	      edgeIndex + 1 > options.edgesLimit
	    ) {
	      setReplace(LIMIT_REPLACE_NODE, val, k, parent);
	      return
	    }

	    stack.push(val);
	    // Optimize for Arrays. Big arrays could kill the performance otherwise!
	    if (Array.isArray(val)) {
	      for (i = 0; i < val.length; i++) {
	        deterministicDecirc(val[i], i, i, stack, val, depth, options);
	      }
	    } else {
	      // Create a temporary object in the required way
	      var tmp = {};
	      var keys = Object.keys(val).sort(compareFunction);
	      for (i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        deterministicDecirc(val[key], key, i, stack, val, depth, options);
	        tmp[key] = val[key];
	      }
	      if (typeof parent !== 'undefined') {
	        arr.push([parent, k, val]);
	        parent[k] = tmp;
	      } else {
	        return tmp
	      }
	    }
	    stack.pop();
	  }
	}