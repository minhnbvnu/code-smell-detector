function _modelFromJSON() {
	  _modelFromJSON = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(modelAndWeightsConfig, customObjects) {
	    var modelTopology, tsConfig, model, weightValues, uniqueWeightValues, _iterator4, _step4, weight;

	    return regeneratorRuntime.wrap(function _callee5$(_context5) {
	      while (1) {
	        switch (_context5.prev = _context5.next) {
	          case 0:
	            if (!('modelTopology' in modelAndWeightsConfig)) {
	              modelAndWeightsConfig = {
	                modelTopology: modelAndWeightsConfig
	              };
	            }

	            modelAndWeightsConfig = modelAndWeightsConfig;
	            modelTopology = modelAndWeightsConfig.modelTopology;

	            if (modelTopology['model_config'] != null) {
	              // If the model-topology JSON contains a 'model_config' field, then it is
	              // a full model JSON (e.g., from `keras.Model.save()`), which contains
	              // not only the model's architecture in its 'model_config' field, but
	              // additional information such as the model's optimizer. We use only the
	              // 'model_config' field currently.
	              modelTopology = modelTopology['model_config'];
	            }

	            tsConfig = convertPythonicToTs(modelTopology);
	            model = deserialize$1(tsConfig, customObjects);

	            if (!(modelAndWeightsConfig.weightsManifest != null)) {
	              _context5.next = 14;
	              break;
	            }

	            _context5.next = 9;
	            return loadWeights(modelAndWeightsConfig.weightsManifest, modelAndWeightsConfig.pathPrefix, model.weights.map(function (weight) {
	              return weight.originalName;
	            }));

	          case 9:
	            weightValues = _context5.sent;
	            // Map the weights to the unique tensor names generated during model loading
	            uniqueWeightValues = {};

	            for (_iterator4 = _createForOfIteratorHelperLoose(model.weights); !(_step4 = _iterator4()).done;) {
	              weight = _step4.value;
	              uniqueWeightValues[weight.originalName] = weightValues[weight.originalName];
	            }

	            model.loadWeights(uniqueWeightValues); // Dispose temporary weight values.

	            dispose(weightValues);

	          case 14:
	            return _context5.abrupt("return", model);

	          case 15:
	          case "end":
	            return _context5.stop();
	        }
	      }
	    }, _callee5);
	  }));
	  return _modelFromJSON.apply(this, arguments);
	}