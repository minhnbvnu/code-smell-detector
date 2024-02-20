function splitBoundary(liveRange, pred, clone) {
		clone = clone || Dom.cloneShallow;
		fixupRange(liveRange, function (range, leftPoint, rightPoint) {

			var wrapper = null;

			function carryDown(elem, stop) {
				return stop || !pred(elem);
			}

			function pushDown(node, stop) {
				if (stop) {
					return;
				}
				if (!wrapper || node.parentNode.previousSibling !== wrapper) {
					wrapper = clone(node.parentNode);
					insertAdjust(wrapper, node.parentNode, false, leftPoint, rightPoint);
				}
				insertAdjust(node, wrapper, true, leftPoint, rightPoint);
			}

			var sc = range.startContainer;
			var so = range.startOffset;
			var ec = range.endContainer;
			var eo = range.endOffset;
			var cac = range.commonAncestorContainer;
			var startEnd = Dom.isAtEnd(sc, so);
			var endEnd   = Dom.isAtEnd(ec, eo);
			var ascStart = Dom.childAndParentsUntilNode(Dom.nodeAtOffset(sc, so), cac);
			var ascEnd   = Dom.childAndParentsUntilNode(Dom.nodeAtOffset(ec, eo), cac);
			ascendWalkSiblings(ascStart, startEnd, carryDown, pushDown, Fn.noop, Fn.noop, null);
			ascendWalkSiblings(ascEnd, endEnd, carryDown, pushDown, Fn.noop, Fn.noop, null);
		});
	}