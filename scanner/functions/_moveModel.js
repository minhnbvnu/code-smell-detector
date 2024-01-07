function _moveModel() {
	  _moveModel = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(sourceURL, destURL) {
	    var deleteSource;
	    return regeneratorRuntime.wrap(function _callee5$(_context5) {
	      while (1) {
	        switch (_context5.prev = _context5.next) {
	          case 0:
	            deleteSource = true;
	            return _context5.abrupt("return", cloneModelInternal(sourceURL, destURL, deleteSource));

	          case 2:
	          case "end":
	            return _context5.stop();
	        }
	      }
	    }, _callee5);
	  }));
	  return _moveModel.apply(this, arguments);
	}