function _loadLayersModelInternal() {
	  _loadLayersModelInternal = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(pathOrIOHandler, options) {
	    var handlers;
	    return regeneratorRuntime.wrap(function _callee6$(_context6) {
	      while (1) {
	        switch (_context6.prev = _context6.next) {
	          case 0:
	            if (options == null) {
	              options = {};
	            }

	            if (!(typeof pathOrIOHandler === 'string')) {
	              _context6.next = 10;
	              break;
	            }

	            handlers = getLoadHandlers(pathOrIOHandler, options);

	            if (!(handlers.length === 0)) {
	              _context6.next = 7;
	              break;
	            }

	            // For backward compatibility: if no load handler can be found,
	            // assume it is a relative http path.
	            // TODO(cais): Reformat the args into a single `LoadOptions` once the core
	            // is refactored.
	            handlers.push(browserHTTPRequest(pathOrIOHandler, options));
	            _context6.next = 9;
	            break;

	          case 7:
	            if (!(handlers.length > 1)) {
	              _context6.next = 9;
	              break;
	            }

	            throw new ValueError("Found more than one (" + handlers.length + ") load handlers for " + ("URL '" + pathOrIOHandler + "'"));

	          case 9:
	            pathOrIOHandler = handlers[0];

	          case 10:
	            return _context6.abrupt("return", loadLayersModelFromIOHandler(pathOrIOHandler, undefined, options));

	          case 11:
	          case "end":
	            return _context6.stop();
	        }
	      }
	    }, _callee6);
	  }));
	  return _loadLayersModelInternal.apply(this, arguments);
	}