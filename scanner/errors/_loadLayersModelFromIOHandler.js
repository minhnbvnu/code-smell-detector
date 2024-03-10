	    return regeneratorRuntime.wrap(function _callee7$(_context7) {
	      while (1) {
	        switch (_context7.prev = _context7.next) {
	          case 0:
	            if (options == null) {
	              options = {};
	            }

	            if (!(handler.load == null)) {
	              _context7.next = 3;
	              break;
	            }

	            throw new ValueError('Cannot proceed with model loading because the IOHandler provided ' + 'does not have the `load` method implemented.');

	          case 3:
	            _context7.next = 5;
	            return handler.load();

	          case 5:
	            artifacts = _context7.sent;
	            modelTopology = artifacts.modelTopology;

	            if (modelTopology['model_config'] != null) {
	              modelTopology = modelTopology['model_config'];
	            }

	            strict = options.strict == null ? true : options.strict; // If weights are provided and the weight-loading mode is strict, use
	            // fast weight initialization. This skips costly initializers such as
	            // 'orthogonal' and saves unnecessary computation in cases where
	            // the initialized weight values will immediately be overwritten by
	            // loaded weight values.

	            fastWeightInit = artifacts.weightData != null && artifacts.weightSpecs != null && strict;
	            model = deserialize$1(convertPythonicToTs(modelTopology), customObjects, fastWeightInit);
	            trainingConfig = artifacts.trainingConfig;

	            if (trainingConfig != null) {
	              model.loadTrainingConfig(trainingConfig);
	            }

	            if (artifacts.userDefinedMetadata != null) {
	              model.setUserDefinedMetadata(artifacts.userDefinedMetadata);
	            } // If weightData is present, load the weights into the model.


	            if (!(artifacts.weightData != null)) {
	              _context7.next = 24;
	              break;
	            }

	            if (!(artifacts.weightSpecs == null)) {
	              _context7.next = 17;
	              break;
	            }

	            throw new ValueError('LayersModel artifacts contains weight data, but not weight specs. ' + 'Therefore loading of weights cannot proceed.');

	          case 17:
	            _decodeModelAndOptimi = decodeModelAndOptimizerWeights(artifacts.weightData, artifacts.weightSpecs), modelWeights = _decodeModelAndOptimi.modelWeights, optimizerWeights = _decodeModelAndOptimi.optimizerWeights;
	            model.loadWeights(modelWeights, strict);

	            if (!(model.optimizer != null && optimizerWeights.length > 0)) {
	              _context7.next = 22;
	              break;
	            }

	            _context7.next = 22;
	            return model.optimizer.setWeights(optimizerWeights);

	          case 22:
	            // Dispose temporary weight values.
	            dispose(modelWeights);
	            dispose(optimizerWeights.map(function (w) {
	              return w.tensor;
	            }));

	          case 24:
	            return _context7.abrupt("return", model);

	          case 25:
	          case "end":
	            return _context7.stop();
	        }
	      }
	    }, _callee7);