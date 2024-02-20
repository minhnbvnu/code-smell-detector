function modifyBlockForContentState(contentState, selectionState, operation) {
	  var startKey = selectionState.getStartKey();
	  var endKey = selectionState.getEndKey();
	  var blockMap = contentState.getBlockMap();
	  var newBlocks = blockMap.toSeq().skipUntil(function (_, k) {
	    return k === startKey;
	  }).takeUntil(function (_, k) {
	    return k === endKey;
	  }).concat(Map([[endKey, blockMap.get(endKey)]])).map(operation);

	  return contentState.merge({
	    blockMap: blockMap.merge(newBlocks),
	    selectionBefore: selectionState,
	    selectionAfter: selectionState
	  });
	}