function moveSelectionBackward(editorState, maxDistance) {
	  var selection = editorState.getSelection();
	  var content = editorState.getCurrentContent();
	  var key = selection.getStartKey();
	  var offset = selection.getStartOffset();

	  var focusKey = key;
	  var focusOffset = 0;

	  if (maxDistance > offset) {
	    var keyBefore = content.getKeyBefore(key);
	    if (keyBefore == null) {
	      focusKey = key;
	    } else {
	      focusKey = keyBefore;
	      var blockBefore = content.getBlockForKey(keyBefore);
	      focusOffset = blockBefore.getText().length;
	    }
	  } else {
	    focusOffset = offset - maxDistance;
	  }

	  return selection.merge({
	    focusKey: focusKey,
	    focusOffset: focusOffset,
	    isBackward: true
	  });
	}