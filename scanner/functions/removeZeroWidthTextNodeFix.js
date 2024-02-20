function removeZeroWidthTextNodeFix() {
		if (!zeroWidthNode) {
			return;
		}
		// We want to only replace a single zero-width character to avoid
		// interfering with the other zero-width whitespace hack that makes
		// empty lines visible in IE7.
		var text = zeroWidthNode.nodeValue.replace(/\u200b/, '');
		if (text === zeroWidthNode.nodeValue) {
			console.warn('Expected to remove the zero width text node fix, but couldn\'t find it');
		}
		replaceMergeTextNode(zeroWidthNode, text);
		zeroWidthNode = null;
	}