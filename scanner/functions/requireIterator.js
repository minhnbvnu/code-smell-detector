function requireIterator() {
	  if (hasRequiredIterator) return iterator;
	  hasRequiredIterator = 1;
	  iterator = function iterator(Yallist) {
	    Yallist.prototype[Symbol.iterator] = _regeneratorRuntime().mark(function _callee() {
	      var walker;
	      return _regeneratorRuntime().wrap(function _callee$(_context) {
	        while (1) switch (_context.prev = _context.next) {
	          case 0:
	            walker = this.head;
	          case 1:
	            if (!walker) {
	              _context.next = 7;
	              break;
	            }
	            _context.next = 4;
	            return walker.value;
	          case 4:
	            walker = walker.next;
	            _context.next = 1;
	            break;
	          case 7:
	          case "end":
	            return _context.stop();
	        }
	      }, _callee, this);
	    });
	  };
	  return iterator;
	}