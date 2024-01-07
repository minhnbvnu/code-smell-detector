function _listModels() {
	  _listModels = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
	    var schemes, out, _iterator, _step, scheme, schemeOut, path, url;

	    return regeneratorRuntime.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            schemes = ModelStoreManagerRegistry.getSchemes();
	            out = {};
	            _iterator = _createForOfIteratorHelperLoose(schemes);

	          case 3:
	            if ((_step = _iterator()).done) {
	              _context2.next = 11;
	              break;
	            }

	            scheme = _step.value;
	            _context2.next = 7;
	            return ModelStoreManagerRegistry.getManager(scheme).listModels();

	          case 7:
	            schemeOut = _context2.sent;

	            for (path in schemeOut) {
	              url = scheme + URL_SCHEME_SUFFIX + path;
	              out[url] = schemeOut[path];
	            }

	          case 9:
	            _context2.next = 3;
	            break;

	          case 11:
	            return _context2.abrupt("return", out);

	          case 12:
	          case "end":
	            return _context2.stop();
	        }
	      }
	    }, _callee2);
	  }));
	  return _listModels.apply(this, arguments);
	}