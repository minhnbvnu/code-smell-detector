function generator(generator) {
	  return datasetFromIteratorFn( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
	    var gen;
	    return regeneratorRuntime.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _context2.next = 2;
	            return generator();

	          case 2:
	            gen = _context2.sent;
	            return _context2.abrupt("return", iteratorFromFunction(function () {
	              return gen.next();
	            }));

	          case 4:
	          case "end":
	            return _context2.stop();
	        }
	      }
	    }, _callee2);
	  })));
	}