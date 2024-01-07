function _booleanMaskAsync_() {
	  _booleanMaskAsync_ = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(tensor, mask, axis) {
	    var $tensor, $mask, axisFrom, maskDim, tensorShape, leadingSize, i, targetTensorShape, reshapedTensor, reshapedMask, positivePositions, indices, res;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            $tensor = convertToTensor(tensor, 'tensor', 'boolMask');
	            $mask = convertToTensor(mask, 'mask', 'boolMask', 'bool');
	            axisFrom = axis == null ? 0 : axis;
	            maskDim = $mask.rank;
	            tensorShape = $tensor.shape;
	            assert(maskDim > 0, function () {
	              return 'mask cannot be scalar';
	            });
	            assertShapesMatch(tensorShape.slice(axisFrom, axisFrom + maskDim), $mask.shape, "mask's shape must match the first K dimensions of tensor's shape,");
	            leadingSize = 1;

	            for (i = axisFrom; i < axisFrom + maskDim; i++) {
	              leadingSize *= tensorShape[i];
	            }

	            targetTensorShape = tensorShape.slice(0, axisFrom).concat([leadingSize], tensorShape.slice(axisFrom + maskDim));
	            reshapedTensor = reshape($tensor, targetTensorShape);
	            reshapedMask = reshape($mask, [-1]);
	            _context.next = 14;
	            return whereAsync(reshapedMask);

	          case 14:
	            positivePositions = _context.sent;
	            indices = squeeze(positivePositions, [1]);
	            res = gather(reshapedTensor, indices, axisFrom); // Ensure no memory leak.

	            if (tensor !== $tensor) {
	              $tensor.dispose();
	            }

	            if (mask !== $mask) {
	              $mask.dispose();
	            }

	            indices.dispose();
	            reshapedTensor.dispose();
	            reshapedMask.dispose();
	            positivePositions.dispose();
	            return _context.abrupt("return", res);

	          case 24:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  }));
	  return _booleanMaskAsync_.apply(this, arguments);
	}