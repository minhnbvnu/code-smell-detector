function _loadGraphModel() {
	  _loadGraphModel = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(modelUrl, options) {
	    var model;
	    return regeneratorRuntime.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            if (options === void 0) {
	              options = {};
	            }

	            if (!(modelUrl == null)) {
	              _context4.next = 3;
	              break;
	            }

	            throw new Error('modelUrl in loadGraphModel() cannot be null. Please provide a url ' + 'or an IOHandler that loads the model');

	          case 3:
	            if (options == null) {
	              options = {};
	            }

	            if (options.fromTFHub) {
	              if (modelUrl.load == null) {
	                if (!modelUrl.endsWith('/')) {
	                  modelUrl = modelUrl + '/';
	                }

	                modelUrl = "" + modelUrl + DEFAULT_MODEL_NAME + TFHUB_SEARCH_PARAM;
	              }
	            }

	            model = new GraphModel(modelUrl, options);
	            _context4.next = 8;
	            return model.load();

	          case 8:
	            return _context4.abrupt("return", model);

	          case 9:
	          case "end":
	            return _context4.stop();
	        }
	      }
	    }, _callee4);
	  }));
	  return _loadGraphModel.apply(this, arguments);
	}