function isEmptyOnlyChildOfEditingHost(node) {
		return (
			node
				&& isEmptyNode(node)
					&& isEditingHost(node.parentNode)
						&& !node.previousSibling
							&& !node.nextSibling
		);
	}