function isFrontPosition(node, offset) {
		if (isTextNode(node)
				&& offset <= node.data.length - node.data.replace(/^\s+/, '').length) {
			return true;
		}

		return offset === 0;
	}