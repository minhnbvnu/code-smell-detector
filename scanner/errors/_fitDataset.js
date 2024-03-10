	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            hasBatchesPerEpoch = args.batchesPerEpoch != null;
	            assert(model.optimizer != null, function () {
	              return 'You must compile a model before training/testing. Use ' + 'LayersModel.compile(modelCompileConfig).';
	            });
	            assert(args != null, function () {
	              return "For fitDataset(), the 2nd argument (config) is required, " + "but it is not provided in this call.";
	            });
	            assert(args.epochs != null && args.epochs > 0 && Number.isInteger(args.epochs), function () {
	              return "For fitDataset(), config.epochs is expected to be a positive " + ("integer, but got " + args.epochs);
	            });
	            assert(!hasBatchesPerEpoch || args.batchesPerEpoch > 0 && Number.isInteger(args.batchesPerEpoch), function () {
	              return "For fitDataset(), config.batchesPerEpoch is expected to be a " + ("positive integer if specified, but got " + args.batchesPerEpoch);
	            });
	            assert( // tslint:disable-next-line:no-any
	            args['validationSplit'] == null, function () {
	              return '`validationSplit` is not supported by `fitDataset()`. ' + 'Use validationData instead.';
	            });

	            if (!model.isTraining) {
	              _context.next = 8;
	              break;
	            }

	            throw new Error('Cannot start training because another fit() call is ongoing.');

	          case 8:
	            model.isTraining = true;
	            _context.prev = 9;
	            doValidation = args.validationData != null;

	            if (doValidation) {
	              if (isDatasetObject(args.validationData)) {
	                assert(args.validationBatches == null || args.validationBatches > 0 && Number.isInteger(args.validationBatches), function () {
	                  return "For fitDataset() with dataset-based validation, " + "config.validationBatches is expected not to be provided, " + "or to be a positive integer, " + ("but got " + args.validationBatches);
	                });
	              } else {
	                validationData = standardizeTensorValidationData(args.validationData);
	                valXs = validationData.xs;
	                valYs = validationData.ys;
	              }
	            }

	            trainFunction = model.makeTrainFunction();
	            outLabels = model.getDedupedMetricsNames();

	            if (doValidation) {
	              callbackMetrics = outLabels.slice().concat(outLabels.map(function (n) {
	                return 'val_' + n;
	              }));
	            } else {
	              callbackMetrics = outLabels.slice();
	            }

	            callbacks = standardizeCallbacks(args.callbacks, args.yieldEvery);
	            verbose = args.verbose == null ? 1 : args.verbose;
	            _configureCallbacks = configureCallbacks(callbacks, verbose, args.epochs, null, null, getStepsPerEpoch(dataset, args), null, // Batch size determined by the dataset itself.
	            doValidation, callbackMetrics), callbackList = _configureCallbacks.callbackList, history = _configureCallbacks.history;
	            callbackList.setModel(model);
	            model.history = history;
	            _context.next = 22;
	            return callbackList.onTrainBegin();

	          case 22:
	            model.stopTraining_ = false;
	            epoch = args.initialEpoch == null ? 0 : args.initialEpoch;
	            _context.next = 26;
	            return dataset.iterator();

	          case 26:
	            dataIterator = _context.sent;

	          case 27:
	            if (!(epoch < args.epochs)) {
	              _context.next = 98;
	              break;
	            }

	            epochLogs = {};
	            _context.next = 31;
	            return callbackList.onEpochBegin(epoch);

	          case 31:
	            stepsDone = 0;
	            batchIndex = 0;

	            if (hasBatchesPerEpoch) {
	              _context.next = 37;
	              break;
	            }

	            _context.next = 36;
	            return dataset.iterator();

	          case 36:
	            dataIterator = _context.sent;

	          case 37:
	            if (!(hasBatchesPerEpoch ? stepsDone < args.batchesPerEpoch : true)) {
	              _context.next = 91;
	              break;
	            }

	            _context.next = 40;
	            return dataIterator.next();

	          case 40:
	            iteratorOut = _context.sent;

	            if (!(hasBatchesPerEpoch && iteratorOut.done)) {
	              _context.next = 44;
	              break;
	            }

	            console.warn('You provided `batchesPerEpoch` as ' + (args.batchesPerEpoch + ", ") + 'but your dataset iterator ran out of data after ' + (stepsDone + " batches; ") + 'interrupting training. Make sure that your ' + 'dataset can generate at least `batchesPerEpoch * epochs` ' + 'batches (in this case, ' + (args.batchesPerEpoch * args.epochs + " batches). ") + 'You may need to use the repeat() function when building ' + 'your dataset.');
	            return _context.abrupt("break", 91);

	          case 44:
	            if (!(iteratorOut.value != null)) {
	              _context.next = 73;
	              break;
	            }

	            _standardizeDataItera = standardizeDataIteratorOutput(model, iteratorOut.value), xs = _standardizeDataItera.xs, ys = _standardizeDataItera.ys;
	            batchLogs = {};
	            batchLogs['batch'] = batchIndex;
	            batchLogs['size'] = xs[0].shape[0];
	            _context.next = 51;
	            return callbackList.onBatchBegin(batchIndex, batchLogs);

	          case 51:
	            sampleWeights = [];

	            if (!(args.classWeight != null)) {
	              _context.next = 64;
	              break;
	            }

	            standardClassWeights = standardizeClassWeights(args.classWeight, model.outputNames);
	            i = 0;

	          case 55:
	            if (!(i < standardClassWeights.length)) {
	              _context.next = 64;
	              break;
	            }

	            _context.t0 = sampleWeights;
	            _context.next = 59;
	            return standardizeWeights(ys[i], null, standardClassWeights[i]);

	          case 59:
	            _context.t1 = _context.sent;

	            _context.t0.push.call(_context.t0, _context.t1);

	          case 61:
	            ++i;
	            _context.next = 55;
	            break;

	          case 64:
	            // Train on batch.
	            ins = xs.concat(ys).concat(sampleWeights);
	            outs = trainFunction(ins);
	            dispose(ins);

	            for (_i = 0; _i < outLabels.length; ++_i) {
	              label = outLabels[_i];
	              out = outs[_i];
	              batchLogs[label] = out;
	              keep(out);
	            }

	            _context.next = 70;
	            return callbackList.onBatchEnd(batchIndex, batchLogs);

	          case 70:
	            disposeTensorsInLogs(batchLogs);
	            batchIndex++;
	            stepsDone++;

	          case 73:
	            if (!(hasBatchesPerEpoch ? stepsDone >= args.batchesPerEpoch : iteratorOut.done)) {
	              _context.next = 87;
	              break;
	            }

	            if (!doValidation) {
	              _context.next = 86;
	              break;
	            }

	            valOuts = void 0;

	            if (!isDatasetObject(args.validationData)) {
	              _context.next = 84;
	              break;
	            }

	            _context.t2 = toList;
	            _context.next = 80;
	            return model.evaluateDataset(args.validationData, {
	              batches: args.validationBatches
	            });

	          case 80:
	            _context.t3 = _context.sent;
	            valOuts = (0, _context.t2)(_context.t3);
	            _context.next = 85;
	            break;

	          case 84:
	            valOuts = toList(model.evaluate(valXs, valYs, {
	              batchSize: args.validationBatchSize == null ? DEFAULT_VALIDATION_BATCH_SIZE : args.validationBatchSize,
	              verbose: 0
	            }));

	          case 85:
	            for (_i2 = 0; _i2 < model.metricsNames.length; ++_i2) {
	              epochLogs["val_" + model.metricsNames[_i2]] = valOuts[_i2];
	            }

	          case 86:
	            return _context.abrupt("break", 91);

	          case 87:
	            if (!model.stopTraining_) {
	              _context.next = 89;
	              break;
	            }

	            return _context.abrupt("break", 91);

	          case 89:
	            _context.next = 37;
	            break;

	          case 91:
	            _context.next = 93;
	            return callbackList.onEpochEnd(epoch, epochLogs);

	          case 93:
	            epoch++;

	            if (!model.stopTraining_) {
	              _context.next = 96;
	              break;
	            }

	            return _context.abrupt("break", 98);

	          case 96:
	            _context.next = 27;
	            break;

	          case 98:
	            _context.next = 100;
	            return callbackList.onTrainEnd();

	          case 100:
	            _context.next = 102;
	            return model.history.syncData();

	          case 102:
	            return _context.abrupt("return", model.history);

	          case 103:
	            _context.prev = 103;
	            model.isTraining = false;
	            return _context.finish(103);

	          case 106:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee, null, [[9,, 103, 106]]);