function _fitTensors() {
	  _fitTensors = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3( // Type `model` as `any` here to avoid circular dependency w/ training.ts.
	  // tslint:disable-next-line:no-any
	  model, x, y, args) {
	    var inputs, targets, inputValX, inputValY, valX, valY, sampleWeights, batchSize, checkBatchAxis, standardizedOuts, doValidation, valIns, _checkBatchAxis, valStandardized, splitAt, originalBatchSize, ins, trainFunction, outLabels, valFunction, callbackMetrics, callbacks, out;

	    return regeneratorRuntime.wrap(function _callee3$(_context5) {
	      while (1) {
	        switch (_context5.prev = _context5.next) {
	          case 0:
	            if (args === void 0) {
	              args = {};
	            }

	            if (!model.isTraining) {
	              _context5.next = 3;
	              break;
	            }

	            throw new Error('Cannot start training because another fit() call is ongoing.');

	          case 3:
	            model.isTraining = true;
	            _context5.prev = 4;
	            batchSize = args.batchSize == null ? 32 : args.batchSize;
	            checkBatchSize(batchSize); // Validate user data.
	            // TODO(cais): Support sampleWeight.

	            checkBatchAxis = false;
	            _context5.next = 10;
	            return model.standardizeUserData(x, y, args.sampleWeight, args.classWeight, checkBatchAxis, batchSize);

	          case 10:
	            standardizedOuts = _context5.sent;
	            inputs = standardizedOuts[0];
	            targets = standardizedOuts[1];
	            sampleWeights = standardizedOuts[2]; // Prepare validation data.

	            doValidation = false;

	            if (!(args.validationData != null && args.validationData.length > 0)) {
	              _context5.next = 36;
	              break;
	            }

	            doValidation = true;

	            if (!(args.validationData.length === 2)) {
	              _context5.next = 22;
	              break;
	            }

	            // config.validationData consists of valX and valY.
	            inputValX = args.validationData[0];
	            inputValY = args.validationData[1];
	            _context5.next = 27;
	            break;

	          case 22:
	            if (!(args.validationData.length === 3)) {
	              _context5.next = 26;
	              break;
	            }

	            throw new NotImplementedError('validationData including sample weights is not supported yet.');

	          case 26:
	            throw new ValueError("When passing validation data, it must contain 2 (valX, valY) " + "or 3 (valX, valY, valSampleWeight) items; " + (args.validationData + " is invalid."));

	          case 27:
	            _checkBatchAxis = true;
	            _context5.next = 30;
	            return model.standardizeUserData(inputValX, inputValY, null,
	            /** Unused sample weights. */
	            null,
	            /** Unused class weights. */
	            _checkBatchAxis, batchSize);

	          case 30:
	            valStandardized = _context5.sent;
	            valX = valStandardized[0];
	            valY = valStandardized[1];
	            valIns = valX.concat(valY); // TODO(cais): Add useLearningPhase data properly.

	            _context5.next = 37;
	            break;

	          case 36:
	            if (args.validationSplit != null && args.validationSplit > 0 && args.validationSplit < 1) {
	              doValidation = true; // Porting Note: In tfjs-layers, inputs[0] is always a Tensor.

	              splitAt = Math.floor(inputs[0].shape[0] * (1 - args.validationSplit));
	              originalBatchSize = inputs[0].shape[0];
	              valX = sliceArrays(inputs, splitAt, originalBatchSize);
	              inputs = sliceArrays(inputs, 0, splitAt);
	              valY = sliceArrays(targets, splitAt, originalBatchSize);
	              targets = sliceArrays(targets, 0, splitAt); // TODO(cais): Once sampleWeights becomes available, slice it to get
	              //   valSampleWeights.

	              valIns = valX.concat(valY); // TODO(cais): Add useLearningPhase data properly.
	            } else if (args.validationSteps != null) {
	              doValidation = true; // TODO(cais): Add useLearningPhase.
	            }

	          case 37:
	            ins = inputs.concat(targets).concat(sampleWeights);
	            model.checkTrainableWeightsConsistency(); // TODO(cais): Handle use_learning_phase and learning_phase?
	            // Porting Note: Here we see a key deviation of tfjs-layers from
	            // Keras.
	            //  Due to the imperative nature of tfjs-layers' backend (tfjs-core),
	            //  we do not construct symbolic computation graphs to embody the
	            //  training process. Instead, we define a function that performs the
	            //  training action. In PyKeras, the data (inputs and targets) are fed
	            //  through graph placeholders. In tfjs-layers, the data are fed as
	            //  function arguments. Since the function are defined below in the
	            //  scope, we don't have equivalents of PyKeras's
	            //  `_make_train_funciton`.

	            trainFunction = model.makeTrainFunction();
	            outLabels = model.getDedupedMetricsNames();

	            if (doValidation) {
	              model.makeTestFunction();
	              valFunction = model.testFunction;
	              callbackMetrics = outLabels.slice().concat(outLabels.map(function (n) {
	                return 'val_' + n;
	              }));
	            } else {
	              valFunction = null;
	              valIns = [];
	              callbackMetrics = outLabels.slice();
	            }

	            callbacks = standardizeCallbacks(args.callbacks, args.yieldEvery);
	            _context5.next = 45;
	            return fitLoop(model, trainFunction, ins, outLabels, batchSize, args.epochs, args.verbose, callbacks, valFunction, valIns, args.shuffle, callbackMetrics, args.initialEpoch, null, null);

	          case 45:
	            out = _context5.sent;
	            return _context5.abrupt("return", out);

	          case 47:
	            _context5.prev = 47;
	            model.isTraining = false; // Memory clean up.

	            disposeNewTensors(inputs, x);
	            disposeNewTensors(targets, y);
	            disposeNewTensors(valX, inputValX);
	            disposeNewTensors(valY, inputValY);

	            if (sampleWeights != null) {
	              dispose(sampleWeights);
	            }

	            return _context5.finish(47);

	          case 55:
	          case "end":
	            return _context5.stop();
	        }
	      }
	    }, _callee3, null, [[4,, 47, 55]]);
	  }));
	  return _fitTensors.apply(this, arguments);
	}