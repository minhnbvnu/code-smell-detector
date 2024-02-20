function trimRange(range, ignoreLeft, ignoreRight) {
		if (range.collapsed) {
			return;
		}
		var start = cursorFromBoundaryPoint(range.startContainer, range.startOffset);
		var end = cursorFromBoundaryPoint(range.endContainer, range.endOffset);
		var setStart = false;
		while (!start.equals(end) && ignoreLeft(start) && start.next()) {
			setStart = true;
		}
		ignoreRight = ignoreRight || ignoreLeft;
		var setEnd = false;
		// Because if the right boundary points is inside a text node,
		// trimming starts after it.
		if (3 === range.endContainer.nodeType
			    && range.endOffset > 0
			    // Because the cursor already normalizes
			    // endOffset == endContainer.length to the node next after it.
			    && range.endOffset < range.endContainer.length
			    && end.next()) {
			if (ignoreRight(end)) {
				end.prev();
			}
		}
		while (!end.equals(start) && ignoreRight(end) && end.prev()) {
			setEnd = true;
		}
		if (setStart) {
			setRangeStartFromCursor(range, start);
		}
		if (setEnd) {
			setRangeEndFromCursor(range, end);
		}
	}