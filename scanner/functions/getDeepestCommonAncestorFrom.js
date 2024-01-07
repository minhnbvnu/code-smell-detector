function getDeepestCommonAncestorFrom(paths, filter) {
	  var _this = this;

	  if (!paths.length) {
	    return this;
	  }

	  if (paths.length === 1) {
	    return paths[0];
	  }

	  var minDepth = Infinity;

	  var lastCommonIndex = void 0,
	      lastCommon = void 0;

	  var ancestries = paths.map(function (path) {
	    var ancestry = [];

	    do {
	      ancestry.unshift(path);
	    } while ((path = path.parentPath) && path !== _this);

	    if (ancestry.length < minDepth) {
	      minDepth = ancestry.length;
	    }

	    return ancestry;
	  });

	  var first = ancestries[0];

	  depthLoop: for (var i = 0; i < minDepth; i++) {
	    var shouldMatch = first[i];

	    for (var _iterator2 = ancestries, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
	      var _ref2;

	      if (_isArray2) {
	        if (_i2 >= _iterator2.length) break;
	        _ref2 = _iterator2[_i2++];
	      } else {
	        _i2 = _iterator2.next();
	        if (_i2.done) break;
	        _ref2 = _i2.value;
	      }

	      var ancestry = _ref2;

	      if (ancestry[i] !== shouldMatch) {
	        break depthLoop;
	      }
	    }

	    lastCommonIndex = i;
	    lastCommon = shouldMatch;
	  }

	  if (lastCommon) {
	    if (filter) {
	      return filter(lastCommon, lastCommonIndex, ancestries);
	    } else {
	      return lastCommon;
	    }
	  } else {
	    throw new Error("Couldn't find intersection");
	  }
	}