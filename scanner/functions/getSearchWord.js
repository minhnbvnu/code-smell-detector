function getSearchWord(editorState, selection) {
	  var anchorKey = selection.getAnchorKey();
	  var anchorOffset = selection.getAnchorOffset() - 1;
	  var currentContent = editorState.getCurrentContent();
	  var currentBlock = currentContent.getBlockForKey(anchorKey);
	  if (currentBlock) {
	    var blockText = currentBlock.getText();
	    return getWord(blockText, anchorOffset);
	  }
	  return '';
	}