function _copyModel() {
	  _copyModel = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(sourceURL, destURL) {
	    var deleteSource;
	    return regeneratorRuntime.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            deleteSource = false;
	            return _context4.abrupt("return", cloneModelInternal(sourceURL, destURL, deleteSource));

	          case 2:
	          case "end":
	            return _context4.stop();
	        }
	      }
	    }, _callee4);
	  }));
	  return _copyModel.apply(this, arguments);
	}