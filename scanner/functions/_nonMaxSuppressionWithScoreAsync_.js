function _nonMaxSuppressionWithScoreAsync_() {
	  _nonMaxSuppressionWithScoreAsync_ = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma) {
	    var $boxes, $scores, params, boxesAndScores, boxesVals, scoresVals, _nonMaxSuppressionV5I, selectedIndices, selectedScores;

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

	            if (softNmsSigma === void 0) {
	              softNmsSigma = 0.0;
	            }

	            $boxes = convertToTensor(boxes, 'boxes', 'nonMaxSuppressionAsync');
	            $scores = convertToTensor(scores, 'scores', 'nonMaxSuppressionAsync');
	            params = nonMaxSuppSanityCheck($boxes, $scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma);
	            maxOutputSize = params.maxOutputSize;
	            iouThreshold = params.iouThreshold;
	            scoreThreshold = params.scoreThreshold;
	            softNmsSigma = params.softNmsSigma;
	            _context.next = 12;
	            return Promise.all([$boxes.data(), $scores.data()]);

	          case 12:
	            boxesAndScores = _context.sent;
	            boxesVals = boxesAndScores[0];
	            scoresVals = boxesAndScores[1]; // We call a cpu based impl directly with the typedarray data  here rather
	            // than a kernel because all kernels are synchronous (and thus cannot await
	            // .data()).

	            _nonMaxSuppressionV5I = nonMaxSuppressionV5Impl(boxesVals, scoresVals, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma), selectedIndices = _nonMaxSuppressionV5I.selectedIndices, selectedScores = _nonMaxSuppressionV5I.selectedScores;

	            if ($boxes !== boxes) {
	              $boxes.dispose();
	            }

	            if ($scores !== scores) {
	              $scores.dispose();
	            }

	            return _context.abrupt("return", {
	              selectedIndices: tensor1d(selectedIndices, 'int32'),
	              selectedScores: tensor1d(selectedScores)
	            });

	          case 19:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  }));
	  return _nonMaxSuppressionWithScoreAsync_.apply(this, arguments);
	}