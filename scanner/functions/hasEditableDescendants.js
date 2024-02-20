function hasEditableDescendants(node) {
		var i;
		for (i = 0; i < node.childNodes.length; i++) {
			if (isEditable(node.childNodes[i]) || hasEditableDescendants(node.childNodes[i])) {
				return true;
			}
		}
		return false;
	}