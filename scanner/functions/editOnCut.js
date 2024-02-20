function editOnCut(editor, e) {
	  var editorState = editor._latestEditorState;
	  var selection = editorState.getSelection();
	  var element = e.target;
	  var scrollPosition = void 0;

	  // No selection, so there's nothing to cut.
	  if (selection.isCollapsed()) {
	    e.preventDefault();
	    return;
	  }

	  // Track the current scroll position so that it can be forced back in place
	  // after the editor regains control of the DOM.
	  if (element instanceof Node) {
	    scrollPosition = getScrollPosition(Style.getScrollParent(element));
	  }

	  var fragment = getFragmentFromSelection(editorState);
	  editor.setClipboard(fragment);

	  // Set `cut` mode to disable all event handling temporarily.
	  editor.setMode('cut');

	  // Let native `cut` behavior occur, then recover control.
	  setTimeout(function () {
	    editor.restoreEditorDOM(scrollPosition);
	    editor.exitCurrentMode();
	    editor.update(removeFragment(editorState));
	  }, 0);
	}