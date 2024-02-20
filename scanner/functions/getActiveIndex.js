function getActiveIndex(children, activeKey) {
	  var c = toArray(children);
	  for (var i = 0; i < c.length; i++) {
	    if (c[i].key === activeKey) {
	      return i;
	    }
	  }
	  return -1;
	}