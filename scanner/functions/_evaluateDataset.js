function _evaluateDataset() {
	  _evaluateDataset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2( // Type `model` as `any` here to avoid circular dependency w/
	  // training.ts.
	  // tslint:disable-next-line:no-any
	  model, dataset, args) {
	    var hasBatches, f, outs, dataIterator, numExamples, batch, _loop3, _ret, i, oldScalar;

	    return regeneratorRuntime.wrap(function _callee2$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            args = args || {};
	            hasBatches = args.batches != null;
	            f = model.testFunction;
	            outs = [];

	            if (!(args.verbose > 0)) {
	              _context3.next = 6;
	              break;
	            }

	            throw new NotImplementedError('Verbose mode is not implemented yet.');

	          case 6:
	            assert(!hasBatches || args.batches > 0 && Number.isInteger(args.batches), function () {
	              return 'Test loop expects `batches` to be a positive integer, but ' + ("received " + JSON.stringify(args.batches));
	            });

	            if (!isLazyIteratorObject(dataset)) {
	              _context3.next = 11;
	              break;
	            }

	            _context3.t0 = dataset;
	            _context3.next = 14;
	            break;

	          case 11:
	            _context3.next = 13;
	            return dataset.iterator();

	          case 13:
	            _context3.t0 = _context3.sent;

	          case 14:
	            dataIterator = _context3.t0;
	            // Keeps track of number of examples used in this evaluation.
	            numExamples = 0;
	            batch = 0;
	            _loop3 = /*#__PURE__*/regeneratorRuntime.mark(function _loop3() {
	              var iteratorOut;
	              return regeneratorRuntime.wrap(function _loop3$(_context2) {
	                while (1) {
	                  switch (_context2.prev = _context2.next) {
	                    case 0:
	                      _context2.next = 2;
	                      return dataIterator.next();

	                    case 2:
	                      iteratorOut = _context2.sent;
	                      outs = tidy(function () {
	                        if (iteratorOut.value) {
	                          (function () {
	                            // TODO(cais): Once real dataset is available, use
	                            //   `map(x => standardizeDataIteratorOutput(model, x).map(f)`.
	                            var _standardizeDataItera2 = standardizeDataIteratorOutput(model, iteratorOut.value),
	                                xs = _standardizeDataItera2.xs,
	                                ys = _standardizeDataItera2.ys;

	                            var xsAndYs = xs.concat(ys);
	                            var batchOuts = tidy(function () {
	                              return f(xsAndYs);
	                            });
	                            dispose(xsAndYs);

	                            if (batch === 0) {
	                              for (var _i3 = 0; _i3 < batchOuts.length; ++_i3) {
	                                outs.push(scalar(0));
	                              }
	                            }

	                            var batchSize = xsAndYs[0].shape[0];

	                            var _loop4 = function _loop4(_i4) {
	                              var batchOut = batchOuts[_i4];
	                              var oldScalar = outs[_i4];
	                              outs[_i4] = tidy(function () {
	                                return add$1(outs[_i4], mul(batchSize, batchOut));
	                              });

	                              if (batch > 0) {
	                                dispose(oldScalar);
	                              }
	                            };

	                            for (var _i4 = 0; _i4 < batchOuts.length; ++_i4) {
	                              _loop4(_i4);
	                            }

	                            dispose(batchOuts);
	                            numExamples += batchSize;
	                            ++batch;
	                          })();
	                        }

	                        return outs;
	                      });

	                      if (!iteratorOut.done) {
	                        _context2.next = 7;
	                        break;
	                      }

	                      if (hasBatches) {
	                        console.warn('Your dataset iterator ran out of data during evaluateDataset(). ' + 'Interrupting evalution. Make sure that your ' + 'dataset can generate at least `batches` ' + ("batches (in this case, " + args.batches + " batches). ") + 'You may need to use the repeat() function when building ' + 'your dataset.');
	                      }

	                      return _context2.abrupt("return", "break");

	                    case 7:
	                    case "end":
	                      return _context2.stop();
	                  }
	                }
	              }, _loop3);
	            });

	          case 18:
	            if (!(hasBatches ? batch < args.batches : true)) {
	              _context3.next = 25;
	              break;
	            }

	            return _context3.delegateYield(_loop3(), "t1", 20);

	          case 20:
	            _ret = _context3.t1;

	            if (!(_ret === "break")) {
	              _context3.next = 23;
	              break;
	            }

	            return _context3.abrupt("break", 25);

	          case 23:
	            _context3.next = 18;
	            break;

	          case 25:
	            for (i = 0; i < outs.length; ++i) {
	              oldScalar = outs[i];
	              outs[i] = div(outs[i], numExamples);
	              dispose(oldScalar);
	            }

	            return _context3.abrupt("return", singletonOrArray(outs));

	          case 27:
	          case "end":
	            return _context3.stop();
	        }
	      }
	    }, _callee2);
	  }));
	  return _evaluateDataset.apply(this, arguments);
	}