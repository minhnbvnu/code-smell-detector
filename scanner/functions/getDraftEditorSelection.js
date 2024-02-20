function getDraftEditorSelection(editorState, root) {
	  var selection = global.getSelection();

	  // No active selection.
	  if (selection.rangeCount === 0) {
	    return {
	      selectionState: editorState.getSelection().set('hasFocus', false),
	      needsRecovery: false
	    };
	  }

	  return getDraftEditorSelectionWithNodes(editorState, root, selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);
	}