function getNextParentSiblingRecur(node) {
			if (node.parentNode) {
				return node.parentNode.nextSibling || getNextParentSiblingRecur(node.parentNode);
			} else {
				return null;
			}
		}