function ensureWrapper(node, nodeName, hasWrapper, leftPoint, rightPoint) {
		if (node.previousSibling && !hasWrapper(node.previousSibling)) {
			// Because restacking here solves two problems: one the
			// case where the context was unnecessarily pushed down
			// on the left of the range, and two to join with a
			// context node that already exists to the left of the
			// range.
			restack(node.previousSibling,
					hasWrapper,
					Html.isIgnorableWhitespace,
					Html.isInlineFormattable,
					leftPoint,
					rightPoint);
		}
		if (node.previousSibling && hasWrapper(node.previousSibling)) {
			insertAdjust(node, node.previousSibling, true, leftPoint, rightPoint);
			return true;
		}
		if (!hasWrapper(node)) {
			var wrapper = document.createElement(nodeName);
			wrapAdjust(node, wrapper, leftPoint, rightPoint);
			return true;
		}
		return false;
	}