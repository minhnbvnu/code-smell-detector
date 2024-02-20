function decirc (val, k, edgeIndex, stack, parent, depth, options) {
	  depth += 1;
	  var i;
	  if (typeof val === 'object' && val !== null) {
	    for (i = 0; i < stack.length; i++) {
	      if (stack[i] === val) {
	        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
	        return
	      }
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
	        decirc(val[i], i, i, stack, val, depth, options);
	      }
	    } else {
	      var keys = Object.keys(val);
	      for (i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        decirc(val[key], key, i, stack, val, depth, options);
	      }
	    }
	    stack.pop();
	  }
	}