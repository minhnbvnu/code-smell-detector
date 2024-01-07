function _loadWeights() {
	  _loadWeights = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(manifest, filePathPrefix, weightNames, requestInit) {
	    var fetchWeights, loadWeights;
	    return regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            if (filePathPrefix === void 0) {
	              filePathPrefix = '';
	            }

	            // TODO(nsthorat): Groups are currently fetched atomically. If you need a
	            // single weight from a group, the whole group will be fetched. At a future
	            // date, we should support fetching only the individual shards within a
	            // group that are needed to reconstruct the requested weight.
	            // TODO(cais): Use `decodeWeights` for implementation.
	            fetchWeights = function fetchWeights(fetchUrls) {
	              return loadWeightsAsArrayBuffer(fetchUrls, {
	                requestInit: requestInit
	              });
	            };

	            loadWeights = weightsLoaderFactory(fetchWeights);
	            return _context3.abrupt("return", loadWeights(manifest, filePathPrefix, weightNames));

	          case 4:
	          case "end":
	            return _context3.stop();
	        }
	      }
	    }, _callee3);
	  }));
	  return _loadWeights.apply(this, arguments);
	}