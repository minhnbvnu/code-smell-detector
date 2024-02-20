function getUpdatedSelectionState(editorState, anchorKey, anchorOffset, focusKey, focusOffset) {
	  var selection = nullthrows(editorState.getSelection());
	  if (true) {
	    if (!anchorKey || !focusKey) {
	      /*eslint-disable no-console */
	      console.warn('Invalid selection state.', arguments, editorState.toJS());
	      /*eslint-enable no-console */
	      return selection;
	    }
	  }

	  var anchorPath = DraftOffsetKey.decode(anchorKey);
	  var anchorBlockKey = anchorPath.blockKey;
	  var anchorLeaf = editorState.getBlockTree(anchorBlockKey).getIn([anchorPath.decoratorKey, 'leaves', anchorPath.leafKey]);

	  var focusPath = DraftOffsetKey.decode(focusKey);
	  var focusBlockKey = focusPath.blockKey;
	  var focusLeaf = editorState.getBlockTree(focusBlockKey).getIn([focusPath.decoratorKey, 'leaves', focusPath.leafKey]);

	  var anchorLeafStart = anchorLeaf.get('start');
	  var focusLeafStart = focusLeaf.get('start');

	  var anchorBlockOffset = anchorLeaf ? anchorLeafStart + anchorOffset : null;
	  var focusBlockOffset = focusLeaf ? focusLeafStart + focusOffset : null;

	  var areEqual = selection.getAnchorKey() === anchorBlockKey && selection.getAnchorOffset() === anchorBlockOffset && selection.getFocusKey() === focusBlockKey && selection.getFocusOffset() === focusBlockOffset;

	  if (areEqual) {
	    return selection;
	  }

	  var isBackward = false;
	  if (anchorBlockKey === focusBlockKey) {
	    var anchorLeafEnd = anchorLeaf.get('end');
	    var focusLeafEnd = focusLeaf.get('end');
	    if (focusLeafStart === anchorLeafStart && focusLeafEnd === anchorLeafEnd) {
	      isBackward = focusOffset < anchorOffset;
	    } else {
	      isBackward = focusLeafStart < anchorLeafStart;
	    }
	  } else {
	    var startKey = editorState.getCurrentContent().getBlockMap().keySeq().skipUntil(function (v) {
	      return v === anchorBlockKey || v === focusBlockKey;
	    }).first();
	    isBackward = startKey === focusBlockKey;
	  }

	  return selection.merge({
	    anchorKey: anchorBlockKey,
	    anchorOffset: anchorBlockOffset,
	    focusKey: focusBlockKey,
	    focusOffset: focusBlockOffset,
	    isBackward: isBackward
	  });
	}