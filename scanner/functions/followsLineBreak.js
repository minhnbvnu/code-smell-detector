function followsLineBreak(node) {
		// "Let offset be zero."
		var offset = 0;

		// "While (node, offset) is not a block boundary point:"
		while (!isBlockBoundaryPoint(node, offset)) {
			// "If node has a visible child with index offset minus one, return
			// false."
			if (0 <= offset - 1 && offset - 1 < node.childNodes.length && isVisible(node.childNodes[offset - 1])) {
				return false;
			}

			// "If offset is zero or node has no children, set offset to node's
			// index, then set node to its parent."
			if (offset == 0 || !node.hasChildNodes()) {
				offset = Dom.getIndexInParent(node);
				node = node.parentNode;

				// "Otherwise, set node to its child with index offset minus one, then
				// set offset to node's length."
			} else {
				node = node.childNodes[offset - 1];
				offset = getNodeLength(node);
			}
		}

		// "Return true."
		return true;
	}