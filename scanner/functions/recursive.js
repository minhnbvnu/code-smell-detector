function recursive(children, cb) {
	  children.forEach(function (item) {
	    cb(item);
	    if (item.children) {
	      recursive(item.children, cb);
	    }
	  });
	}