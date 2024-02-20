function editOnSelect(editor) {
	  if (editor._blockSelectEvents || editor._latestEditorState !== editor.props.editorState) {
	    return;
	  }

	  var editorState = editor.props.editorState;
	  var editorNode = ReactDOM.findDOMNode(editor.editorContainer);
	  !editorNode ?  true ? invariant(false, 'Missing editorNode') : invariant(false) : void 0;
	  !(editorNode.firstChild instanceof HTMLElement) ?  true ? invariant(false, 'editorNode.firstChild is not an HTMLElement') : invariant(false) : void 0;
	  var documentSelection = getDraftEditorSelection(editorState, editorNode.firstChild);
	  var updatedSelectionState = documentSelection.selectionState;

	  if (updatedSelectionState !== editorState.getSelection()) {
	    if (documentSelection.needsRecovery) {
	      editorState = EditorState.forceSelection(editorState, updatedSelectionState);
	    } else {
	      editorState = EditorState.acceptSelection(editorState, updatedSelectionState);
	    }
	    editor.update(editorState);
	  }
	}