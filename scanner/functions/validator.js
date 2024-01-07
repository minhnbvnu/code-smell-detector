function validator(node, key, val) {
	    if (!Array.isArray(val)) return;

	    for (var i = 0; i < val.length; i++) {
	      callback(node, key + "[" + i + "]", val[i]);
	    }
	  }