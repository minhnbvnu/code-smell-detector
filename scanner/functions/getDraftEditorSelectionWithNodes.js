function getDraftEditorSelectionWithNodes(editorState, root, anchorNode, anchorOffset, focusNode, focusOffset) {
	  var anchorIsTextNode = anchorNode.nodeType === Node.TEXT_NODE;
	  var focusIsTextNode = focusNode.nodeType === Node.TEXT_NODE;

	  // If the selection range lies only on text nodes, the task is simple.
	  // Find the nearest offset-aware elements and use the
	  // offset values supplied by the selection range.
	  if (anchorIsTextNode && focusIsTextNode) {
	    return {
	      selectionState: getUpdatedSelectionState(editorState, nullthrows(findAncestorOffsetKey(anchorNode)), anchorOffset, nullthrows(findAncestorOffsetKey(focusNode)), focusOffset),
	      needsRecovery: false
	    };
	  }

	  var anchorPoint = null;
	  var focusPoint = null;
	  var needsRecovery = true;

	  // An element is selected. Convert this selection range into leaf offset
	  // keys and offset values for consumption at the component level. This
	  // is common in Firefox, where select-all and triple click behavior leads
	  // to entire elements being selected.
	  //
	  // Note that we use the `needsRecovery` parameter in the callback here. This
	  // is because when certain elements are selected, the behavior for subsequent
	  // cursor movement (e.g. via arrow keys) is uncertain and may not match
	  // expectations at the component level. For example, if an entire <div> is
	  // selected and the user presses the right arrow, Firefox keeps the selection
	  // on the <div>. If we allow subsequent keypresses to insert characters
	  // natively, they will be inserted into a browser-created text node to the
	  // right of that <div>. This is obviously undesirable.
	  //
	  // With the `needsRecovery` flag, we inform the caller that it is responsible
	  // for manually setting the selection state on the rendered document to
	  // ensure proper selection state maintenance.

	  if (anchorIsTextNode) {
	    anchorPoint = {
	      key: nullthrows(findAncestorOffsetKey(anchorNode)),
	      offset: anchorOffset
	    };
	    focusPoint = getPointForNonTextNode(root, focusNode, focusOffset);
	  } else if (focusIsTextNode) {
	    focusPoint = {
	      key: nullthrows(findAncestorOffsetKey(focusNode)),
	      offset: focusOffset
	    };
	    anchorPoint = getPointForNonTextNode(root, anchorNode, anchorOffset);
	  } else {
	    anchorPoint = getPointForNonTextNode(root, anchorNode, anchorOffset);
	    focusPoint = getPointForNonTextNode(root, focusNode, focusOffset);

	    // If the selection is collapsed on an empty block, don't force recovery.
	    // This way, on arrow key selection changes, the browser can move the
	    // cursor from a non-zero offset on one block, through empty blocks,
	    // to a matching non-zero offset on other text blocks.
	    if (anchorNode === focusNode && anchorOffset === focusOffset) {
	      needsRecovery = !!anchorNode.firstChild && anchorNode.firstChild.nodeName !== 'BR';
	    }
	  }

	  return {
	    selectionState: getUpdatedSelectionState(editorState, anchorPoint.key, anchorPoint.offset, focusPoint.key, focusPoint.offset),
	    needsRecovery: needsRecovery
	  };
	}