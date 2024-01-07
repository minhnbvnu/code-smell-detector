function _setdiff1dAsync_() {
	  _setdiff1dAsync_ = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(x, y) {
	    var $x, $y, xVals, yVals, ySet, outputSize, i, buffer, indices, _i, p;

	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            $x = convertToTensor(x, 'x', 'setdiff1d');
	            $y = convertToTensor(y, 'y', 'setdiff1d');
	            assert($x.dtype === $y.dtype, function () {
	              return "x and y should have the same dtype, but got x (" + $x.dtype + ") and y (" + $y.dtype + ").";
	            });
	            assert($x.rank === 1, function () {
	              return "x should be 1D tensor, but got x (" + $x.shape + ").";
	            });
	            assert($y.rank === 1, function () {
	              return "y should be 1D tensor, but got y (" + $y.shape + ").";
	            });
	            _context.next = 7;
	            return $x.data();

	          case 7:
	            xVals = _context.sent;
	            _context.next = 10;
	            return $y.data();

	          case 10:
	            yVals = _context.sent;
	            ySet = new Set(yVals);
	            outputSize = 0;

	            for (i = 0; i < xVals.length; i++) {
	              if (!ySet.has(xVals[i])) {
	                outputSize++;
	              }
	            }

	            buffer = new TensorBuffer([outputSize], $x.dtype);
	            indices = new TensorBuffer([outputSize], 'int32');

	            for (_i = 0, p = 0; _i < xVals.length; _i++) {
	              if (!ySet.has(xVals[_i])) {
	                buffer.values[p] = xVals[_i];
	                indices.values[p] = _i;
	                p++;
	              }
	            }

	            return _context.abrupt("return", [buffer.toTensor(), indices.toTensor()]);

	          case 18:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  }));
	  return _setdiff1dAsync_.apply(this, arguments);
	}