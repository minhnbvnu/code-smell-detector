function _webcam() {
	  _webcam = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(webcamVideoElement, webcamConfig) {
	    return regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            return _context3.abrupt("return", WebcamIterator.create(webcamVideoElement, webcamConfig));

	          case 1:
	          case "end":
	            return _context3.stop();
	        }
	      }
	    }, _callee3);
	  }));
	  return _webcam.apply(this, arguments);
	}