function insertSelectText(text, range) {
		// Because empty text nodes are generally not nice and even
		// cause problems with IE8 (elem.childNodes).
		if (!text.length) {
			return;
		}
		splitTextNodeAdjustRange(range.startContainer, range.startOffset, range);
		var node = nodeAtOffset(range.startContainer, range.startOffset);
		var atEnd = isAtEnd(range.startContainer, range.startOffset);
		// Because if the node following the insert position is already
		// a text node we can just reuse it.
		if (!atEnd && 3 === node.nodeType) {
			node.insertData(0, text);
			range.setStart(node, 0);
			range.setEnd(node, text.length);
			return;
		}
		// Because if the node preceding the insert position is already
		// a text node we can just reuse it.
		var prev;
		if (!atEnd) {
			prev = node.previousSibling;
		} else {
			prev = node.lastChild;
		}
		if (prev && 3 === prev.nodeType) {
			prev.insertData(prev.length, text);
			range.setStart(prev, prev.length - text.length);
			range.setEnd(prev, prev.length);
			return;
		}
		// Because if we can't reuse any text nodes, we have to insert a
		// new one.
		var textNode = document.createTextNode(text);
		insert(textNode, node, atEnd);
		range.setStart(textNode, 0);
		range.setEnd(textNode, textNode.length);
	}