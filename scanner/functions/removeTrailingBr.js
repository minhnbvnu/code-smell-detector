function removeTrailingBr(i, element) {
		var node = Html.findNodeRight(
			element.lastChild,
			isNotIgnorableWhitespace
		);
		if (node && 'br' === node.nodeName.toLowerCase()) {
			$(node).remove();
		}
	}