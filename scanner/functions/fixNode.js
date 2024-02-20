function fixNode(node) {
			if (!node) {
				return;
			}
			if (node.previousSibling) {
				return node.previousSibling.nextSibling;
			} else if (node.nextSibling) {
				return node.nextSibling.previousSibling;
			} else if (node.parentNode) {
				return node.parentNode.firstChild;
			} else {
				return node;
			}
		}