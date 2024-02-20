function precedesLineBreak(node) {
		// "Let offset be node's length."
		var offset = getNodeLength(node);

		// "While (node, offset) is not a block boundary point:"
		while (!isBlockBoundaryPoint(node, offset)) {
			// "If node has a visible child with index offset, return false."
			if (offset < node.childNodes.length && isVisible(node.childNodes[offset])) {
				return false;
			}

			// "If offset is node's length or node has no children, set offset to
			// one plus node's index, then set node to its parent."
			if (offset == getNodeLength(node) || !node.hasChildNodes()) {
				offset = 1 + Dom.getIndexInParent(node);
				node = node.parentNode;

				// "Otherwise, set node to its child with index offset and set offset
				// to zero."
			} else {
				node = node.childNodes[offset];
				offset = 0;
			}
		}

		// "Return true."
		return true;
	}