function finishNodeAt(node, type, pos, loc) {
	  node.type = type;
	  node.end = pos;
	  node.loc.end = loc;
	  this.processComment(node);
	  return node;
	}