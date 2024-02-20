function isInvisibleTextNode(node) {
		if (node && node.nodeType !== $_.Node.TEXT_NODE) {
			return false;
		}
		var offset = 0;
		var data = node.data;
		var len = data.length;
		while (offset < len && data.charAt(offset) === '\u200b') {
			offset++;
		}
		return offset === len;
	}