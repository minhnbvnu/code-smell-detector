function array(items) {
	  return datasetFromIteratorFn( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
	    return regeneratorRuntime.wrap(function _callee16$(_context16) {
	      while (1) {
	        switch (_context16.prev = _context16.next) {
	          case 0:
	            return _context16.abrupt("return", iteratorFromItems(items));

	          case 1:
	          case "end":
	            return _context16.stop();
	        }
	      }
	    }, _callee16);
	  })), items.length);
	}