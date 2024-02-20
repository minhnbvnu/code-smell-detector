function removeNodeIfEmptyAndCorrectRange(node, range) {
		var
			removeNode = false,
			parentNode,
			nodeChildNodesLength,
			offsetInParent,
			firstChildNode;

		if (!node || !range) {
			return false;
		}

		if (isEditingHost(node)) {
			return false;
		}

		parentNode = node.parentNode;

		if (!parentNode) {
			return false;
		}

		// Check if the node is empty
		nodeChildNodesLength = node.childNodes.length;
		if (nodeChildNodesLength === 0) {
			removeNode = true;
		}

		// If the inline node only contains an empty text node,
		// it is also considered being empty.
		if (nodeChildNodesLength === 1) {
			firstChildNode = node.childNodes[0];

			if (firstChildNode.nodeType === $_.Node.TEXT_NODE
					&& firstChildNode.nodeValue.length === 0) {
				removeNode = true;
			}
		}

		// Don't continue if node should not be removed or has no parent
		if (!removeNode) {
			return false;
		}

		// Before removing, remember the offset of node in its parent
		offsetInParent = Dom.getIndexInParent(node);

		// I'm not gonna comment this, it's clear what it does.
		parentNode.removeChild(node);

		// Now the cursor has to be set at the position where the
		// removed parent was before.
		range.setStart(parentNode, offsetInParent);
		range.setEnd(parentNode, offsetInParent);

		return true;
	}