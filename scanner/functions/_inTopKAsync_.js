function _inTopKAsync_() {
	  _inTopKAsync_ = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(predictions, targets, k) {
	    var $predictions, $targets, lastDim, predictionsVals, targetsVals, batch, size, precision, b, offset, vals, valAndInd, i, _i;

	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            if (k === void 0) {
	              k = 1;
	            }

	            $predictions = convertToTensor(predictions, 'predictions', 'inTopK');
	            $targets = convertToTensor(targets, 'targets', 'inTopK');
	            assert($predictions.rank > 1, function () {
	              return 'inTopK() expects the predictions to be of rank 2 or higher, ' + ("but got " + $predictions.rank);
	            });
	            assert($predictions.rank - 1 === $targets.rank, function () {
	              return "predictions rank should be 1 larger than " + "targets rank, but got predictions rank " + ($predictions.rank + " and targets rank " + $targets.rank);
	            });
	            assertShapesMatch($predictions.shape.slice(0, $predictions.shape.length - 1), $targets.shape, "predictions's shape should be align with the targets' shape, " + 'except the last dimension.');
	            lastDim = $predictions.shape[$predictions.shape.length - 1];
	            assert(k > 0 && k <= lastDim, function () {
	              return "'k' passed to inTopK() must be > 0 && <= the predictions last " + ("dimension (" + lastDim + "), but got " + k);
	            });
	            _context.next = 10;
	            return $predictions.data();

	          case 10:
	            predictionsVals = _context.sent;
	            _context.next = 13;
	            return $targets.data();

	          case 13:
	            targetsVals = _context.sent;
	            // Reshape predictionsVals into a 2d tensor [batch, lastDim]
	            // and look up topK along lastDim.
	            batch = predictionsVals.length / lastDim, size = lastDim;
	            precision = getTypedArrayFromDType('bool', batch);
	            b = 0;

	          case 17:
	            if (!(b < batch)) {
	              _context.next = 35;
	              break;
	            }

	            offset = b * size;
	            vals = predictionsVals.subarray(offset, offset + size);
	            valAndInd = [];

	            for (i = 0; i < vals.length; i++) {
	              valAndInd.push({
	                value: vals[i],
	                index: i
	              });
	            }

	            valAndInd.sort(function (a, b) {
	              return b.value - a.value;
	            });
	            precision[b] = 0;
	            _i = 0;

	          case 25:
	            if (!(_i < k)) {
	              _context.next = 32;
	              break;
	            }

	            if (!(valAndInd[_i].index === targetsVals[b])) {
	              _context.next = 29;
	              break;
	            }

	            precision[b] = 1;
	            return _context.abrupt("break", 32);

	          case 29:
	            _i++;
	            _context.next = 25;
	            break;

	          case 32:
	            b++;
	            _context.next = 17;
	            break;

	          case 35:
	            if (predictions !== $predictions) {
	              $predictions.dispose();
	            }

	            if (targets !== $targets) {
	              $targets.dispose();
	            } // Output precision has the same shape as targets.


	            return _context.abrupt("return", tensor(precision, $targets.shape, 'bool'));

	          case 38:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  }));
	  return _inTopKAsync_.apply(this, arguments);
	}