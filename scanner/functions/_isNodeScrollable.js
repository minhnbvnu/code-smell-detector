function _isNodeScrollable(element, name) {
	  var overflow = Style.get(element, name);
	  return overflow === 'auto' || overflow === 'scroll';
	}