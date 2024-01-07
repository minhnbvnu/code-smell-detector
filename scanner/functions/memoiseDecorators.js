function memoiseDecorators(paths) {
	    if (!Array.isArray(paths) || !paths.length) return;

	    paths = paths.reverse();

	    (0, _babelHelperBindifyDecorators2.default)(paths);

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

	      var path = _ref;

	      maybeMemoise(path);
	    }
	  }