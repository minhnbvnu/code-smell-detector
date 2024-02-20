function getEditingHostOf(node) {
		if (isEditingHost(node)) {
			return node;
		}
		if (isEditable(node)) {
			var ancestor = node.parentNode;
			while (!isEditingHost(ancestor)) {
				ancestor = ancestor.parentNode;
			}
			return ancestor;
		}
		return null;
	}