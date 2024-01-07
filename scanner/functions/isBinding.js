function isBinding(node, parent) {
	  var keys = _retrievers.getBindingIdentifiers.keys[parent.type];
	  if (keys) {
	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i];
	      var val = parent[key];
	      if (Array.isArray(val)) {
	        if (val.indexOf(node) >= 0) return true;
	      } else {
	        if (val === node) return true;
	      }
	    }
	  }

	  return false;
	}