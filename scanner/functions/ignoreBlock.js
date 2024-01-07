function ignoreBlock(path) {
	  return t.isLoop(path.parent) || t.isCatchClause(path.parent);
	}