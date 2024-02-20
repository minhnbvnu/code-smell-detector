function keyCommandMoveSelectionToEndOfBlock(editorState) {
	  var selection = editorState.getSelection();
	  var endKey = selection.getEndKey();
	  var content = editorState.getCurrentContent();
	  var textLength = content.getBlockForKey(endKey).getLength();
	  return EditorState.set(editorState, {
	    selection: selection.merge({
	      anchorKey: endKey,
	      anchorOffset: textLength,
	      focusKey: endKey,
	      focusOffset: textLength,
	      isBackward: false
	    }),
	    forceSelection: true
	  });
	}