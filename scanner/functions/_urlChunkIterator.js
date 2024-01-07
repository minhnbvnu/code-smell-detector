function _urlChunkIterator() {
	  _urlChunkIterator = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, options) {
	    var urlString, requestInit, response, uint8Array;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            if (options === void 0) {
	              options = {};
	            }

	            if (typeof url === 'string') {
	              urlString = url;
	            } else {
	              urlString = url.url;
	              requestInit = getRequestInitFromRequest(url);
	            }

	            _context.next = 4;
	            return fetch$1(urlString, requestInit);

	          case 4:
	            response = _context.sent;

	            if (!response.ok) {
	              _context.next = 14;
	              break;
	            }

	            _context.t0 = Uint8Array;
	            _context.next = 9;
	            return response.arrayBuffer();

	          case 9:
	            _context.t1 = _context.sent;
	            uint8Array = new _context.t0(_context.t1);
	            return _context.abrupt("return", new FileChunkIterator(uint8Array, options));

	          case 14:
	            throw new Error(response.statusText);

	          case 15:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  }));
	  return _urlChunkIterator.apply(this, arguments);
	}