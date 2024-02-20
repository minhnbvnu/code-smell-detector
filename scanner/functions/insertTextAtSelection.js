function insertTextAtSelection(editorState, selection, text) {
	  var newContentState = DraftModifier.insertText(editorState.getCurrentContent(), selection, text, editorState.getCurrentInlineStyle());
	  return EditorState.push(editorState, newContentState, 'insert-fragment');
	}