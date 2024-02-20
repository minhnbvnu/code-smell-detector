function setDraftEditorSelection(selectionState, node, blockKey, nodeStart, nodeEnd) {
	  // It's possible that the editor has been removed from the DOM but
	  // our selection code doesn't know it yet. Forcing selection in
	  // this case may lead to errors, so just bail now.
	  if (!containsNode(document.documentElement, node)) {
	    return;
	  }

	  var selection = global.getSelection();
	  var anchorKey = selectionState.getAnchorKey();
	  var anchorOffset = selectionState.getAnchorOffset();
	  var focusKey = selectionState.getFocusKey();
	  var focusOffset = selectionState.getFocusOffset();
	  var isBackward = selectionState.getIsBackward();

	  // IE doesn't support backward selection. Swap key/offset pairs.
	  if (!selection.extend && isBackward) {
	    var tempKey = anchorKey;
	    var tempOffset = anchorOffset;
	    anchorKey = focusKey;
	    anchorOffset = focusOffset;
	    focusKey = tempKey;
	    focusOffset = tempOffset;
	    isBackward = false;
	  }

	  var hasAnchor = anchorKey === blockKey && nodeStart <= anchorOffset && nodeEnd >= anchorOffset;

	  var hasFocus = focusKey === blockKey && nodeStart <= focusOffset && nodeEnd >= focusOffset;

	  // If the selection is entirely bound within this node, set the selection
	  // and be done.
	  if (hasAnchor && hasFocus) {
	    selection.removeAllRanges();
	    addPointToSelection(selection, node, anchorOffset - nodeStart, selectionState);
	    addFocusToSelection(selection, node, focusOffset - nodeStart, selectionState);
	    return;
	  }

	  if (!isBackward) {
	    // If the anchor is within this node, set the range start.
	    if (hasAnchor) {
	      selection.removeAllRanges();
	      addPointToSelection(selection, node, anchorOffset - nodeStart, selectionState);
	    }

	    // If the focus is within this node, we can assume that we have
	    // already set the appropriate start range on the selection, and
	    // can simply extend the selection.
	    if (hasFocus) {
	      addFocusToSelection(selection, node, focusOffset - nodeStart, selectionState);
	    }
	  } else {
	    // If this node has the focus, set the selection range to be a
	    // collapsed range beginning here. Later, when we encounter the anchor,
	    // we'll use this information to extend the selection.
	    if (hasFocus) {
	      selection.removeAllRanges();
	      addPointToSelection(selection, node, focusOffset - nodeStart, selectionState);
	    }

	    // If this node has the anchor, we may assume that the correct
	    // focus information is already stored on the selection object.
	    // We keep track of it, reset the selection range, and extend it
	    // back to the focus point.
	    if (hasAnchor) {
	      var storedFocusNode = selection.focusNode;
	      var storedFocusOffset = selection.focusOffset;

	      selection.removeAllRanges();
	      addPointToSelection(selection, node, anchorOffset - nodeStart, selectionState);
	      addFocusToSelection(selection, storedFocusNode, storedFocusOffset, selectionState);
	    }
	  }
	}