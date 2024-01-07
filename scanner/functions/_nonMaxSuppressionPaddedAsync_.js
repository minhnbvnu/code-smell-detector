function _nonMaxSuppressionPaddedAsync_() {
	  _nonMaxSuppressionPaddedAsync_ = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, padToMaxOutputSize) {
	    var $boxes, $scores, params, $maxOutputSize, $iouThreshold, $scoreThreshold, _yield$Promise$all, boxesVals, scoresVals, _nonMaxSuppressionV4I, selectedIndices, validOutputs;

	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            if (iouThreshold === void 0) {
	              iouThreshold = 0.5;
	            }

	            if (scoreThreshold === void 0) {
	              scoreThreshold = Number.NEGATIVE_INFINITY;
	            }

	            if (padToMaxOutputSize === void 0) {
	              padToMaxOutputSize = false;
	            }

	            $boxes = convertToTensor(boxes, 'boxes', 'nonMaxSuppressionAsync');
	            $scores = convertToTensor(scores, 'scores', 'nonMaxSuppressionAsync');
	            params = nonMaxSuppSanityCheck($boxes, $scores, maxOutputSize, iouThreshold, scoreThreshold, null
	            /* softNmsSigma */
	            );
	            $maxOutputSize = params.maxOutputSize;
	            $iouThreshold = params.iouThreshold;
	            $scoreThreshold = params.scoreThreshold;
	            _context.next = 11;
	            return Promise.all([$boxes.data(), $scores.data()]);

	          case 11:
	            _yield$Promise$all = _context.sent;
	            boxesVals = _yield$Promise$all[0];
	            scoresVals = _yield$Promise$all[1];
	            // We call a cpu based impl directly with the typedarray data here rather
	            // than a kernel because all kernels are synchronous (and thus cannot await
	            // .data()).
	            _nonMaxSuppressionV4I = nonMaxSuppressionV4Impl(boxesVals, scoresVals, $maxOutputSize, $iouThreshold, $scoreThreshold, padToMaxOutputSize), selectedIndices = _nonMaxSuppressionV4I.selectedIndices, validOutputs = _nonMaxSuppressionV4I.validOutputs;

	            if ($boxes !== boxes) {
	              $boxes.dispose();
	            }

	            if ($scores !== scores) {
	              $scores.dispose();
	            }

	            return _context.abrupt("return", {
	              selectedIndices: tensor1d(selectedIndices, 'int32'),
	              validOutputs: scalar(validOutputs, 'int32')
	            });

	          case 18:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  }));
	  return _nonMaxSuppressionPaddedAsync_.apply(this, arguments);
	}