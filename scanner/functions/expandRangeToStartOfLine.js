function expandRangeToStartOfLine(range) {
	  !range.collapsed ?  true ? invariant(false, 'expandRangeToStartOfLine: Provided range is not collapsed.') : invariant(false) : void 0;
	  range = range.cloneRange();

	  var containingElement = range.startContainer;
	  if (containingElement.nodeType !== 1) {
	    containingElement = containingElement.parentNode;
	  }
	  var lineHeight = getLineHeightPx(containingElement);

	  // Imagine our text looks like:
	  //   <div><span>once upon a time, there was a <em>boy
	  //   who lived</em> </span><q><strong>under^ the
	  //   stairs</strong> in a small closet.</q></div>
	  // where the caret represents the cursor. First, we crawl up the tree until
	  // the range spans multiple lines (setting the start point to before
	  // "<strong>", then before "<div>"), then at each level we do a search to
	  // find the latest point which is still on a previous line. We'll find that
	  // the break point is inside the span, then inside the <em>, then in its text
	  // node child, the actual break point before "who".

	  var bestContainer = range.endContainer;
	  var bestOffset = range.endOffset;
	  range.setStart(range.startContainer, 0);

	  while (areRectsOnOneLine(getRangeClientRects(range), lineHeight)) {
	    bestContainer = range.startContainer;
	    bestOffset = range.startOffset;
	    !bestContainer.parentNode ?  true ? invariant(false, 'Found unexpected detached subtree when traversing.') : invariant(false) : void 0;
	    range.setStartBefore(bestContainer);
	    if (bestContainer.nodeType === 1 && getComputedStyle(bestContainer).display !== 'inline') {
	      // The start of the line is never in a different block-level container.
	      break;
	    }
	  }

	  // In the above example, range now spans from "<div>" to "under",
	  // bestContainer is <div>, and bestOffset is 1 (index of <q> inside <div>)].
	  // Picking out which child to recurse into here is a special case since we
	  // don't want to check past <q> -- once we find that the final range starts
	  // in <span>, we can look at all of its children (and all of their children)
	  // to find the break point.

	  // At all times, (bestContainer, bestOffset) is the latest single-line start
	  // point that we know of.
	  var currentContainer = bestContainer;
	  var maxIndexToConsider = bestOffset - 1;

	  do {
	    var nodeValue = currentContainer.nodeValue;

	    for (var ii = maxIndexToConsider; ii >= 0; ii--) {
	      if (nodeValue != null && ii > 0 && UnicodeUtils.isSurrogatePair(nodeValue, ii - 1)) {
	        // We're in the middle of a surrogate pair -- skip over so we never
	        // return a range with an endpoint in the middle of a code point.
	        continue;
	      }

	      range.setStart(currentContainer, ii);
	      if (areRectsOnOneLine(getRangeClientRects(range), lineHeight)) {
	        bestContainer = currentContainer;
	        bestOffset = ii;
	      } else {
	        break;
	      }
	    }

	    if (ii === -1 || currentContainer.childNodes.length === 0) {
	      // If ii === -1, then (bestContainer, bestOffset), which is equal to
	      // (currentContainer, 0), was a single-line start point but a start
	      // point before currentContainer wasn't, so the line break seems to
	      // have occurred immediately after currentContainer's start tag
	      //
	      // If currentContainer.childNodes.length === 0, we're already at a
	      // terminal node (e.g., text node) and should return our current best.
	      break;
	    }

	    currentContainer = currentContainer.childNodes[ii];
	    maxIndexToConsider = getNodeLength(currentContainer);
	  } while (true);

	  range.setStart(bestContainer, bestOffset);
	  return range;
	}