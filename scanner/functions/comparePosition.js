function comparePosition(node1, node2) {
		return (node1.contains(node2) && 16) + (node2.contains(node1) && 8) + (node1.sourceIndex >= 0 && node2.sourceIndex >= 0 ? (node1.sourceIndex < node2.sourceIndex && 4) + (node1.sourceIndex > node2.sourceIndex && 2) : 1);
	}