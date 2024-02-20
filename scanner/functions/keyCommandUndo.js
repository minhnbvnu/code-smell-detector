function keyCommandUndo(e, editorState, updateFn) {
	  var undoneState = EditorState.undo(editorState);

	  // If the last change to occur was a spellcheck change, allow the undo
	  // event to fall through to the browser. This allows the browser to record
	  // the unwanted change, which should soon lead it to learn not to suggest
	  // the correction again.
	  if (editorState.getLastChangeType() === 'spellcheck-change') {
	    var nativelyRenderedContent = undoneState.getCurrentContent();
	    updateFn(EditorState.set(undoneState, { nativelyRenderedContent: nativelyRenderedContent }));
	    return;
	  }

	  // Otheriwse, manage the undo behavior manually.
	  e.preventDefault();
	  if (!editorState.getNativelyRenderedContent()) {
	    updateFn(undoneState);
	    return;
	  }

	  // Trigger a re-render with the current content state to ensure that the
	  // component tree has up-to-date props for comparison.
	  updateFn(EditorState.set(editorState, { nativelyRenderedContent: null }));

	  // Wait to ensure that the re-render has occurred before performing
	  // the undo action.
	  setTimeout(function () {
	    updateFn(undoneState);
	  }, 0);
	}