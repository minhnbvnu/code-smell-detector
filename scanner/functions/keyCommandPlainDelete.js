function keyCommandPlainDelete(editorState) {
	  var afterRemoval = removeTextWithStrategy(editorState, function (strategyState) {
	    var selection = strategyState.getSelection();
	    var content = strategyState.getCurrentContent();
	    var key = selection.getAnchorKey();
	    var offset = selection.getAnchorOffset();
	    var charAhead = content.getBlockForKey(key).getText()[offset];
	    return moveSelectionForward(strategyState, charAhead ? UnicodeUtils.getUTF16Length(charAhead, 0) : 1);
	  }, 'forward');

	  if (afterRemoval === editorState.getCurrentContent()) {
	    return editorState;
	  }

	  var selection = editorState.getSelection();

	  return EditorState.push(editorState, afterRemoval.set('selectionBefore', selection), selection.isCollapsed() ? 'delete-character' : 'remove-range');
	}