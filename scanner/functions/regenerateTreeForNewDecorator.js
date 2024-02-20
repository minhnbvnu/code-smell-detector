function regenerateTreeForNewDecorator(content, blockMap, previousTreeMap, decorator, existingDecorator) {
	  return previousTreeMap.merge(blockMap.toSeq().filter(function (block) {
	    return decorator.getDecorations(block, content) !== existingDecorator.getDecorations(block, content);
	  }).map(function (block) {
	    return BlockTree.generate(content, block, decorator);
	  }));
	}