function moveText(editorState, targetSelection) {
	  var newContentState = DraftModifier.moveText(editorState.getCurrentContent(), editorState.getSelection(), targetSelection);
	  return EditorState.push(editorState, newContentState, 'insert-fragment');
	}