function findFirstMenuItem(children) {
	  for (var i = 0; i < children.length; i++) {
	    var child = children[i];
	    if (child.type.isMenuItemGroup) {
	      var found = findFirstMenuItem(child.props.children);
	      if (found) {
	        return found;
	      }
	    } else if (!child.props.disabled) {
	      return child;
	    }
	  }
	  return null;
	}