function removeFragment(editorState) {
	  var newContent = DraftModifier.removeRange(editorState.getCurrentContent(), editorState.getSelection(), 'forward');
	  return EditorState.push(editorState, newContent, 'remove-range');
	}