function isLeaf(form) {
		var type = $.type(form);
		return type !== 'object' && type !== 'array';
	}