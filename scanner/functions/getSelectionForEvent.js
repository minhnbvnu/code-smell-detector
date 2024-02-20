function getSelectionForEvent(event, editorState) {
	  var node = null;
	  var offset = null;

	  if (typeof document.caretRangeFromPoint === 'function') {
	    var dropRange = document.caretRangeFromPoint(event.x, event.y);
	    node = dropRange.startContainer;
	    offset = dropRange.startOffset;
	  } else if (event.rangeParent) {
	    node = event.rangeParent;
	    offset = event.rangeOffset;
	  } else {
	    return null;
	  }

	  node = nullthrows(node);
	  offset = nullthrows(offset);
	  var offsetKey = nullthrows(findAncestorOffsetKey(node));

	  return getUpdatedSelectionState(editorState, offsetKey, offset, offsetKey, offset);
	}