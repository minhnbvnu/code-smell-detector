function regenerateTreeForNewBlocks(editorState, newBlockMap, newEntityMap, decorator) {
	  var contentState = editorState.getCurrentContent().set('entityMap', newEntityMap);
	  var prevBlockMap = contentState.getBlockMap();
	  var prevTreeMap = editorState.getImmutable().get('treeMap');
	  return prevTreeMap.merge(newBlockMap.toSeq().filter(function (block, key) {
	    return block !== prevBlockMap.get(key);
	  }).map(function (block) {
	    return BlockTree.generate(contentState, block, decorator);
	  }));
	}