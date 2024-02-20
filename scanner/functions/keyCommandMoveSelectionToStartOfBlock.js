function keyCommandMoveSelectionToStartOfBlock(editorState) {
	  var selection = editorState.getSelection();
	  var startKey = selection.getStartKey();
	  return EditorState.set(editorState, {
	    selection: selection.merge({
	      anchorKey: startKey,
	      anchorOffset: 0,
	      focusKey: startKey,
	      focusOffset: 0,
	      isBackward: false
	    }),
	    forceSelection: true
	  });
	}