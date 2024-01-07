function unshiftContainer(listKey, nodes) {
	  this._assertUnremoved();

	  nodes = this._verifyNodeList(nodes);

	  var path = _index2.default.get({
	    parentPath: this,
	    parent: this.node,
	    container: this.node[listKey],
	    listKey: listKey,
	    key: 0
	  });

	  return path.insertBefore(nodes);
	}