function insertAdjust(node, ref, atEnd, leftPoint, rightPoint) {
		adjustPointMoveBackWithinRange(leftPoint, true, node, ref, atEnd);
		adjustPointMoveBackWithinRange(rightPoint, false, node, ref, atEnd);
		Dom.insert(node, ref, atEnd);
	}