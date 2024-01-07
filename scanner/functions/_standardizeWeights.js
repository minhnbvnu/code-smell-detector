function _standardizeWeights() {
	  _standardizeWeights = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(y, sampleWeight, classWeight, sampleWeightMode) {
	    var yClasses, yClassIndices, classSampleWeight;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            if (!(sampleWeight != null || sampleWeightMode != null)) {
	              _context.next = 2;
	              break;
	            }

	            throw new Error('Support sampleWeight is not implemented yet');

	          case 2:
	            if (!(classWeight != null)) {
	              _context.next = 15;
	              break;
	            }

	            // Apply class weights per sample.
	            yClasses = tidy(function () {
	              if (y.shape.length === 1) {
	                // Assume class indices.
	                return y.clone();
	              } else if (y.shape.length === 2) {
	                if (y.shape[1] > 1) {
	                  // Assume one-hot encoding of classes.
	                  var axis = 1;
	                  return y.argMax(axis);
	                } else if (y.shape[1] === 1) {
	                  // Class index.
	                  return y.reshape([y.shape[0]]);
	                } else {
	                  throw new Error("Encountered unexpected last-dimension size (" + y.shape[1] + ") " + "during handling of class weights. The size is expected to be " + ">= 1.");
	                }
	              } else {
	                throw new Error("Unexpected rank of target (y) tensor (" + y.rank + ") during " + "handling of class weights. The rank is expected to be 1 or 2.");
	              }
	            });
	            _context.t0 = Array;
	            _context.next = 7;
	            return yClasses.data();

	          case 7:
	            _context.t1 = _context.sent;
	            yClassIndices = _context.t0.from.call(_context.t0, _context.t1);
	            dispose(yClasses);
	            classSampleWeight = [];
	            yClassIndices.forEach(function (classIndex) {
	              if (classWeight[classIndex] == null) {
	                throw new Error("classWeight must contain all classes in the training data. " + ("The class " + classIndex + " exists in the data but not in ") + "classWeight");
	              } else {
	                classSampleWeight.push(classWeight[classIndex]);
	              }
	            });
	            return _context.abrupt("return", tensor1d(classSampleWeight, 'float32'));

	          case 15:
	            return _context.abrupt("return", null);

	          case 16:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  }));
	  return _standardizeWeights.apply(this, arguments);
	}