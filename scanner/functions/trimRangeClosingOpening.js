function trimRangeClosingOpening(range, ignoreLeft, ignoreRight) {
		ignoreRight = ignoreRight || ignoreLeft;
		trimRange(range, function (cursor) {
			return cursor.atEnd || ignoreLeft(cursor.node);
		}, function (cursor) {
			var prev = cursor.atEnd ? cursor.node.lastChild : cursor.node.previousSibling;
			return !prev || ignoreRight(prev);
		});
	}