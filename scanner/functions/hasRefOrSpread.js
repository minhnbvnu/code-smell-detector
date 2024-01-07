function hasRefOrSpread(attrs) {
	    for (var i = 0; i < attrs.length; i++) {
	      var attr = attrs[i];
	      if (t.isJSXSpreadAttribute(attr)) return true;
	      if (isJSXAttributeOfName(attr, "ref")) return true;
	    }
	    return false;
	  }