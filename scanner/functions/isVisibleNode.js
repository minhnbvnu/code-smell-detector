function isVisibleNode(node) {
		return (Html.isBlock(node) || Dom.isTextNode(node)) &&
			!Html.isUnrenderedNode(node);
	}