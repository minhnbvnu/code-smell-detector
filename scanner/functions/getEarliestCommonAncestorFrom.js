function getEarliestCommonAncestorFrom(paths) {
	  return this.getDeepestCommonAncestorFrom(paths, function (deepest, i, ancestries) {
	    var earliest = void 0;
	    var keys = t.VISITOR_KEYS[deepest.type];

	    for (var _iterator = ancestries, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
	      var _ref;

	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref = _i.value;
	      }

	      var ancestry = _ref;

	      var path = ancestry[i + 1];

	      if (!earliest) {
	        earliest = path;
	        continue;
	      }

	      if (path.listKey && earliest.listKey === path.listKey) {
	        if (path.key < earliest.key) {
	          earliest = path;
	          continue;
	        }
	      }

	      var earliestKeyIndex = keys.indexOf(earliest.parentKey);
	      var currentKeyIndex = keys.indexOf(path.parentKey);
	      if (earliestKeyIndex > currentKeyIndex) {
	        earliest = path;
	      }
	    }

	    return earliest;
	  });
	}