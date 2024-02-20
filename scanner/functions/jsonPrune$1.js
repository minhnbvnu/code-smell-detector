function jsonPrune$1(source, propsToRemove, requiredInitialProps) {
      var stack = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var prunePaths = getPrunePath(propsToRemove);
      var requiredPaths = getPrunePath(requiredInitialProps);
      var nativeObjects = {
        nativeStringify: window.JSON.stringify
      };
      var nativeJSONParse = JSON.parse;
      var jsonParseWrapper = function jsonParseWrapper() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        // dealing with stringified json in args, which should be parsed.
        // so we call nativeJSONParse as JSON.parse which is bound to JSON object
        var root = nativeJSONParse.apply(JSON, args);
        return jsonPruner(source, root, prunePaths, requiredPaths, stack, nativeObjects);
      };

      // JSON.parse mocking
      jsonParseWrapper.toString = nativeJSONParse.toString.bind(nativeJSONParse);
      JSON.parse = jsonParseWrapper;
      var nativeResponseJson = Response.prototype.json;
      // eslint-disable-next-line func-names
      var responseJsonWrapper = function responseJsonWrapper() {
        var promise = nativeResponseJson.apply(this);
        return promise.then(function (obj) {
          return jsonPruner(source, obj, prunePaths, requiredPaths, stack, nativeObjects);
        });
      };

      // do nothing if browser does not support Response (e.g. Internet Explorer)
      // https://developer.mozilla.org/en-US/docs/Web/API/Response
      if (typeof Response === 'undefined') {
        return;
      }
      Response.prototype.json = responseJsonWrapper;
    }