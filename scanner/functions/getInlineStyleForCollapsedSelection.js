function getInlineStyleForCollapsedSelection(content, selection) {
	  var startKey = selection.getStartKey();
	  var startOffset = selection.getStartOffset();
	  var startBlock = content.getBlockForKey(startKey);

	  // If the cursor is not at the start of the block, look backward to
	  // preserve the style of the preceding character.
	  if (startOffset > 0) {
	    return startBlock.getInlineStyleAt(startOffset - 1);
	  }

	  // The caret is at position zero in this block. If the block has any
	  // text at all, use the style of the first character.
	  if (startBlock.getLength()) {
	    return startBlock.getInlineStyleAt(0);
	  }

	  // Otherwise, look upward in the document to find the closest character.
	  return lookUpwardForInlineStyle(content, startKey);
	}