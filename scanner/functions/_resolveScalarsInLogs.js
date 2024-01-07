function _resolveScalarsInLogs() {
	  _resolveScalarsInLogs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(logs) {
	    var promises, keys, scalarsToDispose, key, value, valueScalar, values, i;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            if (!(logs == null)) {
	              _context.next = 2;
	              break;
	            }

	            return _context.abrupt("return");

	          case 2:
	            promises = [];
	            keys = [];
	            scalarsToDispose = [];

	            for (key in logs) {
	              value = logs[key];

	              if (typeof value !== 'number') {
	                valueScalar = value;
	                promises.push(valueScalar.data());
	                keys.push(key);
	                scalarsToDispose.push(valueScalar);
	              }
	            }

	            if (!(promises.length > 0)) {
	              _context.next = 12;
	              break;
	            }

	            _context.next = 9;
	            return Promise.all(promises);

	          case 9:
	            values = _context.sent;

	            for (i = 0; i < values.length; ++i) {
	              logs[keys[i]] = values[i][0];
	            } // Dispose the original scalar tensors.


	            dispose(scalarsToDispose);

	          case 12:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  }));
	  return _resolveScalarsInLogs.apply(this, arguments);
	}