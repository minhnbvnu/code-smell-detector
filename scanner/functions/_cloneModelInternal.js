function _cloneModelInternal() {
	  _cloneModelInternal = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sourceURL, destURL, deleteSource) {
	    var loadHandlers, loadHandler, saveHandlers, saveHandler, sourceScheme, sourcePath, sameMedium, modelArtifacts, saveResult;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            if (deleteSource === void 0) {
	              deleteSource = false;
	            }

	            assert(sourceURL !== destURL, function () {
	              return "Old path and new path are the same: '" + sourceURL + "'";
	            });
	            loadHandlers = IORouterRegistry.getLoadHandlers(sourceURL);
	            assert(loadHandlers.length > 0, function () {
	              return "Copying failed because no load handler is found for source URL " + sourceURL + ".";
	            });
	            assert(loadHandlers.length < 2, function () {
	              return "Copying failed because more than one (" + loadHandlers.length + ") " + ("load handlers for source URL " + sourceURL + ".");
	            });
	            loadHandler = loadHandlers[0];
	            saveHandlers = IORouterRegistry.getSaveHandlers(destURL);
	            assert(saveHandlers.length > 0, function () {
	              return "Copying failed because no save handler is found for destination " + ("URL " + destURL + ".");
	            });
	            assert(saveHandlers.length < 2, function () {
	              return "Copying failed because more than one (" + loadHandlers.length + ") " + ("save handlers for destination URL " + destURL + ".");
	            });
	            saveHandler = saveHandlers[0];
	            sourceScheme = parseURL$1(sourceURL).scheme;
	            sourcePath = parseURL$1(sourceURL).path;
	            sameMedium = sourceScheme === parseURL$1(sourceURL).scheme;
	            _context.next = 15;
	            return loadHandler.load();

	          case 15:
	            modelArtifacts = _context.sent;

	            if (!(deleteSource && sameMedium)) {
	              _context.next = 19;
	              break;
	            }

	            _context.next = 19;
	            return ModelStoreManagerRegistry.getManager(sourceScheme).removeModel(sourcePath);

	          case 19:
	            _context.next = 21;
	            return saveHandler.save(modelArtifacts);

	          case 21:
	            saveResult = _context.sent;

	            if (!(deleteSource && !sameMedium)) {
	              _context.next = 25;
	              break;
	            }

	            _context.next = 25;
	            return ModelStoreManagerRegistry.getManager(sourceScheme).removeModel(sourcePath);

	          case 25:
	            return _context.abrupt("return", saveResult.modelArtifactsInfo);

	          case 26:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  }));
	  return _cloneModelInternal.apply(this, arguments);
	}