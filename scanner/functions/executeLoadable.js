function executeLoadable(loadable) {
  var reqs = null; // todo discuss / improve type check

  if (Array.isArray(loadable)) {
    reqs = loadable;
  } else if (loadable.keys) {
    reqs = [loadable];
  }

  var exportsMap = new Map();

  if (reqs) {
    reqs.forEach(function (req) {
      req.keys().forEach(function (filename) {
        try {
          var fileExports = req(filename);
          exportsMap.set(typeof req.resolve === 'function' ? req.resolve(filename) : filename, fileExports);
        } catch (error) {
          var errorString = error.message && error.stack ? "".concat(error.message, "\n ").concat(error.stack) : error.toString();
          _storybook_client_logger__WEBPACK_IMPORTED_MODULE_17__[/* logger */ "a"].error("Unexpected error while loading ".concat(filename, ": ").concat(errorString));
        }
      });
    });
  } else {
    var exported = loadable();

    if (Array.isArray(exported) && exported.every(function (obj) {
      return obj.default != null;
    })) {
      exportsMap = new Map(exported.map(function (fileExports, index) {
        return ["exports-map-".concat(index), fileExports];
      }));
    } else if (exported) {
      _storybook_client_logger__WEBPACK_IMPORTED_MODULE_17__[/* logger */ "a"].warn("Loader function passed to 'configure' should return void or an array of module exports that all contain a 'default' export. Received: ".concat(JSON.stringify(exported)));
    }
  }

  return exportsMap;
}