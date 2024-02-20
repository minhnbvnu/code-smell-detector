function removeExtraneousLineBreaksBefore(node) {
		// "Let ref be the previousSibling of node."
		var ref = node.previousSibling;

		// "If ref is null, abort these steps."
		if (!ref) {
			return;
		}

		// "While ref has children, set ref to its lastChild."
		while (ref.hasChildNodes()) {
			ref = ref.lastChild;
		}

		// "While ref is invisible but not an extraneous line break, and ref does
		// not equal node's parent, set ref to the node before it in tree order."
		while (isInvisible(ref) && !isExtraneousLineBreak(ref) && ref != node.parentNode) {
			ref = previousNode(ref);
		}

		// "If ref is an editable extraneous line break, remove it from its
		// parent."
		if (isEditable(ref) && isExtraneousLineBreak(ref)) {
			ref.parentNode.removeChild(ref);
		}
	}