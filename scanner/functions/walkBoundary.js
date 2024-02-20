function walkBoundary(liveRange, carryDown, stepOutside, stepPartial, stepInside, arg) {
		// Because range may be mutated during traversal, we must only
		// refer to it before traversal.
		var cac = liveRange.commonAncestorContainer;
		var sc  = liveRange.startContainer;
		var ec  = liveRange.endContainer;
		var so  = liveRange.startOffset;
		var eo  = liveRange.endOffset;
		var start    = Dom.nodeAtOffset(sc, so);
		var end      = Dom.nodeAtOffset(ec, eo);
		var startEnd = Dom.isAtEnd(sc, so);
		var endEnd   = Dom.isAtEnd(ec, eo);
		var ascStart = Dom.childAndParentsUntilNode(start, cac);
		var ascEnd   = Dom.childAndParentsUntilNode(end,   cac);
		var stepAtStart = makePointNodeStep(start, startEnd, stepInside, stepPartial);
		var stepAtEnd   = makePointNodeStep(end, endEnd, stepOutside, stepPartial);
		ascendWalkSiblings(ascStart, startEnd, carryDown, stepOutside, stepAtStart, stepInside, arg);
		ascendWalkSiblings(ascEnd, endEnd, carryDown, stepInside, stepAtEnd, stepOutside, arg);
		var cacChildStart = Arrays.last(ascStart);
		var cacChildEnd   = Arrays.last(ascEnd);
		if (cacChildStart && cacChildStart !== cacChildEnd) {
			var next;
			Dom.walkUntilNode(cac.firstChild, stepOutside, cacChildStart, arg);
			next = cacChildStart.nextSibling;
			stepAtStart(cacChildStart, arg);
			Dom.walkUntilNode(next, stepInside, cacChildEnd, arg);
			if (cacChildEnd) {
				next = cacChildEnd.nextSibling;
				stepAtEnd(cacChildEnd, arg);
				Dom.walk(next, stepOutside, arg);
			}
		}
	}