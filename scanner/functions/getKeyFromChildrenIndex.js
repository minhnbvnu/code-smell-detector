function getKeyFromChildrenIndex(child, menuEventKey, index) {
	  var prefix = menuEventKey || '';
	  return child.key || prefix + 'item_' + index;
	}