function moveSelectionForward(editorState, maxDistance) {
	  var selection = editorState.getSelection();
	  var key = selection.getStartKey();
	  var offset = selection.getStartOffset();
	  var content = editorState.getCurrentContent();

	  var focusKey = key;
	  var focusOffset;

	  var block = content.getBlockForKey(key);

	  if (maxDistance > block.getText().length - offset) {
	    focusKey = content.getKeyAfter(key);
	    focusOffset = 0;
	  } else {
	    focusOffset = offset + maxDistance;
	  }

	  return selection.merge({ focusKey: focusKey, focusOffset: focusOffset });
	}