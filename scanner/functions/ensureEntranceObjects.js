function ensureEntranceObjects(obj) {
	  for (var key in obj) {
	    if (shouldIgnoreKey(key)) continue;

	    var fns = obj[key];
	    if (typeof fns === "function") {
	      obj[key] = { enter: fns };
	    }
	  }
	}