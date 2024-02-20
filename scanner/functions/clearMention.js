function clearMention(editorState) {
	  var selection = editorState.getSelection();
	  var searchWord = (0, _getSearchWord2["default"])(editorState, selection);
	  var begin = searchWord.begin,
	      end = searchWord.end;

	  var replacedContent = _draftJs.Modifier.replaceText(editorState.getCurrentContent(), selection.merge({
	    anchorOffset: begin,
	    focusOffset: end
	  }), '', null);

	  var InsertSpaceContent = _draftJs.Modifier.insertText(replacedContent, replacedContent.getSelectionAfter(), ' ');

	  var newEditorState = _draftJs.EditorState.push(editorState, InsertSpaceContent, 'insert-mention');
	  return _draftJs.EditorState.forceSelection(newEditorState, InsertSpaceContent.getSelectionAfter());
	}