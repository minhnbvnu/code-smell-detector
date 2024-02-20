function isEndPosition(node, offset) {
		var length = nodeLength(node);

		if (length === offset) {
			return true;
		}

		var isText = isTextNode(node);

		// If within a text node, then ignore superfluous white-spaces,
		// since they are invisible to the user.
		if (isText && node.data.replace(/\s+$/, '').length === offset) {
			return true;
		}

		if (1 === length && !isText) {
			return isBR(node.childNodes[0]);
		}

		return false;
	}