function cloneWithoutLoc(node) {
	  var newNode = clone(node);
	  delete newNode.loc;
	  return newNode;
	}