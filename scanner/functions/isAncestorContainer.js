function isAncestorContainer(ancestor, descendant) {
		return (ancestor || descendant) && (ancestor == descendant || isAncestor(ancestor, descendant));
	}