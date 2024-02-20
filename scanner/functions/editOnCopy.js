function editOnCopy(editor, e) {
	  var editorState = editor._latestEditorState;
	  var selection = editorState.getSelection();

	  // No selection, so there's nothing to copy.
	  if (selection.isCollapsed()) {
	    e.preventDefault();
	    return;
	  }

	  editor.setClipboard(getFragmentFromSelection(editor._latestEditorState));
	}