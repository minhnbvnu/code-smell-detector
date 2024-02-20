function findReusableAncestor(range, hasContext, getOverride, isUpperBoundary, isReusable) {
		var obstruction = null;
		function untilIncl(node) {
			return (null != getOverride(node)
					|| hasContext(node)
					|| isReusable(node)
					|| isUpperBoundary(node));
		}
		function beforeAfter(node) {
			obstruction = obstruction || !Html.isIgnorableWhitespace(node);
		}
		var start    = Dom.nodeAtOffset(range.startContainer, range.startOffset);
		var end      = Dom.nodeAtOffset(range.endContainer, range.endOffset);
		var startEnd = Dom.isAtEnd(range.startContainer, range.startOffset);
		var endEnd   = Dom.isAtEnd(range.endContainer, range.endOffset);
		var ascStart = Dom.childAndParentsUntilIncl(start, untilIncl);
		var ascEnd   = Dom.childAndParentsUntilIncl(end, untilIncl);
		var reusable = Arrays.last(ascStart);
		function at(node) {
			// Because the start node is inside the range.
			if (node === start && !startEnd) {
				return;
			}
			// Because the end node is outside the range.
			if (node === end && !endEnd) {
				beforeAfter(node);
				return;
			}
			obstruction = obstruction || !Html.isInlineFormattable(node);
		}
		if (!reusable || !isReusable(reusable) || reusable !== Arrays.last(ascEnd)) {
			return null;
		}
		ascendWalkSiblings(ascStart, startEnd, Fn.noop, beforeAfter, at, Fn.noop);
		if (obstruction) {
			return null;
		}
		ascendWalkSiblings(ascEnd, endEnd, Fn.noop, Fn.noop, at, beforeAfter);
		if (obstruction) {
			return null;
		}
		return reusable;
	}