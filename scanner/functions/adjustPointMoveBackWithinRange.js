function adjustPointMoveBackWithinRange(point, left, node, ref, atEnd) {
		if (point.node === node) {
			// Because Left positions will be moved back with the node,
			// which is correct, while right positions must stay where
			// they are.
			// Because right positions with point.atEnd == true/false
			// must both stay where they are, we don't need an extra
			// check for point.atEnd.
			if (!left) {
				point.next();
			}
		}
		// Because trimRangeClosingOpening will ensure that the boundary
		// points will be next to a node that is moved, we don't need
		// any special handling for ref.
	}