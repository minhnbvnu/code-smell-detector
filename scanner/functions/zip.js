function zip(datasets) {
	  // manually type-check the argument for JS users
	  if (!isIterable$1(datasets)) {
	    throw new Error('The argument to zip() must be an object or array.');
	  }

	  var size;

	  if (Array.isArray(datasets)) {
	    for (var i = 0; i < datasets.length; i++) {
	      size = size == null ? datasets[i].size : Math.min(size, datasets[i].size);
	    }
	  } else if (datasets instanceof Object) {
	    for (var ds in datasets) {
	      size = size == null ? datasets[ds].size : Math.min(size, datasets[ds].size);
	    }
	  }

	  return datasetFromIteratorFn( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
	    var streams;
	    return regeneratorRuntime.wrap(function _callee17$(_context17) {
	      while (1) {
	        switch (_context17.prev = _context17.next) {
	          case 0:
	            _context17.next = 2;
	            return deepMapAndAwaitAll(datasets, function (d) {
	              if (d instanceof Dataset) {
	                return {
	                  value: d.iterator(),
	                  recurse: false
	                };
	              } else if (isIterable$1(d)) {
	                return {
	                  value: null,
	                  recurse: true
	                };
	              } else {
	                throw new Error('Leaves of the structure passed to zip() must be Datasets, ' + 'not primitives.');
	              }
	            });

	          case 2:
	            streams = _context17.sent;
	            return _context17.abrupt("return", iteratorFromZipped(streams, ZipMismatchMode.SHORTEST));

	          case 4:
	          case "end":
	            return _context17.stop();
	        }
	      }
	    }, _callee17);
	  })), size);
	}