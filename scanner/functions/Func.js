function func(f) {
	  var iter = iteratorFromFunction(f);
	  return datasetFromIteratorFn( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            return _context.abrupt("return", iter);

	          case 1:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  })));
	}