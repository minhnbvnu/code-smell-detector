function splitTextNodeAdjustRange(splitNode, splitOffset, range) {
		if (3 !== splitNode.nodeType) {
			return;
		}
		var sc = range.startContainer;
		var so = range.startOffset;
		var ec = range.endContainer;
		var eo = range.endOffset;
		var newNodeBeforeSplit = splitTextNode(splitNode, splitOffset);
		adjustRangeAfterSplit(range, sc, so, 'setStart', splitNode, newNodeBeforeSplit);
		adjustRangeAfterSplit(range, ec, eo, 'setEnd', splitNode, newNodeBeforeSplit);
	}