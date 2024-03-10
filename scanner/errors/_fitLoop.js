	  _fitLoop = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2( // Type `model` as `any` here to avoid circular dependency w/ training.ts.
	    return regeneratorRuntime.wrap(function _callee2$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            if (batchSize == null) {
	              batchSize = 32;
	            }

	            if (epochs == null) {
	              epochs = 1;
	            }

	            if (shuffle$1 == null) {
	              shuffle$1 = true;
	            }

	            if (initialEpoch == null) {
	              initialEpoch = 0;
	            } // TODO(cais): Change const to let below when implementing validation.


	            doValidation = false;

	            if (valF != null && valIns != null) {
	              doValidation = true; // TODO(cais): verbose message.
	            }

	            if (!(validationSteps != null)) {
	              _context4.next = 10;
	              break;
	            }

	            doValidation = true;

	            if (!(stepsPerEpoch == null)) {
	              _context4.next = 10;
	              break;
	            }

	            throw new ValueError('Can only use `validationSteps` when doing step-wise training, ' + 'i.e., `stepsPerEpoch` must be set.');

	          case 10:
	            numTrainSamples = model.checkNumSamples(ins, batchSize, stepsPerEpoch, 'steps_per_epoch');

	            if (numTrainSamples != null) {
	              indexArray = range$1(0, numTrainSamples);
	            }

	            if (verbose == null) {
	              verbose = 1;
	            }

	            _configureCallbacks = configureCallbacks(callbacks, verbose, epochs, initialEpoch, numTrainSamples, stepsPerEpoch, batchSize, doValidation, callbackMetrics), callbackList = _configureCallbacks.callbackList, history = _configureCallbacks.history;
	            callbackList.setModel(model);
	            model.history = history;
	            _context4.next = 18;
	            return callbackList.onTrainBegin();

	          case 18:
	            model.stopTraining_ = false; // TODO(cais): Take care of callbacks.validation_data as in PyKeras.
	            // TODO(cais): Pre-convert feeds for performance as in PyKeras.

	            _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop(epoch) {
	              var epochLogs;
	              return regeneratorRuntime.wrap(function _loop$(_context3) {
	                while (1) {
	                  switch (_context3.prev = _context3.next) {
	                    case 0:
	                      _context3.next = 2;
	                      return callbackList.onEpochBegin(epoch);

	                    case 2:
	                      epochLogs = {};

	                      if (!(stepsPerEpoch != null)) {
	                        _context3.next = 7;
	                        break;
	                      }

	                      throw new NotImplementedError('stepsPerEpoch mode is not implemented yet.');

	                    case 7:
	                      return _context3.delegateYield( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
	                        var epochIndexArray1D, batches, _loop2, batchIndex, _ret2;

	                        return regeneratorRuntime.wrap(function _callee$(_context2) {
	                          while (1) {
	                            switch (_context2.prev = _context2.next) {
	                              case 0:
	                                if (!(shuffle$1 === 'batch')) {
	                                  _context2.next = 4;
	                                  break;
	                                }

	                                throw new NotImplementedError('batch shuffling is not implemneted yet');

	                              case 4:
	                                if (shuffle$1) {
	                                  shuffle(indexArray);
	                                }

	                              case 5:
	                                // Convert the potentially shuffled indices to Tensor1D, to avoid the
	                                // cost of repeated creation of Array1Ds later on.
	                                epochIndexArray1D = tensor1d(indexArray);
	                                batches = makeBatches(numTrainSamples, batchSize);
	                                _loop2 = /*#__PURE__*/regeneratorRuntime.mark(function _loop2(batchIndex) {
	                                  var batchLogs;
	                                  return regeneratorRuntime.wrap(function _loop2$(_context) {
	                                    while (1) {
	                                      switch (_context.prev = _context.next) {
	                                        case 0:
	                                          batchLogs = {};
	                                          _context.next = 3;
	                                          return callbackList.onBatchBegin(batchIndex, batchLogs);

	                                        case 3:
	                                          tidy(function () {
	                                            var batchStart = batches[batchIndex][0];
	                                            var batchEnd = batches[batchIndex][1];
	                                            var batchIds = sliceAlongFirstAxis(epochIndexArray1D, batchStart, batchEnd - batchStart);
	                                            batchLogs['batch'] = batchIndex;
	                                            batchLogs['size'] = batchEnd - batchStart; // TODO(cais): In ins, train flag can be a number, instead of an
	                                            //   Tensor? Do we need to handle this in tfjs-layers?

	                                            var insBatch = sliceArraysByIndices(ins, batchIds);
	                                            var outs = f(insBatch);

	                                            for (var i = 0; i < outLabels.length; ++i) {
	                                              var label = outLabels[i];
	                                              var out = outs[i];
	                                              batchLogs[label] = out;
	                                              keep(out); // TODO(cais): Use scope() to avoid ownership.
	                                            }

	                                            if (batchIndex === batches.length - 1) {
	                                              // Last batch.
	                                              if (doValidation) {
	                                                var valOuts = model.testLoop(valF, valIns, batchSize); // Porting Notes: In tfjs-layers, valOuts is always an Array.

	                                                for (var _i = 0; _i < outLabels.length; ++_i) {
	                                                  var _label = outLabels[_i];
	                                                  var _out = valOuts[_i];
	                                                  keep(_out); // TODO(cais): Use scope() to avoid ownership.

	                                                  epochLogs['val_' + _label] = _out;
	                                                }
	                                              }
	                                            }
	                                          });
	                                          _context.next = 6;
	                                          return callbackList.onBatchEnd(batchIndex, batchLogs);

	                                        case 6:
	                                          disposeTensorsInLogs(batchLogs);

	                                          if (!model.stopTraining_) {
	                                            _context.next = 9;
	                                            break;
	                                          }

	                                          return _context.abrupt("return", "break");

	                                        case 9:
	                                        case "end":
	                                          return _context.stop();
	                                      }
	                                    }
	                                  }, _loop2);
	                                });
	                                batchIndex = 0;

	                              case 9:
	                                if (!(batchIndex < batches.length)) {
	                                  _context2.next = 17;
	                                  break;
	                                }

	                                return _context2.delegateYield(_loop2(batchIndex), "t0", 11);

	                              case 11:
	                                _ret2 = _context2.t0;

	                                if (!(_ret2 === "break")) {
	                                  _context2.next = 14;
	                                  break;
	                                }

	                                return _context2.abrupt("break", 17);

	                              case 14:
	                                ++batchIndex;
	                                _context2.next = 9;
	                                break;

	                              case 17:
	                                epochIndexArray1D.dispose();

	                              case 18:
	                              case "end":
	                                return _context2.stop();
	                            }
	                          }
	                        }, _callee);
	                      })(), "t0", 8);

	                    case 8:
	                      _context3.next = 10;
	                      return callbackList.onEpochEnd(epoch, epochLogs);

	                    case 10:
	                      if (!model.stopTraining_) {
	                        _context3.next = 12;
	                        break;
	                      }

	                      return _context3.abrupt("return", "break");

	                    case 12:
	                    case "end":
	                      return _context3.stop();
	                  }
	                }
	              }, _loop);
	            });
	            epoch = initialEpoch;

	          case 21:
	            if (!(epoch < epochs)) {
	              _context4.next = 29;
	              break;
	            }

	            return _context4.delegateYield(_loop(epoch), "t0", 23);

	          case 23:
	            _ret = _context4.t0;

	            if (!(_ret === "break")) {
	              _context4.next = 26;
	              break;
	            }

	            return _context4.abrupt("break", 29);

	          case 26:
	            ++epoch;
	            _context4.next = 21;
	            break;

	          case 29:
	            _context4.next = 31;
	            return callbackList.onTrainEnd();

	          case 31:
	            _context4.next = 33;
	            return model.history.syncData();

	          case 33:
	            return _context4.abrupt("return", model.history);

	          case 34:
	          case "end":
	            return _context4.stop();
	        }
	      }
	    }, _callee2);