function _whereAsync_() {
	  _whereAsync_ = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(condition) {
	    var $condition, vals, res;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            $condition = convertToTensor(condition, 'condition', 'whereAsync', 'bool');
	            _context.next = 3;
	            return $condition.data();

	          case 3:
	            vals = _context.sent;
	            res = whereImpl($condition.shape, vals);

	            if (condition !== $condition) {
	              $condition.dispose();
	            }

	            return _context.abrupt("return", res);

	          case 7:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  }));
	  return _whereAsync_.apply(this, arguments);
	}