function generateNewTreeMap(contentState, decorator) {
	  return contentState.getBlockMap().map(function (block) {
	    return BlockTree.generate(contentState, block, decorator);
	  }).toOrderedMap();
	}