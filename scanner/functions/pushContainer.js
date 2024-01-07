function pushContainer(listKey, nodes) {
	  this._assertUnremoved();

	  nodes = this._verifyNodeList(nodes);

	  var container = this.node[listKey];
	  var path = _index2.default.get({
	    parentPath: this,
	    parent: this.node,
	    container: container,
	    listKey: listKey,
	    key: container.length
	  });

	  return path.replaceWithMultiple(nodes);
	}