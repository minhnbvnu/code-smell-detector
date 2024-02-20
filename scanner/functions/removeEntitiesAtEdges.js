function removeEntitiesAtEdges(contentState, selectionState) {
	  var blockMap = contentState.getBlockMap();
	  var entityMap = contentState.getEntityMap();

	  var updatedBlocks = {};

	  var startKey = selectionState.getStartKey();
	  var startOffset = selectionState.getStartOffset();
	  var startBlock = blockMap.get(startKey);
	  var updatedStart = removeForBlock(entityMap, startBlock, startOffset);

	  if (updatedStart !== startBlock) {
	    updatedBlocks[startKey] = updatedStart;
	  }

	  var endKey = selectionState.getEndKey();
	  var endOffset = selectionState.getEndOffset();
	  var endBlock = blockMap.get(endKey);
	  if (startKey === endKey) {
	    endBlock = updatedStart;
	  }

	  var updatedEnd = removeForBlock(entityMap, endBlock, endOffset);

	  if (updatedEnd !== endBlock) {
	    updatedBlocks[endKey] = updatedEnd;
	  }

	  if (!Object.keys(updatedBlocks).length) {
	    return contentState.set('selectionAfter', selectionState);
	  }

	  return contentState.merge({
	    blockMap: blockMap.merge(updatedBlocks),
	    selectionAfter: selectionState
	  });
	}