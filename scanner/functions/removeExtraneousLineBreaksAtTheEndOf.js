function removeExtraneousLineBreaksAtTheEndOf(node) {
		// "Let ref be node."
		var ref = node;

		// "While ref has children, set ref to its lastChild."
		while (ref.hasChildNodes()) {
			ref = ref.lastChild;
		}

		// "While ref is invisible but not an extraneous line break, and ref does
		// not equal node, set ref to the node before it in tree order."
		while (isInvisible(ref) && !isExtraneousLineBreak(ref) && ref != node) {
			ref = previousNode(ref);
		}

		// "If ref is an editable extraneous line break, remove it from its
		// parent."
		if (isEditable(ref) && isExtraneousLineBreak(ref)) {
			ref.parentNode.removeChild(ref);
		}
	}