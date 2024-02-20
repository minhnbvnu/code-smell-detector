function keyCommandBackspaceWord(editorState) {
	  var afterRemoval = removeTextWithStrategy(editorState, function (strategyState) {
	    var selection = strategyState.getSelection();
	    var offset = selection.getStartOffset();
	    // If there are no words before the cursor, remove the preceding newline.
	    if (offset === 0) {
	      return moveSelectionBackward(strategyState, 1);
	    }
	    var key = selection.getStartKey();
	    var content = strategyState.getCurrentContent();
	    var text = content.getBlockForKey(key).getText().slice(0, offset);
	    var toRemove = DraftRemovableWord.getBackward(text);
	    return moveSelectionBackward(strategyState, toRemove.length || 1);
	  }, 'backward');

	  if (afterRemoval === editorState.getCurrentContent()) {
	    return editorState;
	  }

	  return EditorState.push(editorState, afterRemoval, 'remove-range');
	}