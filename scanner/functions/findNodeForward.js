function findNodeForward(node, match) {
		if (!node) {
			return null;
		}
		if (match(node)) {
			return node;
		}
		var next = node.firstChild
		        || node.nextSibling
		        || (
		            node.parentNode
		            && !GENTICS.Utils.Dom.isEditingHost(node.parentNode)
		            && node.parentNode.nextSibling
		        );
		return next ? findNodeForward(next, match) : null;
	}