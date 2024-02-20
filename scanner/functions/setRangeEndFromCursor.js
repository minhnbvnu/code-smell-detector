function setRangeEndFromCursor(range, cursor) {
		if (cursor.atEnd) {
			range.setEnd(cursor.node, numChildren(cursor.node));
		} else {
			range.setEnd(cursor.node.parentNode, nodeIndex(cursor.node));
		}
	}