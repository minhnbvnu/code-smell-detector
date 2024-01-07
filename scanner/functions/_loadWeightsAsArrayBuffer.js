function _loadWeightsAsArrayBuffer() {
	  _loadWeightsAsArrayBuffer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(fetchURLs, loadOptions) {
	    var fetchFunc, requests, fetchStartFraction, fetchEndFraction, responses, bufferPromises, bufferStartFraction, bufferEndFraction, buffers;
	    return regeneratorRuntime.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            if (loadOptions == null) {
	              loadOptions = {};
	            }

	            fetchFunc = loadOptions.fetchFunc == null ? env().platform.fetch : loadOptions.fetchFunc; // Create the requests for all of the weights in parallel.

	            requests = fetchURLs.map(function (fetchURL) {
	              return fetchFunc(fetchURL, loadOptions.requestInit, {
	                isBinary: true
	              });
	            });
	            fetchStartFraction = 0;
	            fetchEndFraction = 0.5;

	            if (!(loadOptions.onProgress == null)) {
	              _context2.next = 11;
	              break;
	            }

	            _context2.next = 8;
	            return Promise.all(requests);

	          case 8:
	            _context2.t0 = _context2.sent;
	            _context2.next = 14;
	            break;

	          case 11:
	            _context2.next = 13;
	            return monitorPromisesProgress(requests, loadOptions.onProgress, fetchStartFraction, fetchEndFraction);

	          case 13:
	            _context2.t0 = _context2.sent;

	          case 14:
	            responses = _context2.t0;
	            bufferPromises = responses.map(function (response) {
	              return response.arrayBuffer();
	            });
	            bufferStartFraction = 0.5;
	            bufferEndFraction = 1;

	            if (!(loadOptions.onProgress == null)) {
	              _context2.next = 24;
	              break;
	            }

	            _context2.next = 21;
	            return Promise.all(bufferPromises);

	          case 21:
	            _context2.t1 = _context2.sent;
	            _context2.next = 27;
	            break;

	          case 24:
	            _context2.next = 26;
	            return monitorPromisesProgress(bufferPromises, loadOptions.onProgress, bufferStartFraction, bufferEndFraction);

	          case 26:
	            _context2.t1 = _context2.sent;

	          case 27:
	            buffers = _context2.t1;
	            return _context2.abrupt("return", buffers);

	          case 29:
	          case "end":
	            return _context2.stop();
	        }
	      }
	    }, _callee2);
	  }));
	  return _loadWeightsAsArrayBuffer.apply(this, arguments);
	}