function _nonMaxSuppressionAsync_() {
	  _nonMaxSuppressionAsync_ = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold) {
	    var $boxes, $scores, inputs, boxesAndScores, boxesVals, scoresVals, _nonMaxSuppressionV3I, selectedIndices;

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

	            $boxes = convertToTensor(boxes, 'boxes', 'nonMaxSuppressionAsync');
	            $scores = convertToTensor(scores, 'scores', 'nonMaxSuppressionAsync');
	            inputs = nonMaxSuppSanityCheck($boxes, $scores, maxOutputSize, iouThreshold, scoreThreshold);
	            maxOutputSize = inputs.maxOutputSize;
	            iouThreshold = inputs.iouThreshold;
	            scoreThreshold = inputs.scoreThreshold;
	            _context.next = 10;
	            return Promise.all([$boxes.data(), $scores.data()]);

	          case 10:
	            boxesAndScores = _context.sent;
	            boxesVals = boxesAndScores[0];
	            scoresVals = boxesAndScores[1]; // We call a cpu based impl directly with the typedarray data  here rather
	            // than a kernel because all kernels are synchronous (and thus cannot await
	            // .data()).

	            _nonMaxSuppressionV3I = nonMaxSuppressionV3Impl(boxesVals, scoresVals, maxOutputSize, iouThreshold, scoreThreshold), selectedIndices = _nonMaxSuppressionV3I.selectedIndices;

	            if ($boxes !== boxes) {
	              $boxes.dispose();
	            }

	            if ($scores !== scores) {
	              $scores.dispose();
	            }

	            return _context.abrupt("return", tensor1d(selectedIndices, 'int32'));

	          case 17:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  }));
	  return _nonMaxSuppressionAsync_.apply(this, arguments);
	}