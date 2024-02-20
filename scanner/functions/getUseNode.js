function getUseNode(node) {
		//if the node already has a sourceIndex, use that node
		if (null != node.sourceIndex) {
			return node;
		}
		//otherwise, insert a comment (which has a sourceIndex but minimal DOM impact) before the node and use that
		return node.parentNode.insertBefore(document.createComment(""), node);
	}