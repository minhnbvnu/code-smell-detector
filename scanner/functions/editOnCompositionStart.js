function editOnCompositionStart(editor, e) {
	  editor.setMode('composite');
	  editor.update(EditorState.set(editor._latestEditorState, { inCompositionMode: true }));
	  // Allow composition handler to interpret the compositionstart event
	  editor._onCompositionStart(e);
	}