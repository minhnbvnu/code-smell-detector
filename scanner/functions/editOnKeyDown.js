function editOnKeyDown(editor, e) {
	  var keyCode = e.which;
	  var editorState = editor._latestEditorState;

	  switch (keyCode) {
	    case Keys.RETURN:
	      e.preventDefault();
	      // The top-level component may manually handle newline insertion. If
	      // no special handling is performed, fall through to command handling.
	      if (editor.props.handleReturn && isEventHandled(editor.props.handleReturn(e, editorState))) {
	        return;
	      }
	      break;
	    case Keys.ESC:
	      e.preventDefault();
	      editor.props.onEscape && editor.props.onEscape(e);
	      return;
	    case Keys.TAB:
	      editor.props.onTab && editor.props.onTab(e);
	      return;
	    case Keys.UP:
	      editor.props.onUpArrow && editor.props.onUpArrow(e);
	      return;
	    case Keys.RIGHT:
	      editor.props.onRightArrow && editor.props.onRightArrow(e);
	      return;
	    case Keys.DOWN:
	      editor.props.onDownArrow && editor.props.onDownArrow(e);
	      return;
	    case Keys.LEFT:
	      editor.props.onLeftArrow && editor.props.onLeftArrow(e);
	      return;
	    case Keys.SPACE:
	      // Handling for OSX where option + space scrolls.
	      if (isChrome && isOptionKeyCommand(e)) {
	        e.preventDefault();
	        // Insert a nbsp into the editor.
	        var contentState = DraftModifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), '\xA0');
	        editor.update(EditorState.push(editorState, contentState, 'insert-characters'));
	        return;
	      }
	  }

	  var command = editor.props.keyBindingFn(e);

	  // If no command is specified, allow keydown event to continue.
	  if (!command) {
	    return;
	  }

	  if (command === 'undo') {
	    // Since undo requires some special updating behavior to keep the editor
	    // in sync, handle it separately.
	    keyCommandUndo(e, editorState, editor.update);
	    return;
	  }

	  // At this point, we know that we're handling a command of some kind, so
	  // we don't want to insert a character following the keydown.
	  e.preventDefault();

	  // Allow components higher up the tree to handle the command first.
	  if (editor.props.handleKeyCommand && isEventHandled(editor.props.handleKeyCommand(command, editorState))) {
	    return;
	  }

	  var newState = onKeyCommand(command, editorState);
	  if (newState !== editorState) {
	    editor.update(newState);
	  }
	}