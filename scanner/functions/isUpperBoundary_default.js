function isUpperBoundary_default(node) {
		// Because the body element is an obvious upper boundary, and
		// because, when we are inside an editable, we shouldn't make
		// modifications outside the editable (if we are not inside
		// an editable, we don't care).
		return 'BODY' === node.nodeName || Html.isEditingHost(node);
	}