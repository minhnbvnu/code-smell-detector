function _isViewportScrollElement(element, doc) {
	  return !!doc && (element === doc.documentElement || element === doc.body);
	}