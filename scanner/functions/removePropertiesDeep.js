function removePropertiesDeep(tree, opts) {
	  traverseFast(tree, removeProperties, opts);
	  return tree;
	}