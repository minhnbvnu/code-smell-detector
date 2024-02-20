function adjustRangeAfterSplit(range, container, offset, setProp, splitNode, newNodeBeforeSplit) {
		if (container !== splitNode) {
			return;
		}
		var newNodeLength = newNodeBeforeSplit.length;
		if (offset === 0) {
			container = newNodeBeforeSplit.parentNode;
			offset = nodeIndex(newNodeBeforeSplit);
		} else if (offset < newNodeLength) {
			container = newNodeBeforeSplit;
		} else if (offset === newNodeLength) {
			container = newNodeBeforeSplit.parentNode;
			offset = nodeIndex(newNodeBeforeSplit) + 1;
		} else {// offset > newNodeLength
			var newNodeAfterSplit = newNodeBeforeSplit.nextSibling;
			container = newNodeAfterSplit;
			offset -= newNodeLength;
		}
		range[setProp].call(range, container, offset);
	}