function getAllNextSiblings() {
	  var _key = this.key;
	  var sibling = this.getSibling(++_key);
	  var siblings = [];
	  while (sibling.node) {
	    siblings.push(sibling);
	    sibling = this.getSibling(++_key);
	  }
	  return siblings;
	}