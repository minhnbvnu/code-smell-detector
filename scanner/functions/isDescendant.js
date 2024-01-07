function isDescendant(maybeAncestor) {
	  return !!this.findParent(function (parent) {
	    return parent === maybeAncestor;
	  });
	}