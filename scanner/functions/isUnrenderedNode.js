function isUnrenderedNode(node) {
		if (3 === node.nodeType && 0 === node.data.length) {
			return true;
		}
		if ((node === node.parentNode.lastChild)
				&& isBlock(node.parentNode)
					&& 'BR' === node.nodeName) {
			return true;
		}
		return isWSPorZWSPNode(node);
	}