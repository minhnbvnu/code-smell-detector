function _containerInsert(from, nodes) {
	  this.updateSiblingKeys(from, nodes.length);

	  var paths = [];

	  for (var i = 0; i < nodes.length; i++) {
	    var to = from + i;
	    var node = nodes[i];
	    this.container.splice(to, 0, node);

	    if (this.context) {
	      var path = this.context.create(this.parent, this.container, to, this.listKey);

	      if (this.context.queue) path.pushContext(this.context);
	      paths.push(path);
	    } else {
	      paths.push(_index2.default.get({
	        parentPath: this.parentPath,
	        parent: this.parent,
	        container: this.container,
	        listKey: this.listKey,
	        key: to
	      }));
	    }
	  }

	  var contexts = this._getQueueContexts();

	  for (var _iterator = paths, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
	    var _ref;

	    if (_isArray) {
	      if (_i >= _iterator.length) break;
	      _ref = _iterator[_i++];
	    } else {
	      _i = _iterator.next();
	      if (_i.done) break;
	      _ref = _i.value;
	    }

	    var _path = _ref;

	    _path.setScope();
	    _path.debug(function () {
	      return "Inserted.";
	    });

	    for (var _iterator2 = contexts, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
	      var _ref2;

	      if (_isArray2) {
	        if (_i2 >= _iterator2.length) break;
	        _ref2 = _iterator2[_i2++];
	      } else {
	        _i2 = _iterator2.next();
	        if (_i2.done) break;
	        _ref2 = _i2.value;
	      }

	      var context = _ref2;

	      context.maybeQueue(_path, true);
	    }
	  }

	  return paths;
	}