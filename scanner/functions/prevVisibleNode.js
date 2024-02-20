function prevVisibleNode(node) {
		if (!node) {
			return null;
		}

		if (node.previousSibling) {
			// Skip over nodes that the user cannot see...
			if (isTextNode(node.previousSibling) && !isVisibleTextNode(node.previousSibling)) {
				return prevVisibleNode(node.previousSibling);
			}

			// Skip over empty editable elements ...
			if ('' === node.previousSibling.innerHTML && !isBlock(node.previousSibling)) {
				return prevVisibleNode(node.previouSibling);
			}

			return node.previousSibling;
		}

		if (node.parentNode) {
			return prevVisibleNode(node.parentNode);
		}

		return null;
	}