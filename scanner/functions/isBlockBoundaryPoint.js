function isBlockBoundaryPoint(node, offset) {
		return isBlockStartPoint(node, offset) || isBlockEndPoint(node, offset);
	}