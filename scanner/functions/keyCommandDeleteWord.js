function keyCommandDeleteWord(editorState) {
	  var afterRemoval = removeTextWithStrategy(editorState, function (strategyState) {
	    var selection = strategyState.getSelection();
	    var offset = selection.getStartOffset();
	    var key = selection.getStartKey();
	    var content = strategyState.getCurrentContent();
	    var text = content.getBlockForKey(key).getText().slice(offset);
	    var toRemove = DraftRemovableWord.getForward(text);

	    // If there are no words in front of the cursor, remove the newline.
	    return moveSelectionForward(strategyState, toRemove.length || 1);
	  }, 'forward');

	  if (afterRemoval === editorState.getCurrentContent()) {
	    return editorState;
	  }

	  return EditorState.push(editorState, afterRemoval, 'remove-range');
	}