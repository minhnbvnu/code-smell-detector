function nextVisibleNode(node) {
		if (!node) {
			return null;
		}

		if (node.nextSibling) {
			// Skip over nodes that the user cannot see ...
			if (isTextNode(node.nextSibling) && !isVisibleTextNode(node.nextSibling)) {
				return nextVisibleNode(node.nextSibling);
			}

			// Skip over propping <br>s ...
			if (isBR(node.nextSibling) && node.nextSibling === node.parentNode.lastChild) {
				return nextVisibleNode(node.nextSibling);
			}

			// Skip over empty editable elements ...
			if ('' === node.nextSibling.innerHTML && !isBlock(node.nextSibling)) {
				return nextVisibleNode(node.nextSibling);
			}

			return node.nextSibling;
		}

		if (node.parentNode) {
			return nextVisibleNode(node.parentNode);
		}

		return null;
	}