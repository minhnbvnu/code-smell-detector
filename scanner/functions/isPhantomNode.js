function isPhantomNode(node) {
		return isVisiblyEmpty(node) || isAlohaEditingP(node);
	}