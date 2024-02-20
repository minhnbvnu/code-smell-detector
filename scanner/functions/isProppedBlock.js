function isProppedBlock(node) {
		if (!Html.isBlock(node)) {
			return false;
		}
		var child = Html.findNodeRight(node.lastChild, isVisible);
		return (
			child
			&& 'br' === child.nodeName.toLowerCase()
			&& !Html.findNodeRight(child.previousSibling, isVisible)
		);
	}