function cursorFromBoundaryPoint(node, offset) {
		return cursor(nodeAtOffset(node, offset), isAtEnd(node, offset));
	}