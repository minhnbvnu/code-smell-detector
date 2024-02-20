function insertMention(editorState, mention, data, mode) {
	  var entityMode = mode === 'immutable' ? 'IMMUTABLE' : 'MUTABLE';
	  var selection = editorState.getSelection();
	  var contentState = editorState.getCurrentContent();

	  contentState.createEntity('mention', entityMode, data || mention);
	  var searchWord = (0, _getSearchWord2["default"])(editorState, selection);
	  var begin = searchWord.begin,
	      end = searchWord.end;

	  var replacedContent = _draftJs.Modifier.replaceText(contentState, selection.merge({
	    anchorOffset: begin,
	    focusOffset: end
	  }), mention, null, contentState.getLastCreatedEntityKey());

	  var InsertSpaceContent = _draftJs.Modifier.insertText(replacedContent, replacedContent.getSelectionAfter(), ' ');

	  var newEditorState = _draftJs.EditorState.push(editorState, InsertSpaceContent, 'insert-mention');
	  return _draftJs.EditorState.forceSelection(newEditorState, InsertSpaceContent.getSelectionAfter());
	}