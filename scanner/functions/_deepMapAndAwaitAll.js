function _deepMapAndAwaitAll() {
	  _deepMapAndAwaitAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(input, mapFn) {
	    var seen, _i, _Array$from, key, value, mappedValue, result;

	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            seen = new Map(); // First do a normal deepMap, collecting Promises in 'seen' as a side effect.

	            deepMapInternal(input, mapFn, seen); // Replace the Promises in 'seen' in place.
	            // Note TypeScript provides no async map iteration, and regular map iteration
	            // is broken too, so sadly we have to do Array.from() to make it work.
	            // (There's no advantage to Promise.all(), and that would be tricky anyway.)

	            _i = 0, _Array$from = Array.from(seen.keys());

	          case 3:
	            if (!(_i < _Array$from.length)) {
	              _context.next = 14;
	              break;
	            }

	            key = _Array$from[_i];
	            value = seen.get(key);

	            if (!isPromise(value)) {
	              _context.next = 11;
	              break;
	            }

	            _context.next = 9;
	            return value;

	          case 9:
	            mappedValue = _context.sent;
	            seen.set(key, mappedValue);

	          case 11:
	            _i++;
	            _context.next = 3;
	            break;

	          case 14:
	            // Normal deepMap again, this time filling in the resolved values.
	            // It's unfortunate that we have to do two passes.
	            // TODO(soergel): test performance and think harder about a fast solution.
	            result = deepMapInternal(input, mapFn, seen);
	            return _context.abrupt("return", result);

	          case 16:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  }));
	  return _deepMapAndAwaitAll.apply(this, arguments);
	}