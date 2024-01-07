function _removeModel() {
	  _removeModel = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
	    var schemeAndPath, manager;
	    return regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            schemeAndPath = parseURL$1(url);
	            manager = ModelStoreManagerRegistry.getManager(schemeAndPath.scheme);
	            return _context3.abrupt("return", manager.removeModel(schemeAndPath.path));

	          case 3:
	          case "end":
	            return _context3.stop();
	        }
	      }
	    }, _callee3);
	  }));
	  return _removeModel.apply(this, arguments);
	}