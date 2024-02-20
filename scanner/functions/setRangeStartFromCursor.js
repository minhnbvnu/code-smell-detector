function setRangeStartFromCursor(range, cursor) {
		if (cursor.atEnd) {
			range.setStart(cursor.node, numChildren(cursor.node));
		} else {
			range.setStart(cursor.node.parentNode, nodeIndex(cursor.node));
		}
	}