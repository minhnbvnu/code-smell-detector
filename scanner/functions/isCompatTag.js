function isCompatTag(tagName) {
	  return !!tagName && /^[a-z]|\-/.test(tagName);
	}