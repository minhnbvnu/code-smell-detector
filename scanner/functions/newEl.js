function newEl(tag, namespace) {
		if (namespace == null) {
			return document.createElement(tag);
		} else {
			return document.createElementNS(namespace, tag);
		}
	}