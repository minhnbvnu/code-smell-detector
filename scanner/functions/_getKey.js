function _getKey(key, context) {
	  var _this = this;

	  var node = this.node;
	  var container = node[key];

	  if (Array.isArray(container)) {
	    return container.map(function (_, i) {
	      return _index2.default.get({
	        listKey: key,
	        parentPath: _this,
	        parent: node,
	        container: container,
	        key: i
	      }).setContext(context);
	    });
	  } else {
	    return _index2.default.get({
	      parentPath: this,
	      parent: node,
	      container: node,
	      key: key
	    }).setContext(context);
	  }
	}