function fixupRange(liveRange, mutate) {
		// Because we are mutating the range several times and don't
		// want the caller to see the in-between updates, and because we
		// are using trimRange() below to adjust the range's boundary
		// points, which we don't want the browser to re-adjust (which
		// some browsers do).
		var range = Dom.stableRange(liveRange);

		// Because we should avoid splitTextContainers() if this call is a noop.
		if (range.collapsed) {
			return;
		}

		// Because trimRangeClosingOpening(), mutate() and
		// adjustPointMoveBackWithinRange() require boundary points to
		// be between nodes.
		Dom.splitTextContainers(range);

		// Because we want unbolding
		// <b>one<i>two{</i>three}</b>
		// to result in
		// <b>one<i>two</i></b>three
		// and not in
		// <b>one</b><i><b>two</b></i>three
		// and because adjustPointMoveBackWithinRange() requires the
		// left boundary point to be next to a non-ignorable node.
		Dom.trimRangeClosingOpening(range, Html.isIgnorableWhitespace);

		// Because mutation needs to keep track and adjust boundary
		// points.
		var leftPoint = Dom.cursorFromBoundaryPoint(range.startContainer, range.startOffset);
		var rightPoint = Dom.cursorFromBoundaryPoint(range.endContainer, range.endOffset);

		mutate(range, leftPoint, rightPoint);

		// Because we must reflect the adjusted boundary points in the
		// given range.
		Dom.setRangeStartFromCursor(liveRange, leftPoint);
		Dom.setRangeEndFromCursor(liveRange, rightPoint);
	}